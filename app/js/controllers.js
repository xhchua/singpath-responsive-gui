'use strict';

/* Controllers */

function PlayerController($scope,$resource){
        $scope.player = $resource('/jsonapi/player').get();
}

function InterfacesController($scope,$resource){
        $scope.interfaces = $resource('/jsonapi/interfaces').get();
}

