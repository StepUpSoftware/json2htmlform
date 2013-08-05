//formatter.js
var logger = require('./logger');
_ = require('../node_modules/underscore');
exports.json2htmlform = function(obj) {

    // formats the json object as an html document
    function format(obj) {

        var handlebars, fs, source, pageBuilder, pageText, data, template;

        try {

            handlebars = require('../node_modules/handlebars');

            //creates a helper called list, referred to in the template to
            //output all the repeating form field elements
            handlebars.registerHelper('list', function(items, options) {

                var entry = '';

                _.each(items, function(item) {
                    var keys, vals, tag, attribute = ' ', text;

                    tag = item.tag;
                    if (item.text) {

                        text = item.text;
                        delete item.text;

                    } else if (!item.text && item.value) {
                        text = item.value;
                    }
                    //remove tag name from object to leave just the attributes
                    delete item.tag;

                    //start tag
                    entry += '<' + tag;

                    //treat the rest of object as tag attributes
                    _.each(item, function(value, key) {

                        attribute += key + '=\"' + value + '\" ';

                    });

                    entry += attribute;

                    //end tag
                    entry += '>';

                    //optional text value and termination;
                    text ? entry += text + '</>' : entry += '</>';

                });

                return entry;

            });

            fs = require('fs');

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

            return pageText;

        } catch(ex) {

            logger.log("" + ex);

            return false;

        }

    };

    return format(obj);

}