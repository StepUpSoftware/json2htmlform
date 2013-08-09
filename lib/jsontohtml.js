//formatter.js
var logger = require('./logger');
var handlebars = require('handlebars');
_ = require('underscore');

// tagset from http://www.w3schools.com/html/html_forms.asp
var maintags = ['name', 'action', 'method', 'html', 'enctype'];

//limited to supporting a subset of valid form tags for now
var formtags = ['input', 'textarea', 'label', 'select', 'optgroup', 'options', 'button', 'datalist'];

var attributes = {
    "input" : ['type', 'name', 'id', 'placeholder', 'value', 'label', 'class'],
    "textarea" : ['type', 'name', 'id', 'placeholder', 'label', 'class'],
    "select" : ["options", "optgroups", "label", "id", 'class'],
    "button" : ['type', 'name', 'id', 'value', 'text', 'class']
};

//creates a helper called list, referred to in the template to
//output all the repeating form field elements

var createAttributes = function(item) {

    var attribString = ' ';

    _.each(item, function(value, key) {

        attribString += (key + '=\"' + value + '\" ');

    });

    return attribString;

};

var createTags = function(item) {

    var keys, vals, tag, attribute, text, label, entry = '';

    tag = item.tag;

    //remove tag name from object to leave just the attributes
    delete item.tag;

    //process if tag is a valid one
    if (formtags.indexOf(tag) !== -1) {

        if (item.label) {

            //remove label from list of tag attributes, we'll add it as a tag in it's own right
            label = item.label;
            delete item.label;

        }

        if (item.text) {
            text = item.text;
            delete item.text;
        }

        //add the label as a new tag, if present and there is an id to refer it to
        if (label && item.id) {
            entry += "<label " +(item['class'] ? 'class=\"' + item['class'] + '"' : '') +" for=\"" + item.id + "\">" + label + "</label>"
        }

        //single level tags
        if (['input', 'textarea', 'label', 'button'].indexOf(tag) !== -1) {

            //start tag
            entry += '<' + tag;

            //treat the rest of object as tag attributes
            attribute = createAttributes(item);

            entry += (attribute + ((tag !== 'input') ? '>' + ( text ? text : '') + '</' + tag + '>' : '/>' ));

            //nested or grouped tagsets
        } else if (tag === 'select') {

            entry += '<' + tag + ' ' +(item['class'] ? 'class=\"' + item['class'] + '"' : '') + '>'

            if (item['optgroups']) {

                _.each(item['optgroups'], function(group) {

                    entry += '<optgroup label=\"' + group['label'] + '\">';

                    _.each(group['options'], function(option) {

                        entry += ('<option value=\"' + option + '\">' + option + '</option>');

                    });

                    entry += '</optgroup>';

                });

            } else if (item['options']) {

                _.each(item['options'], function(option) {

                    entry += ('<option value=\"' + option + '\">' + option + '</option>');

                });
            }
            
             entry += '</select>';

        }

    }

    return entry;

};

handlebars.registerHelper('list', function(items) {

    var entry = '';

    _.each(items, function(item) {

        entry += createTags(item);

    });

    return entry;

});

var validateTags = function(obj, toptags) {
    var keys, valid, counter = 0, total, html;

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

                if (tagname && attribs) {
                    delete key.tag;

                    _.each(key, function(val, entry) {

                        if (attribs.indexOf(entry) === -1) {
                            counter = counter + 1;

                        }

                    });

                } else {

                    //set counter to -1 to force an error
                    counter = -1;
                }

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

var write = function(obj, file) {

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

    var obj, html;

    // formats the json object as an html document

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
exports.write = write;
