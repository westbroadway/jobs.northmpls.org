'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('jobsNorthmpls.services', ['ngResource'])

  .factory('Jobs', function ($rootScope, $resource, config) {
    return {
      getAllJobs: function () {
        if (!$rootScope.jobs) {
          return $resource(config.JOB_ENTRIES_SOURCE).query(function (response) {
            $rootScope.jobs = response;
            $rootScope.$broadcast('Jobs.getAllJobs.Success');
          });
        } else {
          return $rootScope.jobs;
        }
      },
      findJobByKey: function (jobkey) {
        return _($rootScope.jobs).find(function (item) { return item.jobkey === jobkey; });
      }
    };
  })

  .factory('mdConverter', function () {
    return new Showdown.converter();
  });
