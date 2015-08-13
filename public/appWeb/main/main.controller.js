'use strict';

angular.module('appWeb')
  .controller('MainCtrl', function ($scope, $http, services) {

    services.getInsignias().then(function(data){
		$scope.customers = data.data;
	});

}).factory("services", ['$http', function($http) {
		var serviceBase = '/api/insignia'
		var obj = {};

	    obj.getInsignias = function(){
	    	return $http.get(serviceBase);
	    }

	    obj.getInsignia = function(id){
	    	return $http.get(serviceBase + '/' + id);
	    }
	    
	    return obj;
	}]);
