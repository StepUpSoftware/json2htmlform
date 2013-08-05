//validator.js
var logger = require('./logger');
//test that object and tags match inclusive or exclusive (faileonerror) rules
var test = function(obj, tags, failonerror) {
    var keys, valid, counter = 0, total, html;

    //if failonerror, test that all tags are present in the obj object, otherwise test that at least one tag is present in obj

    try {

        keys = _.keys(obj);

        if (!failonerror) {
            
            // find returns on the first instance of a key. That is all we want

            valid = _.find(obj, function(key) {

                if (tags.indexOf(key.tag) !== -1) {

                    return true;

                }
            });

            if (!valid) {
                // there are no html tags in this object
                throw new Error('no form tags in source file');

            }

        } else {

            //need to search each tag to see if it is present
            _.each(tags, function(tag) {

                if (keys.indexOf(tag) !== -1) {

                    counter = counter + 1;

                }

            });
            total = _.size(tags);

            //all tags must be found in keys
            if (counter !== total) {

                throw new Error('mandatory tags missing from source file');

            }

        }

        return true;

    } catch (ex) {

        logger.log("" + ex);

        return false;

    }
}
exports.validate = function(text) {
    var tags, formtags, obj, html;
    // formats the json object as an html document
    _ = require('../node_modules/underscore');

    formtags = ['action', 'method', 'html', 'enctype'];
    // tagset from http://www.w3schools.com/html/html_forms.asp
    tags = ['input', 'textarea', 'label', 'fieldset', 'legend', 'select', 'optgroup', 'option', 'button', 'datalist', 'keygen', 'output'];

    try {

        obj = JSON.parse(text);

        //test to see if all top level tags are present
        if (test(obj, formtags, true)) {

            //if all top tags are present, see if any of the html tags are there

            html = _.flatten(obj.html);

            if (test(html, tags, false)) {

                return true;
            }

            return false;

        }

        return false;

    } catch(ex) {

        logger.log("" + ex);

        return false;

    }

}