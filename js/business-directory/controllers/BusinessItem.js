'use strict';

businessDirectory.controllers

  .controller('BusinessItemCtrl', function ($scope) {

    // Inividual item map
    $scope.getMapOptions = function () {
      var lat = $scope.business.geo_latitude || $scope.business.yelp_lat,
        lon = $scope.business.geo_longitude || $scope.business.yelp_long;

      var mapStorage = $scope.businessDataSpace($scope.business, 'map');
      mapStorage.map_latLng = new google.maps.LatLng(lat, lon);

      // hide map initially
      mapStorage.isMapHidden = true;

      return {
        center: mapStorage.map_latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    };

    // weird but works only with duplication
    $scope.isMapEnabled = function (business) {
      return (
        _(["residential", "house", "service"]).contains(business.geo_accuracy)
        || (business.yelp_lat && business.yelp_long)
        );
    };

    $scope.mapLoaded = function () {
      var mapStorage = $scope.businessDataSpace($scope.business, 'map');
      // adds new marker to map
      mapStorage.marker = new google.maps.Marker({
        map: mapStorage.map,
        position: mapStorage.map_latLng
      });
    };

    $scope.openMarkerInfo = function () {
      var mapStorage = $scope.businessDataSpace($scope.business, 'map');
      var marker = mapStorage.marker;
      $scope.currentMarker = marker;
      $scope.myInfoWindow.open(mapStorage.map, marker);
    };

    $scope.getInfoWindowId = function () {
      return 'info-window-individual-' + $scope.business.index;
    };

    $scope.infoWindowReady = function () {};

    $scope.showMap = function (business, event) {
      if (event) event.preventDefault();
      $scope.businessDataSpace(business, 'map').isMapHidden = false;
    };

    $scope.hideMap = function (business, event) {
      if (event) event.preventDefault();
      $scope.businessDataSpace(business, 'map').isMapHidden = true;
    };

  });