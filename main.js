//main.js

(function() {

    // Declaring variables
    var fs, jsontohtml, filedata, cmd, logger, defaultError;

    // Required files
    fs = require('fs');
    jsontohtml = require('./lib/jsontohtml');
    logger = require('./lib/logger');
    cmd = require('commander');
    _ = require('underscore');

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

        if (!cmd.source) {
            throw new Error(defaultError);
        }

        if (!cmd.target) {
            throw new Error(defaultError);
        }

        // Reading files
        fs.readFile(cmd.source, 'utf8', function(err, data) {

            try {

                var valid, outputfile;

                //use supplied target filename or derive it from source file name
                outputfile = 'out/' + cmd.target;

                if (err) {
                    throw new Error("Could not open file: " + cmd.source, err);

                }
                valid = jsontohtml.validate(data);

                if (valid) {

                    // Calling json2htmlform function
                    filedata = jsontohtml.write(data, outputfile);

                    if (!filedata) {

                        throw new Error('unable to create ' + outputfile);

                    }

                } else {

                    throw new Error(cmd.source + ' could not be validated.  Check your tags and the README');

                }

                logger.info('saved ' + cmd.source + ' to ' + outputfile);

            } catch (ex) {

                errorHandler(ex);

            }

        });

    } catch (ex) {

        errorHandler(ex);

    }

}).call(this)