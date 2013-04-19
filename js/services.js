'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('jobsNorthmpls.services', ['ngResource'])

  .factory('Jobs', function ($rootScope, $resource, $q, config) {
    return {
      getAllJobs: function () {
        if (!$rootScope.jobs) {
          return $resource(config.JOB_ENTRIES_SOURCE).query(function (response) {
            $rootScope.jobs = response;
            $rootScope.$broadcast(config.EVENTS.JOBS_OBTAINED);
          });
        } else {
          return $rootScope.jobs;
        }
      },
      findJobByKey: function (jobkey) {
        var find = function () {
          return _($rootScope.jobs).find(function (item) { return item.jobkey === jobkey; });
        };

        var deferred = $q.defer();

        if ($rootScope.jobs) {// jobs are already loaded
          deferred.resolve(find());
        } else {// jobs are loading

          $rootScope.$on(config.EVENTS.JOBS_OBTAINED, function (newValue) {
            if (!newValue) return;
            deferred.resolve(find());
          });
        }

        return deferred.promise;
      }
    };
  })

  .factory('mdConverter', function () {
    return new Showdown.converter();
  });
