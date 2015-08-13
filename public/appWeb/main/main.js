'use strict';

angular.module('appWeb')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'appWeb/main/main.html',
        controller: 'MainCtrl'
      });
  });