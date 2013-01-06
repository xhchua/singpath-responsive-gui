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
function StoryController($scope,$resource){
    
		$scope.StoryModel = $resource('/jsonapi/stories');
        
		//A method to fetch a generic model and id. 
    $scope.fetch_stories = function(){
          $scope.StoryModel.query({}, function(response){
              $scope.stories = response;
              //alert("There are "+$scope.stories.length+" stories.");
          });
    };
    $scope.add = function(){
          //Wait for the response and then update phones.
          $scope.AddStory = $resource('/jsonapi/add_story');

          $scope.AddStory.get({}, function(response){
              $scope.story = response;
              //alert("Added story "+response.name);
              $scope.fetch_stories();
          });
    };
    $scope.fetch_stories();
}
