(function() {
  'use strict';
  var app = angular.module('BlueGestor');
  app.controller('palestrantesCTRL' ,function ($scope, $database ,$stateParams,$state,$filter, $rootScope){
      // Variaveis
      $scope.palestrantes = [];
      // Lista palestrantes salvos
      $database.getPalestrantes().then(function (palestrantes) {
        return palestrantes.val();
      }).then(function (palestrantes) {
        angular.forEach(palestrantes, function (value,key) {
            value.key = key;
            $scope.palestrantes.push(value);
        });
        $scope.$apply();
      });

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
            }
          }
        });

      }
  });
})();
