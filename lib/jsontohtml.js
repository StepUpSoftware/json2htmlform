//formatter.js
var logger = require('./logger');
var handlebars = require('handlebars');
_ = require('underscore');

//creates a helper called list, referred to in the template to
//output all the repeating form field elements
handlebars.registerHelper('list', function(items, options) {

    var entry = '';

    _.each(items, function(item) {
        
        var keys, vals, tag, attribute = ' ', text, label, id;

        tag = item.tag;
        if (item.label) {

            //remove label from list of tag attributes
            label = item.label;
            delete item.label;

        }
        id = item.id;

        //remove tag name from object to leave just the attributes
        delete item.tag;

        //start tag
        entry += '<' + tag;

        //treat the rest of object as tag attributes
        _.each(item, function(value, key) {

            attribute += key + '=\"' + value + '\" ';

        });

        entry += attribute += '/>';

        if (label) {
            entry += "<label for=\"" + id + "\">" + label + "</label>"
        }

    });

    return entry;

});

var validateTags = function(obj, formtags, failonerror) {
    var keys, valid, counter = 0, total, html;

    //if failonerror, test that all formtags are present in the obj object, otherwise test that at least one tag is present in obj

    try {

        keys = _.keys(obj);

        if (!failonerror) {

            // find returns on the first instance of a key. That is all we want

            valid = _.find(obj, function(key) {

                if (formtags.indexOf(key.tag) !== -1) {

                    return true;

                }
            });

            if (!valid) {
                // there are no html formtags in this object
                throw new Error('no supported form formtags in source file');

            }

        } else {

            //need to search each tag to see if it is present
            _.each(formtags, function(tag) {

                if (keys.indexOf(tag) !== -1) {

                    counter = counter + 1;

                }

            });
            total = _.size(formtags);

            //all formtags must be found in keys
            if (counter !== total) {

                throw new Error('mandatory formtags missing from source file');

            }

        }

        return true;

    } catch (ex) {

        logger.log("" + ex);

        return false;

    }
}
// formats the json object as an html document
var outputHTML = function(obj, file) {

    var fs, source, pageBuilder, pageText, data, template, Q, deferred;

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
            test = outputHTML(obj, file);

            return test;

        }

        return false;

    } catch(ex) {

        return false;

    }

}
var validate = function(text) {

    //TODO only validates tags need to also validate attributes

    var formtags, maintags, obj, html;

    // formats the json object as an html document
    _ = require('../node_modules/underscore');

    maintags = ['name', 'action', 'method', 'html', 'enctype'];
    // tagset from http://www.w3schools.com/html/html_forms.asp

    //formtags = ['input', 'textarea', 'label', 'fieldset', 'legend', 'select', 'optgroup', 'option', 'button', 'datalist', 'keygen', 'output'];

    //limited to supporting a subset of valid form tags for now
    formtags = ['input', 'textarea', 'label', 'select', 'optgroup', 'option', 'button', 'datalist'];

    try {

        if ( typeof text === 'string') {

            obj = JSON.parse(text);

            //test to see if all top level tags are present
            if (validateTags(obj, maintags, true)) {

                //if all top tags are present, see if any of the html tags are there

                html = _.flatten(obj.html);

                if (validateTags(html, formtags, false)) {

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
