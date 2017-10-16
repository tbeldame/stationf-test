var stationfTest = angular.module('stationfTest');

stationfTest.controller('searchCtrl', function($scope, $filter, $http) {
	console.log('search controller loaded');

	$scope.filters = {
		capacity: 1,
	};
	$scope.hours = ['00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '23h'];

	/*$http.get('/api/rooms')
	.then(function(response) {
		$scope.rooms = response.data.rooms;
	});*/

	$scope.updateList = function() {
		console.log('updateList');
		if (!$scope.filters.date || !$scope.filters.time) {
			console.log('return');
			return ;
		}
		$http.get('/api/rooms', {
			params: {
				capacity: $scope.filters.capacity,
				tv: $scope.filters.tv,
				projector: $scope.filters.projector,
				date: $filter('date')($scope.filters.date, 'yyyy-MM-dd'),
				time: $scope.filters.time
			}
		})
		.then(function success(response) {
			$scope.rooms = response.data.rooms;
		}, function error(response) {
			console.error(response)
		});
	};

	$scope.addReservation = function(roomName) {
		console.log(roomName);
		$http.post('/api/reservations', {
			roomName: roomName,
			date: $filter('date')($scope.filters.date, 'yyyy-MM-dd'),
			time: $scope.filters.time
		})
		.then(function success(response) {
			$scope.rooms = [];
			$scope.capacity = 1;
			$scope.filters.tv = false;
			$scope.filters.projector = false;
			delete $scope.filters.date;
			delete $scope.filters.time;
			//should do something here
		}, function error(response) {
			console.error(response)
		});

	};
});
