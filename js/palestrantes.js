(function() {
  'use strict';
  var app = angular.module('BlueGestor');
  app.controller('palestrantesCTRL' ,function ($scope, $database ,$stateParams,$state,$filter, $rootScope){
      // Variaveis
      $scope.palestrantes = [];
      // Lista palestrantes salvos
      listar();
      function listar() {
        $scope.palestrantes = [];
        $database.getPalestrantes().then(function (palestrantes) {
          return palestrantes.val();
        }).then(function (palestrantes) {
          angular.forEach(palestrantes, function (value,key) {
              value.key = key;
              $scope.palestrantes.push(value);
          });
          $scope.$apply();
        });
      }


      $scope.visualizarPalestrante = function (palestrante) {
          $scope.palestrante = angular.copy(palestrante);
      }
      $scope.removerPalestrante = function (palestrante) {
        bootbox.confirm({
          message: "Remover " + palestrante.nome + " como palestrante?",
          buttons: {
            confirm: {
              label: 'Sim',
              className: 'btn-success'
            },
            cancel: {
              label: 'Não',
              className: 'btn-danger'
            }
          },
          callback: function (result) {
            if (result) {
                $database.savePalestrante({},palestrante.key);
                listar();
            }
          }
        });
      }

      // Salvar um palestrante
      $scope.salvar = function (palestrante) {
        if (palestrante == undefined) palestrante = {};
        var mensagem = (palestrante.key != undefined) ? "Deseja salvar "+palestrante.nome:"Deseja editar "+palestrante.nome
        bootbox.confirm({
          message: mensagem + " Como palestrante",
          buttons: {
            confirm: {
              label: 'Sim',
              className: 'btn-success'
            },
            cancel: {
              label: 'Não',
              className: 'btn-danger'
            }
          },
          callback: function (result) {
            if (result) {
                $database.savePalestrante(palestrante);
                listar();
            }
          }
        });

      }
  });
})();
