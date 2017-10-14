var stationfTest = angular.module('stationfTest');

stationfTest.controller('searchCtrl', function($scope, $http) {
	console.log('search controller loaded');
	$http.get('/api/rooms')
	.then(function(response) {
		$scope.rooms = response.data.rooms;
	});
	$scope.addResevation = function() {
		$http.post('/api/reservation').success(function(response) {
			console.log(response);
		});
	};
});
