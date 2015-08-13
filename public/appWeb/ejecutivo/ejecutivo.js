'use strict';

angular.module('appWeb')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/ejecutivo', {
				templateUrl : 'appWeb/ejecutivo/ejecutivo.html',
				controller : 'EjecutivoCtrl'
			});
});