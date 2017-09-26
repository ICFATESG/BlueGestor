(function() {
  'use strict';
  var app = angular.module('BlueGestor');
  app.controller('reportGestor' ,function ($scope, $database ,$stateParams,$state, $rootScope){
    $scope.listaDeEventos = [{}];
    $database.getEvento().then(function(eventos){
      return eventos.val();
    }).then(function (eventos) {
      $scope.listaDeEventos = angular.copy(retornaArray(eventos));
      
    });
    //Lista todos as Oficinas De acordo com o evento
    $scope.$watch('eventoSelecionado',function () {
      $scope.listaDeOficinas =[];
      if($scope.eventoSelecionado != undefined)
      $database.getOficinas($scope.eventoSelecionado).then(function (Oficinas) {
        return Oficinas.val();
      }).then(function (todasOficinasDoEvento) {
        $scope.listaDeOficinas = angular.copy(retornaArray(todasOficinasDoEvento));
      });
    });
    //Lista todos os usuário
    $scope.$watch('palestranteSelecionado',function(){
      console.log("CLARE");
      $database.getPalestrantes().then(function(palestrantes){return palestrantes.val()}).then(
        function (palestrantes) {
          $scope.listaDePalestrantes = angular.copy(retornaArray(palestrantes));
        }
      )
    });
    //Lista todos os palestrantes

    //Retorno de array
    var arr = [];
    function retornaArray(array) {
      arr = [];
      angular.forEach(array,function (val,key) {
          val.key = key;
          arr.push(val);
      });
      return arr;
    }

  });
})();
