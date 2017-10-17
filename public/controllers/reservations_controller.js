var stationfTest = angular.module('stationfTest');

stationfTest.controller('reservationsCtrl', function($scope, $http) {
	$http.get('/api/reservations')
	.then(function success(response) {
			$scope.reservations = response.data.reservations;
	}, function error(response) {
		console.error(response)
	});

	$scope.deleteReservation = function (reservation) {
		$http.delete('/api/reservations/' + reservation._id)
		.then(function success(response) {
			var index = $scope.reservations.indexOf(reservation);
			$scope.reservations.splice(index, 1);
		}, function error(response) {
			console.error(response)
		});
	};
});
