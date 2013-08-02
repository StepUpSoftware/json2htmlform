//formatter.js
exports.json2htmlform = function(text) {
	// formats the json object as an html document
	function out(val) {
		return JSON.stringify(val);
	}

	return out(text);
}