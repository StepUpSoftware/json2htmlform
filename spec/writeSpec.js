var fs, formatter, filedata, cmd, validator, logger, data, valid, html, children;

// Required files
fs = require('fs');
formatter = require('../lib/jsontohtml');

htmlparser = require('htmlparser');
_ = require('underscore');

var handler = new htmlparser.DefaultHandler(function(err, dom) {

    var kids;

    if (err) {

        console.log('error with htmlparser');

        return;

    }

    var klass = htmlparser.DomUtils.getElements({
        'class' : "form"
    }, dom);

    kids = klass.pop().children;

    children = [];

    _.each(kids, function(value, key) {
        //strip out keys that we don't want
        if (value['raw']) {
            delete kids[key]['raw'];
        }
        if (value['data']) {
            delete kids[key]['data'];
        }
        if (value['type']) {
            delete kids[key]['type'];
        }
        if (value['children']) {
            delete kids[key]['children'];
        }
        //strips out empty objects
        if (value['name']) {
            children.push(value);
        }
    });

    kids = null;

});

parser = new htmlparser.Parser(handler);

describe('formatting should write an html file', function() {

    //remove any test output files;
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

        var test, valid, write, flag, body, itemCount, childrenCount;

        runs(function() {

            flag = false;

            data = fs.readFileSync('testdata/test.json', 'utf8');
            valid = jsontohtml.validate(data);
            write = jsontohtml.write(data, 'out/test.html');

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

            test = fs.readFileSync('out/test.html', 'utf8');
            parser.parseComplete(test);
            childrenCount = _.size(children);
            expect(valid).toBeTruthy();
            expect(write).toBeTruthy();
            expect(test).toBeTruthy();
            expect(childrenCount).toEqual(12);

        });

    });

    it('test6.json should be formattable as an html file', function() {

        var test, valid, flag, body, itemCount, childrenCount;

        runs(function() {

            flag = false;

            data = fs.readFileSync('testdata/test6.json', 'utf8');
            valid = jsontohtml.validate(data);
            write = jsontohtml.write(data, 'out/test6.html');

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

            test = fs.readFileSync('out/test6.html', 'utf8');
            parser.parseComplete(test);
            childrenCount = _.size(children);
            expect(valid).toBeTruthy();
            expect(write).toBeTruthy();
            expect(test).toBeTruthy();
            expect(childrenCount).toEqual(3);

        });

    });

});
