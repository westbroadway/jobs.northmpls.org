'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('businessDirectory.services', [])

  .factory('Businesses', function ($rootScope, $http, config) {
    return {
      getAll: function () {
        if (!$rootScope.businesses) {
          return $http.get(config.BUSINESSES_SOURCE).success(function (response) {
            $rootScope.businesses = response;
            $rootScope.$broadcast(config.EVENTS.BUSINESSES_OBTAINED);
          });
        } else {
          return $rootScope.businesses;
        }
      }
    };
  });
