(function() {
  'use strict';
  var app = angular.module('BlueGestor',['ui.router','ui.select','isteven-multi-select','angular-table','ngCpfCnpj','ui.mask','ngSanitize','sc.select','angular.morris']);
  // Estabelece comnunicação com banco de dados e etc...
  app.run(function($database, $rootScope) {
    // $database.destroy();
    var config = {
      apiKey: "AIzaSyDmOaIOhzHfD36CIwqghdq3oGPVvIgVqVY",
      authDomain: "blueme-3acca.firebaseapp.com",
      databaseURL: "https://blueme-3acca.firebaseio.com",
      projectId: "blueme-3acca",
      storageBucket: "blueme-3acca.appspot.com",
      messagingSenderId: "113538853283"
    };
    firebase.initializeApp(config);
  });


  app.service("$database", ["$rootScope", "$q", function($rootScope, $q) {
    // Configuração do banco de dados.
    var database;
    var changeListener;
    var fireDB;

    function newKey() {
        var newPostKey = firebase.database().ref().child('Evento').push().key;
    }
    this.firebase = function () {
      return firebase.database();
    }
    this.getEvento = function (IDevento) {
      if (IDevento == undefined) {
        return firebase.database().ref('Evento').once('value');
      }else{
        return firebase.database().ref('Evento/' + IDevento).once('value');
      }

    }
    this.saveEvento = function (evento) {
      var novaKey = newKey();
      evento = angular.copy(evento);
      if(evento != undefined){
        if (evento.id != undefined) {
          var key = evento.key;
          delete evento.key;
          evento.id = key;
          firebase.database().ref('Evento').child(evento.id).set(evento);
        } else {
          evento.id = novaKey;
          firebase.database().ref('Evento').child(novaKey).set(evento);
        }
      }
      return evento;
    }


    this.savePalestrante = function (palestrante,key) {
      var salvar = angular.copy(palestrante);
      console.log("Mandou salvar");
      if (key != undefined) {
        delete palestrante.key;
        firebase.database().ref('palestrante').child(key).set(salvar);
      } else {

        firebase.database().ref('palestrante').child(newKey()).set(salvar);
      }
    }
    this.getPalestrantes = function () {
      return firebase.database().ref('palestrante').once('value');
    }
    this.getOficinas = function (IDevento) {
      return firebase.database().ref('Oficinas').child(IDevento).once('value');
    }
    this.saveOficina = function (Oficina,keyEvento) {
      var key = newKey();
      Oficina = angular.copy(Oficina);
      keyEvento = angular.copy(keyEvento);
      console.log("HORA "+Oficina);
      console.log("HORA "+keyEvento);
      if (Oficina != undefined) {
        if (Oficina.key != undefined) {
          Oficina.id = angular.copy(Oficina.key);
          delete Oficina.key;
          firebase.database().ref('Oficinas').child(keyEvento).child(Oficina.id).set(Oficina);
        }else{
          Oficina.id = angular.copy(key);
          firebase.database().ref('Oficinas').child(keyEvento).child(key).set(Oficina);
        }
      }


    }

    this.dadosDosUsuarios = function () {
      return firebase.database().ref('Usuarios').once('value');
    }
    this.dadoAdminstrador = function () {
      return firebase.database().ref('adminstrador').once('value');
    }

    function newKey() {
      return firebase.database().ref().child('Evento').push().key;
    }

  }]);
  // Configurações de URL
  app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "pages/login.html",
      controller: "verificacaoGestor",
    }).state('eventosEoficinas', {
      url: "/eventosEoficinas",
      templateUrl: "pages/listarEventosEOficinas.html",
      controller: "eventosEoficinas"
    }).state('palestrantes',{
      url: "/palestrantes",
      templateUrl: "pages/palestrantesUI.html",
      controller: "palestrantesCTRL"
    }).state('relatorios',{
      url: "/relatorios",
      templateUrl:"pages/relatorioUI.html",
      controller: "reportGestor"
    });
    $urlRouterProvider.otherwise("/login");
  });

})();
