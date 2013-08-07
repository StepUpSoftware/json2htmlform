var fs, formatter, filedata, cmd, validator, logger, data, valid, file, outfile, html;

// Required files
fs = require('fs');
formatter = require('../lib/formatter');
file = 'out/test.html';
outfile = 'out/test.json';

htmlparser = require('htmlparser');
_ = require('underscore');

var handler = new htmlparser.DefaultHandler(function(err, dom) {

    if (err) {

        console.log('error with htmlparser');

        return;

    }

    html = _.flatten(dom);

    _.each(html, function(tag) {
        _.each(tag, function(item) {
            if (item === 'html') {
                console.log(item.toString());
            }
        });
    });

    fs.writeFile(outfile, html, function(err) {

        if (err) {

            throw new Error("Problem saving file: " + outfile, err);

        } else {

            console.log('wrote ' + outfile);
        }

    });

});

parser = new htmlparser.Parser(handler);

describe('formatting should write an html file', function() {

    //remove any output files;
    beforeEach(function() {
        var path, files;

        path = 'out';

        files = fs.readdirSync(path);

        _.each(files, function(file) {

            var filePath = path + '/' + file;

            if (fs.statSync(filePath).isFile()) {

                fs.unlinkSync(filePath);

            }

        });

    });

    it('test.json should be formattable as an html file', function() {

        var test, valid, flag, body;

        runs(function() {

            flag = false;

            data = fs.readFileSync('testdata/test.json', 'utf8');

            valid = formatter.json2htmlform(data, file);

            //give it 500ms to save the file (async event)
            setTimeout(function() {
                flag = true;
            }, 500);

        });

        //force waitsFor to wait for 750 ms
        waitsFor(function() {
            return flag;
        }, "the html file should be saved", 750);

        runs(function() {
            test = fs.readFileSync(file, 'utf8');
            parser.parseComplete(test);
            expect(valid).toBeTruthy();
            expect(test).toBeTruthy();
            expect(html).toBeTruthy();
            expect(_.isArray(html)).toBeTruthy();
            expect(_.isObject(html)).toBeTruthy();
        });

    });

});

