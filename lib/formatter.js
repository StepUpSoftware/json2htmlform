//formatter.js
exports.json2htmlform = function(obj) {

    // formats the json object as an html document
    function format(obj) {
        
        var data;
               
        if ( typeof obj === 'string') {

            return JSON.stringify(obj);

        }
        
        return false;

    }

    return format(obj);
}