'use strict';

/* Controllers */

angular.module('jobsNorthmpls.controllers', [])

  .controller('MainCtrl', function ($scope, Jobs) {
    // obtain the list of jobs and init into $rootScope
    Jobs.getAllJobEntries();
  })

  .controller('JobListCtrl', function ($scope) {

  })

  .controller('JobDetailsCtrl', function ($scope, $routeParams) {
    // Each controller should share a single object that is only requested once.
    // The entry should be the based on the argument that is passed.
    // The argument is entry.jobkey.
    // Search array of objects of jobkey that matches.
    $scope.entry = response.entries[0];

    // If the object has a fulltext field it should be sent through markdown converter.
    var mdConverter = new Showdown.converter();
    $scope.entry.fulltext = mdConverter.makeHtml($scope.entry.fulltext);
  });