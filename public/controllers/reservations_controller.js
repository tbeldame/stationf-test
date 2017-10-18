var stationfTest = angular.module('stationfTest');

stationfTest.controller('reservationsCtrl', function($scope, $http, $mdToast) {
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
			$mdToast.show(
				$mdToast.simple()
				.theme('success-toast')
				.position('top right')
				.textContent('Cette reservation a bien ete annulee')
				.hideDelay(3000)
			);
		}, function error(response) {
			$mdToast.show(
				$mdToast.simple()
				.theme('error-toast')
				.position('top right')
				.textContent('Une erreur est survenue')
				.hideDelay(3000)
			);
		});
	};
});
