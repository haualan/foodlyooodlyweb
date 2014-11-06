'use strict';

// Resumatchas controller
angular.module('resumatchas').controller('ResumatchasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resumatchas',
	function($scope, $stateParams, $location, Authentication, Resumatchas ) {
		$scope.authentication = Authentication;



		$scope.search = function() {
			console.log("search btn clicked");
			Resumatchas.search();
			

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