'use strict';


// Declare app level module which depends on filters, and services
angular.module('businessDirectory', [
    , 'businessDirectory.constants'
    , 'businessDirectory.filters'
    , 'businessDirectory.services'
    , 'businessDirectory.directives'
    , 'businessDirectory.controllers'
  ])/*.
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/jobs/:jobKey', {templateUrl: 'partials/job-details.html', controller: 'JobDetailsCtrl'});
    $routeProvider.when('/jobs', {templateUrl: 'partials/job-list.html', controller: 'JobListCtrl'});
    $routeProvider.otherwise({redirectTo: '/jobs'});
  }])*/;
