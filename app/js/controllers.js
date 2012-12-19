'use strict';

/* Controllers */


function PlayerController($scope,$resource){
        $scope.player = $resource('player.json').get();
}

function MyCtrl1($scope) {
	$scope.name="Bob";
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
