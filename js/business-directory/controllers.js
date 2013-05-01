'use strict';

/* Controllers */

angular.module('businessDirectory.controllers', [])

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

  })

  .controller('BusinessListCtrl', function ($scope) {

    // Inividual item map
    $scope.isMapEnabled = function (business) {
      return (
        _(["residential", "house", "service"]).contains(business.geo_accuracy)
          || (business.yelp_lat && business.yelp_long)
        );
    };

    $scope.getMapOptions = function (business) {
      var lat = business.geo_latitude || business.yelp_lat,
        lon = business.geo_longitude || business.yelp_long;

      var mapStorage = $scope.businessDataSpace(business, 'map');
      mapStorage.map_latLng = new google.maps.LatLng(lat, lon);

      // hide map initially
      mapStorage.isMapHidden = true;

      return {
        center: mapStorage.map_latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    };

    $scope.mapLoaded = function (business) {
      var mapStorage = $scope.businessDataSpace(business, 'map');
      // adds new marker to map
      mapStorage.marker = new google.maps.Marker({
        map: mapStorage.map,
        position: mapStorage.map_latLng
      });
    };

    $scope.showMap = function (business, event) {
      if (event) event.preventDefault();
      $scope.businessDataSpace(business, 'map').isMapHidden = false;
    };

    $scope.hideMap = function (business, event) {
      if (event) event.preventDefault();
      $scope.businessDataSpace(business, 'map').isMapHidden = true;
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
        center: new google.maps.LatLng(45, -93.30379),
        zoom: 14,
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
      _($scope.businesses).each(function (business) {
        if (
          _(["residential", "house", "service"]).contains(business.geo_accuracy)
            || (business.yelp_lat && business.yelp_long)
          ) {
          var lat = business.geo_latitude || business.yelp_lat,
            lon = business.geo_longitude || business.yelp_long;

          // adds new marker to map
          var businessMarkerSpace = $scope.businessDataSpace(business, 'marker');
          businessMarkerSpace.marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(lat, lon)
          });
          $scope.markers.push(businessMarkerSpace.marker);
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