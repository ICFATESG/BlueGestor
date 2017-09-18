(function() {
  'use strict';
  var app = angular.module('BlueGestor');
  app.controller('verificacaoGestor' ,function ($scope, $database ,$stateParams,$state, $rootScope){
    $scope.usuario = {"usuario":"","senha":""};
    // Verifica se já existe um usário logado
    if (localStorage.getItem("AdminLogado") != undefined) {
      $scope.libearmenu = true;
    }

    $scope.loginButton = function() {
      $database.dadoAdminstrador().then(function (obj) {
        return obj.val();
      }).then(function (adminstrador) {
        if(adminstrador.usuario == $scope.usuario.usuario && adminstrador.senha == $scope.usuario.senha){
          bootbox.alert("Bem vindo ao Blue Gestor");
          delete adminstrador.senha;
          localStorage.setItem("AdminLogado", JSON.stringify(adminstrador));
          $scope.libearmenu = true;
        }else {
          bootbox.alert("Usúario ou senha incorretos");
        }
      });
    }

    $scope.sair = function () {
      bootbox.confirm({
        message: "Você realmente deseja sair?",
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
          console.log(result);
          if (result) {
              localStorage.removeItem("AdminLogado");
              $scope.libearmenu = false;
          }
        }
      });
    }


  });
})();
