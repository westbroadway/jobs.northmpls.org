'use strict';


// Declare app level module which depends on filters, and services
angular.module('jobsNorthmpls', ['jobsNorthmpls.filters', 'jobsNorthmpls.services', 'jobsNorthmpls.directives', 'jobsNorthmpls.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/jobs', {templateUrl: 'partials/partial2.html', controller: 'JobList'});
    $routeProvider.otherwise({redirectTo: '/jobs'});
  }]);
