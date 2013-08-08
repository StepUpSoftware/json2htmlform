exports.log = function(str) {

    var debug = false;

    if (debug) {
        console.log(str);
    }

};

exports.error = function(str) {

    console.error(str);

};
