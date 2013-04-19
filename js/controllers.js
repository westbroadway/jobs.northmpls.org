'use strict';

/* Controllers */

angular.module('jobsNorthmpls.controllers', [])

  .controller('JobListCtrl', function ($scope, Jobs) {
    // obtain the list of jobs
    $scope.entries = Jobs.allEntries.query();
  })

  .controller('JobDetailsCtrl', function ($scope, Jobs) {
    // Each controller should share a single object that is only requested once.
    Jobs.allEntries.success(function (response) {
      // The entry should be the based on the argument that is passed.
      // The argument is entry.jobkey.
      // Search array of objects of jobkey thath matches.
      $scope.entry = response.entries[0];

      // If the object has a fulltext field it should be sent through markdown converter.
      var mdConverter = new Showdown.converter();
      $scope.entry.fulltext = mdConverter.makeHtml($scope.entry.fulltext);
    })
  });