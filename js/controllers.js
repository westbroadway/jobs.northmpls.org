'use strict';

/* Controllers */

angular.module('jobsNorthmpls.controllers', [])

  .controller('MainCtrl', function ($scope, Jobs) {
    // obtain the list of jobs and init into $rootScope
    Jobs.getAllJobs();
  })

  .controller('JobListCtrl', function ($scope) {

  })

  .controller('JobDetailsCtrl', function ($scope, $routeParams, Jobs, mdConverter) {
    // The entry should be the based on the argument that is passed.
    Jobs.findJobByKey($routeParams.jobKey).then(function (entry) {
      $scope.entry = entry;
      $scope.entry.fulltext = mdConverter.makeHtml($scope.entry.fulltext);
    });
  });