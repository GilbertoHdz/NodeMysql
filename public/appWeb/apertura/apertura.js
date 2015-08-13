'use strict';

angular.module('appWeb')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/apertura', {
				templateUrl : 'appWeb/apertura/apertura.html',
				controller : 'AperturaCtrl'
			});
});