'use strict';

/* Filters */

angular.module('jobsNorthmpls.constants', [])
  .constant('config', {
    EVENTS: {
      JOBS_OBTAINED: 'Jobs.getAllJobs.Success'
    },

    JOB_ENTRIES_SOURCE: 'http://northmpls.webscript.io/jobs'
  });
