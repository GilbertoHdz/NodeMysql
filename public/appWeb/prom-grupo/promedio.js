'use strict';

angular.module('appWeb')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/promedio_grupo', {
				templateUrl : 'appWeb/prom-grupo/promedio.html',
				controller : 'PromedioCtrl'
			});
});