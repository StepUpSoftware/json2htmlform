exports.log = function(str) {

    var debug = false;

    if (debug) {
        console.log(str);
    }

};

exports.error = function(str) {

    console.error(str);

};

exports.info = function(str) {

    console.info(str);

};
