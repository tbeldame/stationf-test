var stationfTest = angular.module('stationfTest', ['ngRoute']);

stationfTest.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		controller: 'homeCtrl',
		templateUrl: 'views/home.html'
	})
	.when('/searchrooms', {
		controller: 'searchCtrl',
		templateUrl: 'views/search_rooms.html'
	})
	.when('/reservations', {
		controller: 'reservationsCtrl',
		templateUrl: 'views/reservations.html'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);
});
