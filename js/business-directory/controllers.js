'use strict';

/* Controllers */

angular.module('businessDirectory.controllers', [])

  .controller('MainCtrl', function ($scope, config, Businesses) {
    Businesses.getAll();

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

  })

  .controller('BusinessListCtrl', function ($scope) {

    $scope.search = {
      category: 0,
      query: ''
    };

    // Inividual item map
    $scope.isMapDisplayed = function (business) {
      return (
        _(["residential", "house", "service"]).contains(business.geo_accuracy)
          || (business.yelp_lat && business.yelp_long)
        );
    };

    $scope.getMapOptions = function (business) {
      var lat = business.geo_latitude || business.yelp_lat,
        lon = business.geo_longitude || business.yelp_long;
      business.map_latLng = new google.maps.LatLng(lat, lon);
      return {
        center: business.map_latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    };

    $scope.mapLoaded = function (business) {
      // adds new marker to map
      new google.maps.Marker({
        map: business.map,
        position: business.map_latLng
      });
    };

  })

  .controller('MainMapCtrl', function ($scope, config) {
    $scope.map = null;
    $scope.markers = [];
    $scope.activeCategories = {};

    $scope.mapLoaded = function () {
      // adds new marker to map
    };

    $scope.getMapOptions = function () {
      //var lat = business.geo_latitude || business.yelp_lat, lon = business.geo_longitude || business.yelp_long;
      //business.map_latLng = new google.maps.LatLng(lat, lon);
      return {
        center: new google.maps.LatLng(39.675106, -99.939531),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
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
            if (business.marker) {
              business.marker.setVisible(true);
            }
          });
      } else {
        // not checked
        _(_($scope.businesses)
          .filter(function (item) {
            return item.category === thisCategory
          }))
          .each(function (business) {
            if (business.marker) {
              business.marker.setVisible(false);
            }
          });
      }
    };

    $scope.$on(config.EVENTS.BUSINESSES_OBTAINED, function () {
      //$scope.activeCategories = angular.copy($scope.categories);

      // builds list of events from businesses
      _($scope.businesses).each(function (business) {
        if (
          _(["residential", "house", "service"]).contains(business.geo_accuracy)
            || (business.yelp_lat && business.yelp_long)
          ) {
          var lat = business.geo_latitude || business.yelp_lat,
            lon = business.geo_longitude || business.yelp_long;

          // adds new marker to map
          business.marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(lat, lon)
          });
          $scope.markers.push(business.marker);
        }
      });

      // make all current filters checked
      _($scope.categories).each(function (category, index) {
        $scope.activeCategories[index] = true;
      });
    });
  })
  .controller('TestCalendar', function ($scope) {
    $scope.myMarkers = [];

    $scope.mapOptions = {
      center: new google.maps.LatLng(35.784, -78.670),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.addMarker = function ($event) {
      $scope.myMarkers.push(new google.maps.Marker({
        map: $scope.myMap,
        position: $event.latLng
      }));
    };

    $scope.setZoomMessage = function (zoom) {
      $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
      console.log(zoom, 'zoomed');
    };

    $scope.openMarkerInfo = function (marker) {
      $scope.currentMarker = marker;
      $scope.currentMarkerLat = marker.getPosition().lat();
      $scope.currentMarkerLng = marker.getPosition().lng();
      $scope.myInfoWindow.open($scope.myMap, marker);
    };

    $scope.setMarkerPosition = function (marker, lat, lng) {
      marker.setPosition(new google.maps.LatLng(lat, lng));
    };
  });