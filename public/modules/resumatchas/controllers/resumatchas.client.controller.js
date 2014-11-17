'use strict';

// Resumatchas controller
angular.module('resumatchas').controller('ResumatchasController', ['$window','$sce','$scope', '$http', '$stateParams', '$location', 'Authentication', 'Resumatchas',
	function($window, $sce, $scope, $http, $stateParams, $location, Authentication, Resumatchas ) {
		$scope.authentication = Authentication;

		

		if ($location.$$path == '/resumatchas/searchideas') {
			$scope.radioSelect = 'ct_springideas';
		} else {
			$scope.radioSelect = 'ct_jobs';
		}
		
		$scope.searchResultClick = function(){
			// console.info('item clicked: ', this);
			if ($scope.radioSelect == 'ct_resumes') {
				// clicking on student resume opens a new window with the resume PDF
				var resumePath = 'http://54.68.53.40/' + this.searchResults[this.$index].fields.title[0];
				console.info('item clicked: ', resumePath);
				window.open(resumePath,"_blank");
			} else {
				// clicking on the job description binds the search terms with keywords
				var keywords = this.searchResults[this.$index].fields.concepts;
				// clear out old qstring
				$scope.qstring = '';
				var i = 0;
				while (i <= 5 && i <= keywords.length) {

					$scope.qstring += keywords[i] + ' ';
					i ++;
				}

				$scope.radioSelect = 'ct_resumes';


			}
			
		}


		$scope.search = function() {
			console.info('search btn clicked: ' + $scope.qstring, 'radiobtn selected:', $scope.radioSelect, $location.$$path  );




			$http.get('/resumatchas/search/' + $scope.radioSelect + '/' + $scope.qstring).
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    console.log("search success");
		    // console.log(data);
		    // console.log(status);
		    // console.log(headers);
		    // console.log(config);
		    // display search results
		    $scope.searchResults = data;
		    // $scope.searchResults = $sce.trustAsHtml(data);

		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    $scope.error = status;
		    console.log("search failed");
		  });


		}
		// Create new Resumatcha
		$scope.create = function() {
			// Create new Resumatcha object
			var resumatcha = new Resumatchas ({
				name: this.name
			});

			// Redirect after save
			resumatcha.$save(function(response) {
				$location.path('resumatchas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Resumatcha
		$scope.remove = function( resumatcha ) {
			if ( resumatcha ) { resumatcha.$remove();

				for (var i in $scope.resumatchas ) {
					if ($scope.resumatchas [i] === resumatcha ) {
						$scope.resumatchas.splice(i, 1);
					}
				}
			} else {
				$scope.resumatcha.$remove(function() {
					$location.path('resumatchas');
				});
			}
		};

		// Update existing Resumatcha
		$scope.update = function() {
			var resumatcha = $scope.resumatcha ;

			resumatcha.$update(function() {
				$location.path('resumatchas/' + resumatcha._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Resumatchas
		$scope.find = function() {
			$scope.resumatchas = Resumatchas.query();
		};

		// Find existing Resumatcha
		$scope.findOne = function() {
			$scope.resumatcha = Resumatchas.get({ 
				resumatchaId: $stateParams.resumatchaId
			});
		};
	}
]);