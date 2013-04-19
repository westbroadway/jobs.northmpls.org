'use strict';

/* Controllers */

angular.module('businessDirectory.controllers', [])

  .controller('MainCtrl', function ($scope, config, Businesses) {
    Businesses.getAll();
  })

  .controller('BusinessListCtrl', function ($scope) {

    $scope.search = {
      category: 0,
      query: ''
    };

  });