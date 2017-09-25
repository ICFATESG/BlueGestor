(function() {
  'use strict';
  var app = angular.module('BlueGestor');
  app.controller('eventosEoficinas' ,function ($scope, $database ,$stateParams,$state,$filter, $rootScope){
    $scope.eventos = [];
    $scope.oficinasEventos = [];
    $scope.oficinaEditar = {};
    $scope.eventoEditar = {};
    $scope.evento = {};
    $scope.index = undefined;
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

    $scope.zerarFormulario = function () {
      $scope.oficinasEventos = [];
      $scope.evento = {};
    }


    $scope.salvarOficina = function (oficina) {
      bootbox.confirm({
        message: (oficina.key == undefined) ? "Adicionar a oficina":"Editar a oficina",
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
            if (oficina.horaInicio instanceof Date) oficina.horaInicio = moment(new Date(oficina.horaInicio)).format("hh:mm");
            if (oficina.horaFim instanceof Date )oficina.horaFim = moment(new Date(oficina.horaFim)).format("hh:mm");

            if ($scope.index != undefined) {
                $scope.oficinasEventos[$scope.index] = oficina;
                $scope.index = undefined;
                $scope.$apply();
            }else{
                $scope.oficinasEventos.push(oficina);
                $scope.$apply();
            }

          }
        }
      });

    }

    $scope.salvar = function () {

      bootbox.confirm({
        message: ($scope.evento.key == undefined) ? "Deseja salvar o evento?":"Deseja salvar a edição feita no evento?",
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
            if ($scope.evento.horaInicioEvento instanceof Date) $scope.evento.horaInicioEvento  = moment(new Date($scope.evento.horaInicioEvento)).format("hh:mm");
            if ($scope.evento.horaFimEvento instanceof Date ) $scope.evento.horaFimEvento = moment(new Date($scope.evento.horaFimEvento)).format("hh:mm");
              $scope.evento = $database.saveEvento($scope.evento);
              angular.forEach($scope.oficinasEventos, function (value,key) {
                  $database.saveOficina(value,$scope.evento.id);
              });
          }
        }
      });

    }

    $scope.listaOficinas = function (key) {
      $scope.oficinasEventos = [];
      $scope.evento = {};
      $database.getEvento(key).then(function (evento) {
        return evento.val();
      }).then(function (evento) {
        evento.key = key;
        $scope.evento = angular.copy(evento);
        $scope.$apply();
      });
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
    // Carrega ofina no formulário
    $scope.carregaOficina = function (oficina,index) {
        console.log(index);
        $scope.index = index;
        $scope.oficinaEditar = angular.copy(oficina);
    }

    // Paginação configuração
    $scope.config = {
      itemsPerPage: 10,
      maxPages:3,
      fillLastPage: false
    };
    $scope.configOficina = {
      itemsPerPage: 5,
      maxPages:3,
      fillLastPage: false
    };


  });
})();
