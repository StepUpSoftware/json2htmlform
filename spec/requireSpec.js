describe('formatting should work as expected', function() {

    var fs, formatter, validator, logger, cmd, _, handlebars;

    // Required files
    fs = require('fs');
    formatter = require('../lib/formatter');
    validator = require('../lib/validator');
    logger = require('../lib/logger');
    cmd = require('../node_modules/commander');
    _ = require('../node_modules/underscore');
    handlebars = require('../node_modules/handlebars');

    it('requires should be defined', function() {

        expect(fs).toBeDefined();
        expect(formatter).toBeDefined();
        expect(validator).toBeDefined();
        expect(logger).toBeDefined();
        expect(cmd).toBeDefined();
        expect(_).toBeDefined();
        expect(handlebars).toBeDefined();

    });

});

