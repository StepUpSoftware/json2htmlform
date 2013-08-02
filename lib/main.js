//main.js

(function() {
	// Declaring variables
	var fs, reptxt, filedata, cmd;

	// Requiring files
	fs = require('fs');
	reptxt = require('./formatter');
	cmd = require('../node_modules/commander');
	_ = require('../node_modules/underscore');

	var helpfunction = function() {
		console.log('');
		console.log('  Example:');
		console.log('');
		console
				.log('    main.js inputfile searchstring replacementstring outputfile logfile');
		console.log('');
		console.log('  e.g.');
		console.log('');
		console
				.log('    main.js "test.txt" "dog" "chicken" "out2.txt" "my.log" ');
		console.log('');
	};

	cmd.version('0.6.2').option('-l, --log', 'log errors');

	cmd.on('--help', helpfunction);

	cmd.parse(process.argv);

	if (_.size(cmd.args) === 5) {

		// Reading files
		fs
				.readFile(
						cmd.args[0],
						'utf8',
						function(err, data) {
							var json;

							try {

								if (err) {
									throw new Error("Could not open file: %s",
											err);

								}
								json = JSON.parse(data);

								if (!json) {

									throw new Error(
											"Source file does not contain JSON");

								}

								// Calling json2htmlform function
								filedata = reptxt.json2htmlform(data,
										cmd.args[1], cmd.args[2]);

								// Writing replaced text into a new file
								fs
										.writeFile(
												cmd.args[3],
												filedata,
												function(err) {
													if (err) {
														throw new Error(
																"Problem saving file: %s",
																err);
													}
													console.log(cmd.args[3]
															+ ' file saved!');
												});

							} catch (ex) {
								var msg = ex;
								
								if (msg.indexOf("SyntaxError") !== -1) {
									console
											.error('input file does not look like JSON');
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