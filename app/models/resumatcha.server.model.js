'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Resumatcha Schema
 */
var ResumatchaSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Resumatcha name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Resumatcha', ResumatchaSchema);