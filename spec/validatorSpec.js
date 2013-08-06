describe('validation should work as expected', function() {

    var fs, formatter, filedata, cmd, validator, logger, data, valid, invalid, validator, test;

    // Required files
    fs = require('fs');
    formatter = require('../lib/formatter');
    validator = require('../lib/validator');
    logger = require('../lib/logger');
    cmd = require('../node_modules/commander');
    _ = require('../node_modules/underscore');

    it('test.json should contain valid test data', function() {

        data = template = fs.readFileSync('testdata/test.json', 'utf8');
        valid = validator.validate(data);

        expect(data).toBeDefined();
        expect(valid).toEqual(true);
    });

    it('test2.json should contain valid test data', function() {

        data = template = fs.readFileSync('testdata/test2.json', 'utf8');
        valid = validator.validate(data);

        expect(data).toBeDefined();
        expect(valid).toEqual(true);
    });

    it('test3.json should contain invalid test data', function() {

        data = template = fs.readFileSync('testdata/test3.json', 'utf8');
        invalid = validator.validate(data);

        expect(data).toBeDefined();
        expect(invalid).toEqual(false);
    });

    it('test4.json should contain invalid test data', function() {

        data = template = fs.readFileSync('testdata/test4.json', 'utf8');
        valid = validator.validate(data);

        expect(data).toBeDefined();
        expect(valid).toEqual(false);
    });

});

