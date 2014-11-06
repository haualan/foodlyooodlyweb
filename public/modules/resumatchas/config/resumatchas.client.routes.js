'use strict';

//Setting up route
angular.module('resumatchas').config(['$stateProvider',
	function($stateProvider) {
		// Resumatchas state routing
		$stateProvider.
		state('listResumatchas', {
			url: '/resumatchas',
			templateUrl: 'modules/resumatchas/views/list-resumatchas.client.view.html'
		}).
		state('createResumatcha', {
			url: '/resumatchas/create',
			templateUrl: 'modules/resumatchas/views/create-resumatcha.client.view.html'
		}).
		state('viewResumatcha', {
			url: '/resumatchas/:resumatchaId',
			templateUrl: 'modules/resumatchas/views/view-resumatcha.client.view.html'
		}).
		state('editResumatcha', {
			url: '/resumatchas/:resumatchaId/edit',
			templateUrl: 'modules/resumatchas/views/edit-resumatcha.client.view.html'
		});
	}
]);