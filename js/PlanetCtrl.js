'use strict';

var myapp = angular.module('myapp')

myapp.controller("PlanetCtrl", function($rootScope, $scope, $state, $stateParams, SwapiService) {

  $rootScope.page = parseInt($stateParams.page);
  $scope.previousDisabled = $scope.page === 1;

  SwapiService.getPlanets($scope.page);

  $scope.residents = SwapiService.residents;

  $scope.$watchCollection(function(){
    return SwapiService.planets;
  }, function(planets){
    console.log('planets:', planets);
    $scope.planets = planets[$scope.page];
  });

  $scope.previousPage = () => {
    console.log('previous page');
    $state.go('planets', {page: $scope.page - 1})
  };

  $scope.nextPage = () => {
    console.log('next page');
    $state.go('planets', {page: $scope.page + 1})
  };

});
