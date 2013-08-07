describe('formatting should work as expected', function() {

    var fs, formatter, validator, logger, cmd, _, handlebars;

    // Required files
    fs = require('fs');
    jsontohtml = require('../lib/jsontohtml');
    logger = require('../lib/logger');
    cmd = require('commander');
    _ = require('underscore');
    handlebars = require('handlebars');

    it('requires should be defined', function() {

        expect(fs).toBeDefined();
        expect(jsontohtml).toBeDefined();
        expect(logger).toBeDefined();
        expect(cmd).toBeDefined();
        expect(_).toBeDefined();
        expect(handlebars).toBeDefined();

    });

});

