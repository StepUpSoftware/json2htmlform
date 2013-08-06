//formatter.js
var logger = require('./logger');
var handlebars = require('../node_modules/handlebars');
_ = require('../node_modules/underscore');

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

// formats the json object as an html document
var format = function(obj, file) {

    var fs, source, pageBuilder, pageText, data, template;

    try {

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

        // Writing replaced text into a new file
        fs.writeFile(file, pageText, function(err) {

            if (err) {

                throw new Error("Problem saving file: " + file, err);

            } else {
                logger.log('wrote ' + file);
            }

        });

        //TODO writeFile is asynchronous so this is wrong

        return true;

    } catch(ex) {

        logger.log("" + ex);

        return false;

    }

};

exports.json2htmlform = function(obj, file) {

    var test;

    try {

        if ( typeof obj === 'string' && typeof file === 'string') {

            //format will format /save the file or return false
            test = format(obj, file);

            return test;

        } else {

            return false;
        }

    } catch(ex) {

        return false;

    }

}