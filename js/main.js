'use strict';

var myapp = angular.module('myapp', ["ui.router"])

myapp.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/planets/1")

  $stateProvider
  .state('planets', {
    url: "/planets/:page",
    templateUrl: "../partials/planets.html",
    controller: "PlanetCtrl"
  })
  .state('resident', {
    url: "/resident/:id",
    templateUrl: "../partials/resident.html",
    controller: "ResidentCtrl"
  })
})