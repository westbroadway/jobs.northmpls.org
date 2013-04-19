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
    });

    // listen for entry change and init necessary properties
    $scope.$watch('entry', function (newValue, oldValue) {
      if (!newValue || newValue === oldValue) return;

      // If the object has a fulltext field it should be sent through markdown converter.
      if ($scope.entry.fulltext) {
        $scope.entry.fulltext = mdConverter.makeHtml($scope.entry.fulltext);
      }
    });
  });