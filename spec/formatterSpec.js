var fs, formatter, filedata, cmd, validator, logger, data, valid, file;

// Required files
fs = require('fs');
formatter = require('../lib/formatter');
file = 'out/test.html';

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

        var test, valid = false;

        data = fs.readFileSync('testdata/test.json', 'utf8');

        valid = formatter.json2htmlform(data, file);

        expect(valid).toBeTruthy();

    });

});

