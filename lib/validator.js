//validator.js
exports.validate = function(text) {
    var tags, formtags, json, html, logger;
    logger = require('./logger');
    // formats the json object as an html document
    _ = require('../node_modules/underscore');

    formtags = ['action', 'method', 'html', 'enctype'];
    // tagset from http://www.w3schools.com/html/html_forms.asp
    tags = ['input', 'textarea', 'label', 'fieldset', 'legend', 'select', 'optgroup', 'option', 'button', 'datalist', 'keygen', 'output'];

    var test = function(val, tags, failonerror) {
        var keys, valid, counter = 0, total;

        try {

            keys = _.keys(val);

            if (!failonerror) {

                logger.log('not failing on error');

                // find returns on the first instance of a key. That is all we want

                valid = _.find(keys, function(key) {

                    logger.log(key);

                    if (tags.indexOf(key) !== -1) {

                        return true;

                    }
                });

                if (!valid) {
                    // there are no html tags in this object
                    throw new Error('no html tags in json object');

                }

            } else {

                //need to search each tag to see if it is present
                _.each(tags, function(tag) {

                    if (keys.indexOf(tag) !== -1) {

                        counter = counter + 1;

                        logger.log('found tag: ' + tag);

                    }

                });
                total = _.size(tags);

                logger.log('found ' + counter + ' tags out of ' + total);

                //all tags must be found in keys
                if (counter !== total) {

                    throw new Error('mandatory tags missing from json object');

                }

            }

            return true;

        } catch (ex) {

            console.error(ex);

            return false;

        }
    }
    //test to see if all top level tags are present
    try {

        json = JSON.parse(text);

        if (test(json, formtags, true)) {

            logger.log('top level tags ok');

            //if all top tags are present, see if any of the html tags are there

            html = json.html.pop();

            if (test(html, tags, false)) {
                logger.log('html tags ok');
                return json;
            } else {
                logger.log('html tags not ok');
                return false;

            }

        } else {

            logger.log('top level tags not ok');

            return false;

        }

    } catch(ex) {

        return false;

    }

}