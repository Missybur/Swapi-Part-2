'use strict';

var myapp = angular.module('myapp')

// app.controller('PlanetCtrl', function($scope, $http) {

//       $http.get('http://swapi.co/api/planets/?page=${page}&format=json')
//       .then(res => {
//         if(res.data.previous === null){
//           $rootScope.firstPage = page;
//         }
//         if(res.data.next === null){
//           $rootScope.lastPage = page;
//         }
//         Swapi.planets[page] = res.data.results.map(planet => {
//           planet.residents = planet.residents.map(resident => {
//             var resident = { url: resident };
//             resident.id = resident.url.match(/\d+/)[0];
//             return resident;
//           });
//           return planet;
//         });
//       })
//       .catch(error => console.error(error.status)});
// })

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
