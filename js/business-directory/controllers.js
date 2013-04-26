'use strict';

/* Controllers */

angular.module('businessDirectory.controllers', [])

  .controller('MainCtrl', function ($scope, config, Businesses) {
    Businesses.getAll();

    var regexpUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    $scope.isLink = function (string) {
      return regexpUrl.test(string);
    };
  })

  .controller('BusinessListCtrl', function ($scope) {

    $scope.search = {
      category: 0,
      query: ''
    };

  });