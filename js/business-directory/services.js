'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('businessDirectory.services', [])

  .factory('Businesses', function ($rootScope, $http, config) {
    return {
      getAll: function () {
        if (!$rootScope.businesses) {
          $rootScope.categories = [];

          return $http.get(config.BUSINESSES_SOURCE, {headers: {"Accept": "application/vnd.github.raw"}})
            .success(function (response) {
              var lettersRegExp = /\W/g;
              // normalize header to contain only letters
              var headers = _(response.shift()).map(function (value) { return value.toLowerCase().replace(lettersRegExp, ''); });

              // create hashes from businesses arrays
              $rootScope.businesses = _(response).map(function (item, index) {
                var mappedItem = {};
                // convert array to hash
                _(item).each(function (value, key) {
                  mappedItem[headers[key]] = value;
                });

                // save category
                if (!_($rootScope.categories).contains(mappedItem.category))
                  $rootScope.categories.push(mappedItem.category);

                // set index
                mappedItem.index = index;

                return mappedItem;
              });

              // fire ready event
              $rootScope.$broadcast(config.EVENTS.BUSINESSES_OBTAINED);
            });
        } else {
          return $rootScope.businesses;
        }
      }
    };
  });
