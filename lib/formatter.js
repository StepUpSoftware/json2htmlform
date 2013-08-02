//json2htmlform.js
exports.json2htmlform = function(text, vala, valb){
    function out(val){
        return text.replace(vala,valb);
    }

    return out(vala,valb);
}