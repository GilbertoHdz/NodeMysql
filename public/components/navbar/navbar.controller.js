'use strict';

angular.module('appWeb')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Insignias',
      'link': '/'
    },{
      'title': 'Apertura',
      'link': '/apertura'
    },{
      'title': 'Promedio Grupo',
      'link': '/promedio_grupo'
    },{
      'title': 'Ejecutivo',
      'link': '/ejecutivo'
    }];

  });