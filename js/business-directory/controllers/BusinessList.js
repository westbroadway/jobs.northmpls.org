'use strict';

businessDirectory.controllers

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

  });