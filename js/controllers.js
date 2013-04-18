'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('MyCtrl1', function($scope, $http) {
    $http.get('http://northmpls.webscript.io/jobs').success(function (response) {
      $scope.entry = response.entries[0];
      var mdConverter = new Showdown.converter();
      $scope.entry.Field7 = mdConverter.makeHtml($scope.entry.Field7);
    })
  })

  .controller('JobList', function($scope, $http) {
    $http.get('http://northmpls.webscript.io/jobs').success(function (response) {
      $scope.entries = response;
    })
  });