//main.js

(function() {

    // Declaring variables
    var fs, formatter, filedata, cmd, validator, logger;

    // Required files
    fs = require('fs');
    formatter = require('./lib/formatter');
    validator = require('./lib/validator');
    logger = require('./lib/logger');
    cmd = require('./node_modules/commander');
    _ = require('./node_modules/underscore');

    //try..catch exception handler
    var errorHandler = function(ex) {

        var msg = "" + ex;

        if (msg.indexOf("SyntaxError") !== -1) {

            logger.log('source file does not look like JSON');

        } else {

            logger.log("" + ex);

        }

        process.exit(1);

    };

    //commander object
    cmd.version('0.6.2').option("-s, --source [file]", "source file to use").option("-t, --target [target]", "file to write to");

    try {

        //process command line arguments
        cmd.parse(process.argv);

        if (!cmd.source) {
            throw new Error("source file not specified");
        }
        
        if (!cmd.target) {
            throw new Error("target file not specified");
        }

        // Reading files
        fs.readFile(cmd.source, 'utf8', function(err, data) {

            try {

                var valid, filename, outputfile;

                //split filename and file extension
                filename = cmd.source.split('.')

                //use supplied target filename or derive it from source file name
                outputfile = 'out/' +cmd.target;
                

                if (err) {
                    throw new Error("Could not open file: " + cmd.source, err);

                }
                valid = validator.validate(data);

                if (valid) {

                    // Calling json2htmlform function
                    filedata = formatter.json2htmlform(data);

                    if (filedata) {

                        // Writing replaced text into a new file
                        fs.writeFile(outputfile, filedata, function(err) {

                            if (err) {

                                throw new Error("Problem saving file: " + outputfile, err);

                            }

                            logger.log(outputfile + ' file saved');
                        });

                    } else {

                        logger.log('unable to format source data');

                    }

                }

            } catch (ex) {

                errorHandler(ex);

            }

        });

    } catch (ex) {

        errorHandler(ex);

    }

}).call(this)