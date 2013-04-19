'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('jobsNorthmpls.services', ['ngResource'])
  .factory('Jobs', function ($rootScope, $resource, config) {
    return {
      getAllJobEntries: function () {
        if (!$rootScope.jobs) {
          return $resource(config.JOB_ENTRIES_SOURCE).query(function (response) {
            $rootScope.jobs = response;
          });
        } else {
          return $rootScope.jobs;
        }
      }
    };
  });
