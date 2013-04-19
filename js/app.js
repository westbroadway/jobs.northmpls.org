'use strict';


// Declare app level module which depends on filters, and services
angular.module('jobsNorthmpls', [
    , 'jobsNorthmpls.constants'
    , 'jobsNorthmpls.filters'
    , 'jobsNorthmpls.services'
    , 'jobsNorthmpls.directives'
    , 'jobsNorthmpls.controllers'
    , 'ngResource'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/jobs/#jobId', {templateUrl: 'partials/job-details.html', controller: 'JobDetailsCtrl'});
    $routeProvider.when('/jobs', {templateUrl: 'partials/job-list.html', controller: 'JobListCtrl'});
    $routeProvider.otherwise({redirectTo: '/jobs'});
  }]);
