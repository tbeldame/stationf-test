var stationfTest = angular.module('stationfTest');

stationfTest.controller('searchCtrl', [$scope, $http, function($scope, $http) {
	$http.get('/api/rooms').success(function(response) {
		$scope.rooms = response;
	});
	$scope.addResevation = function() {
		$http.post('/api/reservation').success(function(response) {
			console.log(response);
		});
	};
});
