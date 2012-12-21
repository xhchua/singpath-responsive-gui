'use strict';

/* Controllers */

function PlayerController($scope,$resource){
        $scope.player = $resource('/jsonapi/player').get();
}

function InterfacesController($scope,$resource){
        $scope.interfaces = $resource('/jsonapi/interfaces').get();
}

//This could be used for development.
//Just create methods to pass in and set the model and id. 
function GenericController($scope,$resource){
		$scope.model = 'todo';
		$scope.id = '123';
		$scope.GenericModel = $resource('/api/:model/:id');
        
		//A method to fetch a generic model and id. 
        $scope.fetch = function(model, id){
          var data = {model: model, id:id};
          $scope.GenericModel.get(data, function(response){
                  $scope.generic = response;
              });
        };
        $scope.fetch('todo', '123');
}
