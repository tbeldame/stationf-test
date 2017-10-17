var stationfTest = angular.module('stationfTest', ['ngRoute', 'ngMaterial']);

stationfTest.config(function($routeProvider, $locationProvider, $mdDateLocaleProvider) {
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

	$mdDateLocaleProvider.formatDate = function(date) {
		return (date ? moment(date).format('DD/MM/YYYY') : 'Date');
	};
});
