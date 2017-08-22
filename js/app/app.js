(function() {
  'use strict';
  var app = angular.module('BlueGestor',['ui.router','md.data.table','isteven-multi-select']);
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

  // Comunicação geral com Banco de dados pouchdb
  app.service("$database", ["$rootScope", "$q", function($rootScope, $q) {
    // Configuração do banco de dados.
    var database;
    var changeListener;
    var fireDB;
    this.firebase = function () {
      return firebase.database();
    }
    this.getEvento = function (IDevento) {
      if (IDevento == undefined) {
        return firebase.database().ref('Evento').once('value');
      }else{
        return firebase.database().ref('Evento' + IDevento).once('value');
      }

    }
    this.saveEvento = function (evento,key) {
      if (key != undefined) {
        firebase.database().ref('Evento').child(key).set(evento);
      } else {
        firebase.database().ref('Evento').set(evento);
      }

    }
    this.getOficinas = function (IDoficina) {
      if (IDevento == undefined) {
        return firebase.database().ref('Oficinas').once('value');
      }else{
        return firebase.database().ref('Oficinas' + IDoficina).once('value');
      }
    }
    this.saveOficina = function (Oficina,key) {
      if (key != undefined) {
        firebase.database().ref('Evento').child(key).set(evento);
      } else {
        firebase.database().ref('Evento').child(newKey()).set(evento);
      }

    }

    this.dadosDosUsuarios = function () {
      return firebase.database().ref('Usuarios').once('value');
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
      controller: "verificacaoGestor"
    });
    $urlRouterProvider.otherwise("/login");
  });

})();
