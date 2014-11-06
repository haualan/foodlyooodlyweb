'use strict';

//Resumatchas service used to communicate Resumatchas REST endpoints
angular.module('resumatchas').factory('Resumatchas', ['$resource',
	function($resource) {
		return $resource('resumatchas/:resumatchaId', { resumatchaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);