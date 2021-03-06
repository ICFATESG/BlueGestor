(function() {
  'use strict';
  var app = angular.module('BlueGestor');
  app.controller('reportGestor' ,function ($scope, $database ,$stateParams,$state, $rootScope){

    $scope.dataDounatu = {'labels':[],'data':[]};

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
    //Lista todos os palestrantes
    $scope.$watch('palestranteSelecionado',function(){
      $database.getPalestrantes().then(function(palestrantes){return palestrantes.val()}).then(
        function (palestrantes) {
          $scope.listaDePalestrantes = angular.copy(retornaArray(palestrantes));
        }
      )
    });
    //Pega dados dos usuários
    $database.getUsuarios().then(function (usuarios) {
      return usuarios.val();
    }).then(function (usuarios) {
      $scope.oficinasVisitas = [];
      // Para o usuario
      angular.forEach(retornaArray(usuarios),function (value) {
        // Para o evento
        angular.forEach(value.oficinaVisitadas,function (oficinas,key) {
          //Para a oficina
          angular.forEach(oficinas,function (oficina) {
            oficina.idEvento = key;
            oficina.nomePessoa = value.nome;
            oficina.enderecoMAC = value.bluetoothMAC;
            $scope.oficinasVisitas.push(oficina);
          });
        });
      });
    });
    // Retorna lista pessoas que estiveram na oficina X do Evento Y
    $scope.loadLista = function(){
      $scope.listaTable = [];
      angular.forEach($scope.oficinasVisitas, function(value,key){
        console.log($scope.oficinaSelecionada)
          if(value.idoficina == $scope.oficinaSelecionada){
            $scope.listaTable.push(value);
          }
      });
      
    }
    
    // Gera o relatório
    $scope.$watchGroup(['palestranteSelecionado','eventoSelecionado','oficinaSelecionada'],function () {
      // var report = {'evento':$scope.eventoSelecionado,'Oficina':$scope.oficinaSelecionada,'palestrante':$scope.palestranteSelecionado};
      // $scope.chartData = _.groupBy($scope.oficinasVisitas, function(value){
      //       return value.idEvento + '#' + value.idoficina;
      // });
      $scope.loadLista();

    });

    



    //Retorno de array
    var arr = [];
    function retornaArray(array) {
      arr = [];
      angular.forEach(array,function (val,key) {
        val.key = key;
        arr.push(val);
      });
      return arr;
    };



  });
})();
