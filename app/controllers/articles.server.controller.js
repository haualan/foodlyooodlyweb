'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Article = mongoose.model('Article'),
	_ = require('lodash');

var multiparty = require('multiparty'),
    uuid = require('uuid'),
    fs = require('fs'),
    easyimg = require('easyimage');

var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

var http = require('http');

var demo_text = 'Yesterday dumb Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one.';


// function entities(req, res, output) {
//   alchemyapi.entities('text', demo_text,{ 'sentiment':1 }, function(response) {
//     output['entities'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['entities'] };
//   });
// }
/**
 * Create a article
 */
exports.create = function(req, res) {
	var article = new Article(req.body);
	article.user = req.user;

  // console.log(article.content);



  

  var myText = article.content;
  alchemyapi.keywords("text", myText, {}, function(response) {

    console.log("response: %j", response);
    
    try {
      article.alchemyExtract = response["keywords"][0]["text"];
    }
    catch (e){
      console.log("article content too short probably");
      article.alchemyExtract = article.title;
    }
    
    //need to convert model to base64 otherwise mongoose will retreive an array for the picture
    article.pic = (new Buffer(article.pic).toString('base64'));


    http.get("http://54.148.44.95:5000/getCalories?q="+article.alchemyExtract, function(httpres) {
    
    console.log("Got FATBITAPI response: " + httpres.statusCode);

    httpres.on("data", function(chunk) {
      console.log("BODY: " + chunk);
      chunk = JSON.parse(chunk);
      var carlorie = chunk["result"];

      console.log("carlorie: " + carlorie);

      article.Calories = carlorie;






    // console.log(article.pic);

    	article.save(function(err) {
    		if (err) {
    			return res.status(400).send({
    				message: errorHandler.getErrorMessage(err)
    			});
    		} else {
    			res.json(article);
    		}
    	});



    });

    }).on('error', function(e) {
      console.log("Got error on FATBITAPI: " + e.message);
    });




  });




};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var article = req.article;

	article = _.extend(article, req.body);

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {
	Article.findById(id).populate('user', 'displayName').exec(function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('Failed to load article ' + id));


		// Alan: have to convert picture to base64 encoding... retarded because buffer model from mongo doesn't convert things correctly
    // article.pic = article.pic.toString('base64');
    console.log(article);


    req.article = article;



		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.article.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};




exports.postImage = function(req, res) {
	console.log('postImage called');
    var article = new Article(req.body);
    article.user = req.user;


    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var file = files.file[0];
        var contentType = file.headers['content-type'];
        var tmpPath = file.path;
        var extIndex = tmpPath.lastIndexOf('.');
        var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
        // uuid is for generating unique filenames. 
        var fileName = uuid.v4() + extension;
        // var destPath = 'path/to/where/you/want/to/store/your/files/' + fileName;
        var destPath = 'userImages/' + fileName;

        // Server side file type checker.
        if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
            fs.unlink(tmpPath);
            return res.status(400).send('Unsupported file type.');
        }
        var resizedImage;
        console.log('begin easyimg thumbnailing...');

        easyimg.rescrop({
             src:tmpPath, dst:tmpPath,
             width:200, height:200,
             cropwidth:0, cropheight:0,
             x:0, y:0
          }).then(
          function(image) {
             console.log('Resized and cropped: ' + image.width + ' x ' + image.height);

             resizedImage = image;


             article.pic = fs.readFileSync(tmpPath);
             article.title = 'tempTitle';
             article.content = 'tempContent';

             // console.log(article);
             return res.jsonp(article);
          },
          function (err) {
            console.log(err);
          }
        );

        console.log('end easyimg thumbnailing...');

        // article.pic = resizedImage;
        // article.pic = fs.readFileSync(tmpPath);
        // article.title = 'tempTitle';
        // article.content = 'tempContent';

        // // article.save(res.jsonp(article));

        // return res.jsonp(article);


        // fs.rename(tmpPath, destPath, function(err) {
        //     if (err) {
        //         return res.status(400).send('Image is not saved:');
        //     }


        //     article.pic = fs.readFileSync(destPath);
            

        //     // temporary place title and content
        //     article.title = 'tempTitle';
        //     article.content = 'tempContent';
        //     article.save(res.jsonp(article));




        //     // return res.json(destPath);
        //     // return res.jsonp(article);
        // });




    });




};