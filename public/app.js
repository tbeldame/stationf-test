var stationfTest = angular.module('stationfTest', ['ngRoute']);
console.log('test');

stationfTest.config(function($routeProvider) {
	console.log('app');
	$routeProvider.when('/', {
		controller: '',
		templateUrl: 'views/home.html'
	})
	.when('/searchrooms', {
		controller: 'searchCtrl',
		templateUrl: 'views/search_rooms.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});
