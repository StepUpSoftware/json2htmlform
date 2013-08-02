//validator.js
exports.validate = function(text) {
    var tags, formtags;
    // formats the json object as an html document
    _ = require('../node_modules/underscore');

    formtags = ['action', 'method', 'html', 'enctype'];
    // tagset from http://www.w3schools.com/html/html_forms.asp
    tags = ['input', 'textarea', 'label', 'fieldset', 'legend', 'select', 'optgroup', 'option', 'button', 'datalist', 'keygen', 'output'];

    var test = function(val, tags) {
        var json, keys, valid;

        try {

            json = JSON.parse(val);

            keys = _.keys(json);

            // find returns on the first instance of a key. That is all we want
            // - one valid tag/key
            valid = _.find(keys, function(key) {
                if (tags.indexOf(key) !== -1) {

                    //recurse into html tags to test these

                    if (key === 'html') {

                        test(key, tags);

                    } else {

                        return true;

                    }

                }
            });

            if (!valid) {
                // there are no html tags in this object
                throw new Error('no html tags in json object');

            }

            return json;

        } catch (ex) {

            console.error(ex);

            return false;

        }
    }

    return test(text, formtags);
}