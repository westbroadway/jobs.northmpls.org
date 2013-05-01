'use strict';

businessDirectory.controllers

  .controller('MainCtrl', function ($scope, config, Businesses) {
    Businesses.getAll();

    $scope.search = {
      category: 0,
      query: ''
    };

    // storage for custom businesses data
    $scope.businessesData = {
      map: {}, // maps settings
      marker: {} // markers on the main map
    };

    $scope.businessDataSpace = function (business, namespace) {
      if (!$scope.businessesData[namespace][business.index]) {
        $scope.businessesData[namespace][business.index] = {};
      }
      return $scope.businessesData[namespace][business.index];
    };

    $scope.$on(config.EVENTS.BUSINESSES_OBTAINED, function () {
      // load the first one category on page load
      $scope.search.category = $scope.categories[0];
    });

    var regexpUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    $scope.isLink = function (string) {
      return regexpUrl.test(string);
    };

    $scope.buildAddress = function (business) {
      var arr = [];

      if (business.address) arr.push(business.address);
      if (business.address_2) arr.push(business.address_2);
      if (business.city) arr.push(business.city);
      if (business.state) arr.push(business.state);
      if (business.zip) arr.push(business.zip);

      return arr.join(', ');
    };

  });
