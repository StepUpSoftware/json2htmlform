var fs, formatter, filedata, cmd, validator, logger, data, valid, file;

// Required files
fs = require('fs');
formatter = require('../lib/formatter');
file = 'out/test.html';
htmlparser = require('htmlparser');
_ = require('../node_modules/underscore');

var handler = new htmlparser.DefaultHandler(function(err, dom) {
    var body;
    if (err) {

        console.log('error with htmlparser')

    } else {

        body = htmlparser.DomUtils.getElementsByTagType("html", dom);
        
        console.log(dom);

    }

});

parser = new htmlparser.Parser(handler);

//TODO still loading stale version of the saved file
describe(' outputted html file should be well formed', function() {
    var test;

    beforeEach(function() {

        test = fs.readFileSync(file, 'utf8');

        parser.parseComplete(test);

    });

    it('test.html should contain data', function() {

        expect(test).toBeTruthy();

        expect(handler.dom).toBeTruthy();

    });

});

