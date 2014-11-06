'use strict';

(function() {
	// Resumatchas Controller Spec
	describe('Resumatchas Controller Tests', function() {
		// Initialize global variables
		var ResumatchasController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Resumatchas controller.
			ResumatchasController = $controller('ResumatchasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Resumatcha object fetched from XHR', inject(function(Resumatchas) {
			// Create sample Resumatcha using the Resumatchas service
			var sampleResumatcha = new Resumatchas({
				name: 'New Resumatcha'
			});

			// Create a sample Resumatchas array that includes the new Resumatcha
			var sampleResumatchas = [sampleResumatcha];

			// Set GET response
			$httpBackend.expectGET('resumatchas').respond(sampleResumatchas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.resumatchas).toEqualData(sampleResumatchas);
		}));

		it('$scope.findOne() should create an array with one Resumatcha object fetched from XHR using a resumatchaId URL parameter', inject(function(Resumatchas) {
			// Define a sample Resumatcha object
			var sampleResumatcha = new Resumatchas({
				name: 'New Resumatcha'
			});

			// Set the URL parameter
			$stateParams.resumatchaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/resumatchas\/([0-9a-fA-F]{24})$/).respond(sampleResumatcha);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.resumatcha).toEqualData(sampleResumatcha);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Resumatchas) {
			// Create a sample Resumatcha object
			var sampleResumatchaPostData = new Resumatchas({
				name: 'New Resumatcha'
			});

			// Create a sample Resumatcha response
			var sampleResumatchaResponse = new Resumatchas({
				_id: '525cf20451979dea2c000001',
				name: 'New Resumatcha'
			});

			// Fixture mock form input values
			scope.name = 'New Resumatcha';

			// Set POST response
			$httpBackend.expectPOST('resumatchas', sampleResumatchaPostData).respond(sampleResumatchaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Resumatcha was created
			expect($location.path()).toBe('/resumatchas/' + sampleResumatchaResponse._id);
		}));

		it('$scope.update() should update a valid Resumatcha', inject(function(Resumatchas) {
			// Define a sample Resumatcha put data
			var sampleResumatchaPutData = new Resumatchas({
				_id: '525cf20451979dea2c000001',
				name: 'New Resumatcha'
			});

			// Mock Resumatcha in scope
			scope.resumatcha = sampleResumatchaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/resumatchas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/resumatchas/' + sampleResumatchaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid resumatchaId and remove the Resumatcha from the scope', inject(function(Resumatchas) {
			// Create new Resumatcha object
			var sampleResumatcha = new Resumatchas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Resumatchas array and include the Resumatcha
			scope.resumatchas = [sampleResumatcha];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/resumatchas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleResumatcha);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.resumatchas.length).toBe(0);
		}));
	});
}());