'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Resumatcha = mongoose.model('Resumatcha');

/**
 * Globals
 */
var user, resumatcha;

/**
 * Unit tests
 */
describe('Resumatcha Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			resumatcha = new Resumatcha({
				name: 'Resumatcha Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return resumatcha.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			resumatcha.name = '';

			return resumatcha.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Resumatcha.remove().exec();
		User.remove().exec();

		done();
	});
});