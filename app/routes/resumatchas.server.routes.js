'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var resumatchas = require('../../app/controllers/resumatchas');

	// Resumatchas Routes
	app.route('/resumatchas')
	// in .get i can remove requires login to open API for everyone
		.get(resumatchas.list)
		.post(users.requiresLogin, resumatchas.create);

	// app.route('/resumatchas/:resumatchaId')
	// 	.get(resumatchas.read)
	// 	.put(users.requiresLogin, resumatchas.hasAuthorization, resumatchas.update)
	// 	.delete(users.requiresLogin, resumatchas.hasAuthorization, resumatchas.delete);

	app.route('/resumatchas/search/:index/:qstring')
		.get(resumatchas.search);

	// Finish by binding the Resumatcha middleware
	app.param('qstring', resumatchas.search);
	app.param('index', resumatchas.search);
};