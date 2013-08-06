var fs, formatter, filedata, cmd, validator, logger, data, valid, file;

// Required files
fs = require('fs');
formatter = require('../lib/formatter');
file = 'out/test.html';

describe(' outputted html file should be well formed', function() {

    it('test.html should contain data', function() {

        var test;

        test = fs.readFileSync(file, 'utf8');

        expect(test).toBeTruthy();

    });

});

