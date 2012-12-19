'use strict';

//var testing = window.location.search.replace("?testing=", "");
var testing = 'true';

var myApp = angular.module('myApp', ['ngResource']);

if (testing=='true') {
	var myAppDev = angular.module('myApp', ['ngResource','ngMockE2E']);
	
	myAppDev.run(function($httpBackend) {
  		var player = {name: 'Sandra'};
  		$httpBackend.whenGET('player.json').respond(player); 
	});
}
