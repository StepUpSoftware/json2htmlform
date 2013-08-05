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
            //output all the repeating form fields
            handlebars.registerHelper('list', function(items, options) {
                var out ='';
                _.each(items, function(item) {

                    out += '<' + item.tag + ' type=\"' + item.type  +'\" name=\"' + item.name + '\" id=' +'\"'+ item.id +'\">';

                });
                console.log(out);
                return out;

            });

            fs = require('fs');

            //read file synchronously

            template = fs.readFileSync('templates/index.html', 'utf8');

            if (!template) {

                throw new Error('unable to read html template');

            }

            if ( typeof obj === 'string') {

                //
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