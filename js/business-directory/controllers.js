'use strict';

/* Controllers */

angular.module('businessDirectory.controllers', [])

  .controller('MainCtrl', function ($scope, config, Businesses) {
    Businesses.getAll();

    var regexpUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    $scope.isLink = function (string) {
      return regexpUrl.test(string);
    };

    $scope.buildAddress = function (item) {
      var arr = [];

      if (item.address) arr.push(item.address);
      if (item.address_2) arr.push(item.address_2);
      if (item.city) arr.push(item.city);
      if (item.state) arr.push(item.state);
      if (item.zip) arr.push(item.zip);

      return arr.join(', ');
    };
  })

  .controller('BusinessListCtrl', function ($scope) {

    $scope.search = {
      category: 0,
      query: ''
    };

  });