'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Resumatcha = mongoose.model('Resumatcha'),
	_ = require('lodash'),
	elasticsearch = require('elasticsearch');

// Connect to the this host's cluster, sniff
// for the rest of the cluster right away, and
// again every 5 minutes
var client = new elasticsearch.Client({
  host: '54.68.53.40:9200'
  // sniffOnStart: true, somehow returning some unknown server
  // sniffInterval: 300000,
  // log: 'trace'
});




// search elasticsearch eng
exports.search = function(req, res) {
	console.log('holler from search in server');
	// var client = new searchClient();
	console.log(req.params.qstring);
	console.log(req.params.index);

	var qstring = req.params.qstring || '';

	// var	qindex = 'ct_resumes';
	var qindex = req.params.index;

	client.ping({
  requestTimeout: 1000,
  // undocumented params are appended to the query string
  hello: 'elasticsearch!'
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});


	// search for documents (and also promises!!)
	if (qindex == 'ct_springideas'){

			client.search({
			  index: qindex,
			  q: qstring,
			  size: 500,
			  body: {
		      fields: ['_id','idea_originator','idea_content','idea_comment','idea_interested'], 
		      query: {
		        match_all: {
		        }
		      }
		    }
			}).then(function (resp) {
				
				console.log(resp.hits.hits);
			  var hits = resp.hits.hits;
			  console.log('elasticsearch resp from server parsed hits....');
			  console.log(hits);
			  res.jsonp(hits);
			});

	} else {
			client.search({
			  index: qindex,
			  // q: qstring,
			  size: 500,
			  body: {
			  	fields: ['title'],
			    query: {
			      match: {
			        file: qstring
			      }
			    },
			    highlight:{
			    	fields:{
			    		file:{
			    		}
			    	}
			    }
			  }
			}).then(function (resp) {
				
				console.log(resp.hits.hits);
			  var hits = resp.hits.hits;
			  console.log('elasticsearch resp from server parsed hits....');
			  console.log(hits);
			  res.jsonp(hits);
			});

	};





  
// {
//       'fields': ['title'], 
//       'query': {
//         'match': {
//           'file': istr
//         }
//       },

//       'highlight': {
//         'fields': {
//           'file': {
//           },
//         }
//       }
//     }





	
	// res.jsonp({"poo": "brouhaha"});
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
			console.log('exports.list called');
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