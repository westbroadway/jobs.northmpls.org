'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('jobsNorthmpls.services', ['ngResource'])
  .factory('Jobs', function ($resource, config) {
    return {
      allEntries: $resource(config.JOB_ENTRIES_SOURCE)
    };
  });
