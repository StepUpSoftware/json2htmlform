#! /usr/bin/env node

(function() {

    // Declaring variables
    var fs, jsontohtml, filedata, cmd, logger, defaultError;

    // Required files
    fs = require('fs');
    jsontohtml = require('./lib/jsontohtml');
    logger = require('./lib/logger');
    cmd = require('commander');

    //try..catch exception handler
    var errorHandler = function(ex) {

        var msg = "" + ex;

        if (msg.indexOf("SyntaxError") !== -1) {

            logger.error('source file does not look like JSON');

        } else {

            logger.error("" + ex);

        }

        process.exit(1);

    };

    //commander object
    cmd.version('0.6.2').option("-s, --source [file]", "source file to use").option("-t, --target [target]", "file to write to (saved to out folder)");

    try {

        //process command line arguments
        cmd.parse(process.argv);

        defaultError = "usage is node main.js --source [file] --target [file]";

        if (!cmd.source || !cmd.target) {
            throw new Error(defaultError);
        }

        // Reading files
        fs.readFile(cmd.source, 'utf8', function(err, data) {

            var valid, target;

            try {

                if (err) {
                    throw new Error("Could not open file: " + cmd.source, err);

                }

                target = 'out/' + cmd.target;

                valid = jsontohtml.validate(data);

                if (valid) {

                    // Calling json2htmlform function
                    filedata = jsontohtml.write(data, target);

                    if (!filedata) {

                        throw new Error('unable to create ' + target);

                    }

                } else {

                    throw new Error(cmd.source + ' could not be validated.  Check your tags and the README');

                }

                logger.info('saved ' + cmd.source + ' to ' + target);

            } catch (ex) {

                errorHandler(ex);

            }

        });

    } catch (ex) {

        errorHandler(ex);

    }

}).call(this)