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

  .controller('BusinessListCtrl', function ($scope) {

    $scope.search = {
      category: 0,
      query: ''
    };

  });