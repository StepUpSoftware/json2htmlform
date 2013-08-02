//main.js

(function() {
	// Declaring variables
	var fs, formatter, filedata, cmd;

	// Requiring files
	fs = require('fs');
	formatter = require('./formatter');
	validator = require('./validator');
	cmd = require('../node_modules/commander');
	_ = require('../node_modules/underscore');

	var helpfunction = function() {
		console.log('');
		console.log('  Example:');
		console.log('');
		console
				.log('    main.js inputfile ');
		console.log('');
		console.log('  e.g.');
		console.log('');
		console
				.log('    main.js "test.txt"');
		console.log('');
	};

	cmd.version('0.6.2').option('-l, --log', 'log errors').option('-h, --html', 'html');

	cmd.on('--help', helpfunction);

	cmd.parse(process.argv);

	if (_.size(cmd.args) === 1) {

		// Reading files
		fs.readFile(cmd.args[0], 'utf8', function(err, data) {

			var json;
			
			var filename = cmd.args[0].split('.');
			
			var outputfile = filename[0] + 'out.txt';

			try {

				if (err) {
					throw new Error("Could not open file: %s", err);

				}
				json = validator.validate(data);

				if (!json) {

					throw new Error("Source file does not contain JSON");

				}

				// Calling json2htmlform function
				filedata = formatter.json2htmlform(json);

				// Writing replaced text into a new file
				fs.writeFile(outputfile, filedata, function(err) {

					if (err) {
						throw new Error("Problem saving file: %s", err);
					}

					console.log(outputfile + ' file saved!');
				});

			} catch (ex) {

				var msg = "" + ex;

				if (msg.indexOf("SyntaxError") !== -1) {

					console.error('input file does not look like JSON');

				} else {

					console.error('error: ' + ex);

				}

				process.exit(1);

			}

		});

	} else {
		helpfunction();
	}

}).call(this)