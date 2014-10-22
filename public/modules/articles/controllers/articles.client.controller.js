'use strict';

angular
    .module('articles')
//     .filter('enodeBase64', function(){
//    return function(text){
//    return btoa(text);
//    }
// })
    .controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles','FileUploader',

// angular.module('articles',['flow']).controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles, FileUploader) {
		$scope.authentication = Authentication;
		
        var uploader = $scope.uploader = new FileUploader({
            // url: 'articles'
            url: 'upload/image',
            autoUpload: true
            // method: 'POST',
            // formData: {title: 'hahatesttuieke'}
        });

        console.info('mainarticleuploader', uploader);
        // uploader.filters.push({
        //     name: 'customFilter',
        //     fn: function(item /*{File|FileLikeObject}*/, options) {
        //         return this.queue.length < 10;
        //     }
        // });

        var picData;

        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            // console.info('uploaderresponse', btoa(response.pic));
            console.info('uploaderresponse', response.pic);
            picData = response.pic;
        };




		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content,
				pic: picData
			});

            console.log('scope create called');

			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
				$scope.pic = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			var article = $scope.article = Articles.get({
				articleId: $stateParams.articleId
			});

            console.info('findonescopeArticle',article);

            
		};


	}
]);




angular


    .module('appArticles', ['angularFileUpload'])


    .controller('AppController', ['$scope', 'FileUploader', function($scope, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            // url: 'upload.php'
            url: 'upload/image',
            // method: 'POST',
            // file: image
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);

        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }]);