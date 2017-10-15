var stationfTest = angular.module('stationfTest');

stationfTest.controller('searchCtrl', function($scope, $http) {
	console.log('search controller loaded');

	$scope.filters = {
		capacity: 1,
	};
	$scope.capacity = 1;
	//shoud be replaced with the timepicker
	$scope.hours = ['00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '23h'];

	/*$http.get('/api/rooms')
	.then(function(response) {
		$scope.rooms = response.data.rooms;
	});*/

	$scope.updateList = function() {
		console.log('updateList');
		$http.get('/api/rooms', {
			params: {
				capacity: $scope.capacity,
				tv: $scope.tv,
				projector: $scope.projector,
				date: $scope.date,
				time: $scope.time
			}
		})
		.then(function success(response) {
			$scope.rooms = response.data.rooms;
		}, function error(response) {
			console.error(response)
		});
	};

	$scope.addReservation = function(data) {
		console.log(data);
		$http.post('/api/reservation', {
			params: data
		})
		.then(function success(response) {
			$scope.rooms = response.data.rooms;
		}, function error(response) {
			console.error(response)
		});

	};
});