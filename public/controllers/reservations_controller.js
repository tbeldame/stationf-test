var stationfTest = angular.module('stationfTest');

stationfTest.controller('reservationsCtrl', function($scope, $http) {
	console.log('reservations controller loaded');
	$http.get('/api/reservations')
	.then(function(response) {
		$scope.reservations = response.data.reservations;
	});
});
