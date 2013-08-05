describe('formatting should work as expected', function() {

    var fs, formatter, filedata, cmd, validator, logger, data, valid, invalid, validator, test;

    // Required files
    fs = require('fs');
    formatter = require('../lib/formatter');
    validator = require('../lib/validator');
    logger = require('../lib/logger');
    cmd = require('../node_modules/commander');
    _ = require('../node_modules/underscore');
    handlebars = require('../node_modules/handlebars');

    beforeEach(function() {

    });

    it('requires should be defined', function() {

        expect(fs).toBeDefined();
        expect(formatter).toBeDefined();
        expect(validator).toBeDefined();
        expect(logger).toBeDefined();
        expect(cmd).toBeDefined();
        expect(_).toBeDefined();
        expect(handlebars).toBeDefined();

    });

    it('test.json should contain valid test data', function() {

        data = template = fs.readFileSync('testdata/test.json', 'utf8');
        valid = formatter.json2htmlform(data);

        expect(data).toBeDefined();
        expect(valid).toBeTruthy();
    });

    it('test2.json should contain valid test data', function() {

        data = template = fs.readFileSync('testdata/test2.json', 'utf8');
        valid = formatter.json2htmlform(data);

        expect(data).toBeDefined();
        expect(valid).toBeTruthy();
    });

    it('test3.json should contain invalid test data', function() {

        data = template = fs.readFileSync('testdata/test3.json', 'utf8');
        valid = formatter.json2htmlform(data);

        expect(data).toBeDefined();
        expect(valid).toBeTruthy();
    });

    it('test4.json should contain invalid test data', function() {

        data = template = fs.readFileSync('testdata/test4.json', 'utf8');
        valid = formatter.json2htmlform(data);

        expect(data).toBeDefined();
        expect(valid).toBeTruthy();
    });

});

