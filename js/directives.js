'use strict';

/* Directives */


angular.module('jobsNorthmpls.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
