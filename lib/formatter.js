//formatter.js
var logger = require('./logger');
exports.json2htmlform = function(obj) {

    // formats the json object as an html document
    function format(obj) {

        var handlebars, fs, source, pageBuilder, pageText, data, template;

        try {

            handlebars = require('../node_modules/handlebars');

            fs = require('fs');

            template = fs.readFileSync('templates/index.html', 'utf8');

            if (!template) {

                throw new Error('unable to read html template');

            }

            if ( typeof obj === 'string') {

                data = JSON.parse(obj);

            } else if ( typeof obj === 'object') {

                data = obj;
            }

            if (!data) {

                throw new Error('source is not an object');

            }

            source = {
                message : "Hello world!"
            };

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