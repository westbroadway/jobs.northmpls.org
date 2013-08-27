'use strict';

businessDirectory.controllers

  .controller('MainMapCtrl', function ($scope, $rootScope, config) {
    $scope.map = null;
    $scope.markers = [];
    $scope.activeCategories = {};
    $scope.infoWindowForMainMap = {};

    $scope.getMapOptions = function () {
      return {
        center: new google.maps.LatLng(45, -93.30379),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    };

    $scope.mapLoaded = function () {};

    $scope.openMarkerInfo = function (marker) {
      $scope.infoWindowForMainMap[marker.businessIndex].open($scope.map, marker);
    };

    $scope.getInfoWindowId = function () {
      return 'info-window-global-' + $scope.business.index;
    };

    $scope.isMapEnabled = function (business) {
      return (
        _(["residential", "house", "service"]).contains(business.geo_accuracy)
        || (business.yelp_lat && business.yelp_long)
        );
    };

    $scope.filterChanged = function (index) {
      var thisCategory = $scope.categories[index];

      if ($scope.activeCategories[index]) {
        // checked
        _(_($scope.businesses)
          .filter(function (item) {
            return item.category === thisCategory
          }))
          .each(function (business) {
            var markerDataSpace = $scope.businessDataSpace(business, 'marker');
            if (markerDataSpace.marker) {
              markerDataSpace.marker.setVisible(true);
            }
          });
      } else {
        // not checked
        _(_($scope.businesses)
          .filter(function (item) {
            return item.category === thisCategory
          }))
          .each(function (business) {
            var markerDataSpace = $scope.businessDataSpace(business, 'marker');
            if (markerDataSpace.marker) {
              markerDataSpace.marker.setVisible(false);
            }
          });
      }
    };

    $scope.$on(config.EVENTS.BUSINESSES_OBTAINED, function () {
      //$scope.activeCategories = angular.copy($scope.categories);

      // builds list of events from businesses
      _($scope.businesses).each(function (business, businessIndex) {
        if ($scope.isMapEnabled(business)) {
          var lat = business.geo_latitude || business.yelp_lat,
            lon = business.geo_longitude || business.yelp_long;

          // adds new marker to map
          var businessMarkerSpace = $scope.businessDataSpace(business, 'marker');
          businessMarkerSpace.marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(lat, lon)
          });
          businessMarkerSpace.marker.businessIndex = businessIndex;
          $scope.markers.push(businessMarkerSpace.marker);
        }
      });

      // make all current filters checked
      _($scope.categories).each(function (category, index) {
        $scope.activeCategories[index] = true;
      });

    });
  });