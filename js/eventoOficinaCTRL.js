(function() {
  'use strict';
  var app = angular.module('BlueGestor');
  app.controller('eventosEoficinas' ,function ($scope, $database ,$stateParams,$state,$filter, $rootScope){
    $scope.eventos = [];
    $scope.oficinasEventos = [];
    $database.getEvento().then(function(eventos){
      return eventos.val();
    }).then(function (eventos) {
      $scope.eventos = [];
      angular.forEach(eventos, function(value, key) {
        value.key = key;
        $scope.eventos.push(value);
      });
      $scope.$apply();
    });

    $scope.listaOficinas = function (key) {
      $database.getOficinas(key).then(function (Oficinas) {
        return Oficinas.val();
      }).then(function (todasOficinasDoEvento) {
        angular.forEach(todasOficinasDoEvento, function(value, key) {
          value.key = key;
          $scope.oficinasEventos.push(value);
        });
        $scope.$apply();
      });

    }

    // Paginação configuração
    $scope.config = {
      itemsPerPage: 10,
      maxPages:3,
      fillLastPage: false
    }


  });
})();
