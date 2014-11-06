'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var resumatchas = require('../../app/controllers/resumatchas');

	// Resumatchas Routes
	app.route('/resumatchas')
		.get(resumatchas.list)
		.post(users.requiresLogin, resumatchas.create);

	app.route('/resumatchas/:resumatchaId')
		.get(resumatchas.read)
		.put(users.requiresLogin, resumatchas.hasAuthorization, resumatchas.update)
		.delete(users.requiresLogin, resumatchas.hasAuthorization, resumatchas.delete);

	// Finish by binding the Resumatcha middleware
	app.param('resumatchaId', resumatchas.resumatchaByID);
};