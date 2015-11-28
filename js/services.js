'use strict';

myapp.factory('SwapiService', function($rootScope, $http, $stateParams) {

  var Swapi = {};

  Swapi.planets = {};
  Swapi.residents = {};

  Swapi.getPlanets = (page) => {
    if(!Swapi.planets[page]){
      console.log('api call planet:', page);
      $http.get(`http://swapi.co/api/planets/?page=${page}&format=json`)
      .then(res => {
        if(res.data.previous === null){
          $rootScope.firstPage = page;
        }
        if(res.data.next === null){
          $rootScope.lastPage = page;
        }
        Swapi.planets[page] = res.data.results.map(planet => {
          planet.residents = planet.residents.map(resident => {
            var resident = { url: resident };
            resident.id = resident.url.match(/\d+/)[0];
            return resident;
          });
          return planet;
        });
      })
      .catch(error => console.error(error.status));
    }
  }
  return Swapi;

});
