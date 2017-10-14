var stationfTest = angular.module('stationfTest', ['ngRoute']);
console.log('test');

stationfTest.config(function($routeProvider, $locationProvider) {
	console.log('app');
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
