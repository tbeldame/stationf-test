var stationfTest = angular.module('stationfTest');

stationfTest.controller('reservationsCtrl', function($scope, $http) {
	$http.get('/api/reservations')
	.then(function(response) {
		$scope.reservations = response.data.reservations;
	});

	$scope.deleteReservation = function (reservation) {
		console.log('a');
		$http.delete('/api/reservations/' + reservation._id)
		.then(function(response) {
			var index = $scope.reservations.indexOf(reservation);
			$scope.reservations.splice(index, 1);
		});
	};
});
