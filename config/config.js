'use strict';


/**
 * Module dependencies.
 */
var _ = require('lodash'),
	glob = require('glob');

/**
 * Load app configurations
 */
module.exports = _.extend(
	require('./env/all'),
	require('./env/' + process.env.NODE_ENV) || {}
);


// If we are in local development environment the oath2 redirect_uris need to change
var isLocalEnv = false;
// insert oauth2 tokens here

if (isLocalEnv) {
	module.exports.google = JSON.parse('{"web":{"auth_uri":"https://accounts.google.com/o/oauth2/auth","client_secret":"4_RUgxmczZP3xilqIM9vfU3t","token_uri":"https://accounts.google.com/o/oauth2/token","client_email":"723630520056-p4d0s4le60cpremdk6vovsfddum2nesq@developer.gserviceaccount.com","redirect_uris":["http://localhost:3000/auth/google/callback"],"client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/723630520056-p4d0s4le60cpremdk6vovsfddum2nesq@developer.gserviceaccount.com","client_id":"723630520056-p4d0s4le60cpremdk6vovsfddum2nesq.apps.googleusercontent.com","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","javascript_origins":["https://localhost:3000"]}}');

} else {
	module.exports.google = JSON.parse('{"web":{"auth_uri":"https://accounts.google.com/o/oauth2/auth","client_secret":"4_RUgxmczZP3xilqIM9vfU3t","token_uri":"https://accounts.google.com/o/oauth2/token","client_email":"723630520056-p4d0s4le60cpremdk6vovsfddum2nesq@developer.gserviceaccount.com","redirect_uris":["http://104.131.123.186:3000/auth/google/callback"],"client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/723630520056-p4d0s4le60cpremdk6vovsfddum2nesq@developer.gserviceaccount.com","client_id":"723630520056-p4d0s4le60cpremdk6vovsfddum2nesq.apps.googleusercontent.com","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","javascript_origins":["https://104.131.123.186:3000"]}}');

}



/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
	// For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob 
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			glob(globPatterns, {
				sync: true
			}, function(err, files) {
				if (removeRoot) {
					files = files.map(function(file) {
						return file.replace(removeRoot, '');
					});
				}

				output = _.union(output, files);
			});
		}
	}

	return output;
};

/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function(includeTests) {
	var output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'public/');

	// To include tests
	if (includeTests) {
		output = _.union(output, this.getGlobbedFiles(this.assets.tests));
	}

	return output;
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function() {
	var output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'public/');
	return output;
};