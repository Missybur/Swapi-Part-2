'use strict';

myapp.controller("ResidentCtrl", function($scope, $http, $stateParams, SwapiService) { //when I bring in SwapiService in this function, I get the error message
  console.log('ResidentCtrl loaded');
  if(SwapiService.residents[$stateParams.id]) {
    console.log('cache loading');
    $scope.character = SwapiService.residents[$stateParams.id];
  } else {
    $http.get("http://swapi.co/api/people/" + $stateParams.id + "/?format=json").then(resp => {
      console.log('api call:', resp.data.name);
      SwapiService.residents[$stateParams.id] = resp.data;
      $scope.character = resp.data;
    });
  }
});

