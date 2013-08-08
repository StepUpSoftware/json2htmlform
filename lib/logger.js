exports.log = function(str) {

    var debug = true;

    if (debug) {
        console.log(str);
    }

};

exports.error = function(str) {

    console.error(str);

};
