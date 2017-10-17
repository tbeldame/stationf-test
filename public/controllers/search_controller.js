var stationfTest = angular.module('stationfTest');

stationfTest.controller('searchCtrl', function($scope, $filter, $http, $mdToast) {
	$scope.filters = {
		capacity: 1,
	};
	$scope.minDate = new Date();
	$scope.noRooms = false;
	$scope.hours = ['00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];

	$scope.hasTv = function (equipements) {
		for (var i = 0; i < equipements.length; i++) {
			if (equipements[i].name === 'TV')
				return (true);
		}
		return (false);
	};

	$scope.hasProjector = function (equipements) {
		for (var i = 0; i < equipements.length; i++) {
			if (equipements[i].name === 'Retro Projecteur')
				return (true);
		}
		return (false);

	};

	$scope.updateList = function() {
		if (!$scope.filters.date || !$scope.filters.time) {
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
			if (response.data.rooms.length === 0)
				$scope.noRooms = true;
			else
				$scope.noRooms = false;
		}, function error(response) {
			alert('error');
		});
	};

	$scope.addReservation = function(room) {
		$http.post('/api/reservations', {
			roomName: room.name,
			date: $filter('date')($scope.filters.date, 'yyyy-MM-dd'),
			time: $scope.filters.time
		})
		.then(function success(response) {
			//confirmation toast
			$mdToast.show(
				$mdToast.simple()
				.textContent('Salle reservee avec succes')
				.hideDelay(3000)
			);
			var index = $scope.rooms.indexOf(room);
			$scope.rooms.splice(index, 1);
			if ($scope.rooms.length === 0)
				$scope.noRooms = true;
		}, function error(response) {
			console.error(response)
		});
	};
});
