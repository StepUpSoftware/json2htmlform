//formatter.js
var logger = require('./logger');
var handlebars = require('handlebars');
_ = require('underscore');

//creates a helper called list, referred to in the template to
//output all the repeating form field elements
handlebars.registerHelper('list', function(items, options) {

    var entry = '';

    _.each(items, function(item) {

        var keys, vals, tag, attribute = ' ', text, label;

        tag = item.tag;
        //remove tag name from object to leave just the attributes
        delete item.tag;

        if (item.label) {

            //remove label from list of tag attributes, we'll add it as a tag in it's own right
            label = item.label;
            delete item.label;

        }

        //start tag
        entry += '<' + tag;

        //treat the rest of object as tag attributes
        _.each(item, function(value, key) {

            attribute += (key + '=\"' + value + '\" ');

        });

        entry += (attribute + '/>');
        //add the label as a new tag, if present and there is an id to refer it to
        if (label && item.id) {
            entry += "<label for=\"" + item.id + "\">" + label + "</label>"
        }

    });

    return entry;

});

var validateTags = function(obj, toptags) {
    var keys, valid, counter = 0, total, html, formtags, maintags, attributes;

    // tagset from http://www.w3schools.com/html/html_forms.asp
    maintags = ['name', 'action', 'method', 'html', 'enctype'];

    //limited to supporting a subset of valid form tags for now
    formtags = ['input', 'textarea', 'label', 'select', 'optgroup', 'option', 'button', 'datalist'];

    attributes = {
        "input" : ['type', 'name', 'id', 'placeholder', 'value', 'label']
    };

    //if toptags, test that all tags are present in obj, otherwise test that at least one tag is present in obj
    try {

        if (toptags) {

            keys = _.keys(obj);

            //need to search each tag to see if it is present
            _.each(maintags, function(tag) {

                if (keys.indexOf(tag) !== -1) {

                    counter = counter + 1;

                }

            });
            total = _.size(maintags);

            //all formtags must be found in keys
            if (counter !== total) {

                throw new Error('mandatory formtags missing from source file');

            }

        } else {

            // ensure attributes are valid for tagname
            counter = 0;
            _.each(obj, function(key) {

                var tagname = key.tag, attribs = attributes[tagname];
                delete key.tag;

                _.each(key, function(val, entry) {

                    if (attribs.indexOf(entry) === -1) {
                        counter = counter + 1;

                    }

                });
            });

            if (counter !== 0) {
                // there are no html formtags in this object

                throw new Error('no supported form formtags in source file');

            }

        }

        return true;

    } catch (ex) {

        logger.log("" + ex);

        return false;

    }
}
// formats the json object as an html document
var createHTMLFile = function(obj, file) {

    var fs, source, pageBuilder, pageText, data, template, Q, deferred;

    //final write of html file is async, so we will return a promise
    Q = require('Q');

    try {

        fs = require('fs');

        deferred = Q.defer();

        //read file synchronously

        template = fs.readFileSync('templates/index.html', 'utf8');

        if (!template) {

            throw new Error('unable to read html template');

        }

        if ( typeof obj === 'string') {

            data = JSON.parse(obj);

        }

        if (!data) {

            throw new Error('source is not an object');

        }

        pageBuilder = handlebars.compile(template);

        pageText = pageBuilder(data);

        // Writing replaced text into a new file
        fs.writeFile(file, pageText, function(err) {

            if (err) {

                logger.log('unable to write ' + file);
                deferred.reject(false);

            } else {

                deferred.resolve(true);
            }

        });

        return deferred.promise;

    } catch(ex) {

        logger.log("" + ex);

        return false;

    }

};

var format = function(obj, file) {

    var test;

    try {

        if ( typeof obj === 'string' && typeof file === 'string') {

            //format will format /save the file or return false
            test = createHTMLFile(obj, file);

            return test;

        }

        return false;

    } catch(ex) {

        return false;

    }

}
var validate = function(text) {

    //TODO only validates tags need to also validate attributes

    var obj, html;

    // formats the json object as an html document
    _ = require('../node_modules/underscore');

    try {

        if ( typeof text === 'string') {

            obj = JSON.parse(text);

            //test to see if all top level tags are present
            if (validateTags(obj, true)) {

                //if all top tags are present, see if any of the html tags are there

                html = _.flatten(obj.html);

                if (validateTags(html, false)) {

                    return true;

                }

                return false;

            }
        }

        return false;

    } catch(ex) {

        logger.log("" + ex);

        return false;

    }

}
exports.validate = validate;
exports.format = format;
