'use strict';

businessDirectory.controllers

  .controller('BusinessItemCtrl', function ($scope) {

    // Inividual item map
    $scope.isMapEnabled = function () {
      return (
        _(["residential", "house", "service"]).contains($scope.business.geo_accuracy)
          || ($scope.business.yelp_lat && $scope.business.yelp_long)
        );
    };

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

    $scope.infoWindowReady = function () {
      var infoElm = angular.element('#' + $scope.getInfoWindowId());
      var infoElmBack = infoElm.parent().parent().prev().addClass('info_window_individual');
      infoElmBack.height(infoElm.height() + 'px');
      console.log(infoElm, infoElmBack);
    };

    $scope.showMap = function (business, event) {
      if (event) event.preventDefault();
      $scope.businessDataSpace(business, 'map').isMapHidden = false;
    };

    $scope.hideMap = function (business, event) {
      if (event) event.preventDefault();
      $scope.businessDataSpace(business, 'map').isMapHidden = true;
    };

  });