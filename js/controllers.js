'use strict';

/* Controllers */

angular.module('jobsNorthmpls.controllers', [])

  .controller('MainCtrl', function ($scope, Jobs) {
    // obtain the list of jobs and init into $rootScope
    Jobs.getAllJobs();
  })

  .controller('JobListCtrl', function ($scope) {
    $scope.order = function (item) {
      return item.created;
    };
    $scope.class = function (item) {
      if ('submitted' == item.type) {
        return 'success'
      }
      else {
        return '';
      }
    };
  })

  .controller('JobDetailsCtrl', function ($scope, $routeParams, Jobs, mdConverter) {

    // animate to top
    $('html, body').animate({ scrollTop: 0 }, 300);

    // The entry should be the based on the argument that is passed.
    Jobs.findJobByKey($routeParams.jobKey).then(function (entry) {
      $scope.entry = entry;
    });
  });