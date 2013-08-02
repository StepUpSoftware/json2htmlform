//validator.js
exports.validate = function(text) {
	// formats the json object as an html document
	_ = require('../node_modules/underscore');
	function out(val) {
		var tags, json, keys, test;
		try {

			// tagset from http://www.w3schools.com/html/html_forms.asp
			tags = [ 'input', 'textarea', 'label', 'fieldset', 'legend',
					'select', 'optgroup', 'option', 'button', 'datalist',
					'keygen', 'output' ];

			json = JSON.parse(val);

			keys = _.keys(json);

			// find returns on the first instance of a key. That is all we want
			// - one valid tag/key
			test = _.find(keys, function(key) {
				if (tags.indexOf(key) !== -1) {
					
					return true;
				}
			});

			if (!test) {
				// there are no html tags in this object
				throw new Error('no html tags in json object');

			} 

			return json;

		} catch (ex) {

			console.error(ex);

			return false;

		}
	}

	return out(text);
}