'use strict';

// Configuring the Articles module
angular.module('resumatchas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Resumatchas', 'resumatchas', 'dropdown', '/resumatchas(/create)?');
		// Menus.addSubMenuItem('topbar', 'resumatchas', 'List Resumatchas', 'resumatchas');
		Menus.addSubMenuItem('topbar', 'resumatchas', 'Jobs/Resumes', 'resumatchas/create');
    Menus.addSubMenuItem('topbar', 'resumatchas', 'Spring Ideas', 'resumatchas/searchideas');
	}
]);