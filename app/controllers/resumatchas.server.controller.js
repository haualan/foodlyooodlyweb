'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Resumatcha = mongoose.model('Resumatcha'),
	_ = require('lodash');

// search elasticsearch eng
exports.search = function(req, res) {
	console.log("holler from search in server");
};

function search(req, res){
	console.log("holler from search in server, no exports");
};


/**
 * Create a Resumatcha
 */
exports.create = function(req, res) {
	var resumatcha = new Resumatcha(req.body);
	resumatcha.user = req.user;

	resumatcha.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resumatcha);
		}
	});
};

/**
 * Show the current Resumatcha
 */
exports.read = function(req, res) {
	res.jsonp(req.resumatcha);
};

/**
 * Update a Resumatcha
 */
exports.update = function(req, res) {
	var resumatcha = req.resumatcha ;

	resumatcha = _.extend(resumatcha , req.body);

	resumatcha.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resumatcha);
		}
	});
};

/**
 * Delete an Resumatcha
 */
exports.delete = function(req, res) {
	var resumatcha = req.resumatcha ;

	resumatcha.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resumatcha);
		}
	});
};

/**
 * List of Resumatchas
 */
exports.list = function(req, res) { Resumatcha.find().sort('-created').populate('user', 'displayName').exec(function(err, resumatchas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resumatchas);
		}
	});
};

/**
 * Resumatcha middleware
 */
exports.resumatchaByID = function(req, res, next, id) { Resumatcha.findById(id).populate('user', 'displayName').exec(function(err, resumatcha) {
		if (err) return next(err);
		if (! resumatcha) return next(new Error('Failed to load Resumatcha ' + id));
		req.resumatcha = resumatcha ;
		next();
	});
};

/**
 * Resumatcha authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.resumatcha.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};