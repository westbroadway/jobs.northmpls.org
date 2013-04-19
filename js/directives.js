'use strict';

/* Directives */


angular.module('jobsNorthmpls.directives', [])
  .directive('resourceLoadingNotification', function factory ($http) {
    'use strict';

    return {
      template: '<div class="loading label" ng-hide="isLoadingAlertHidden()">Loading...</div>',
      replace: true,
      restrict: 'A',
      link: function postLink (scope, iElement, iAttrs) {
        scope.isLoadingAlertHidden = function () {
          return $http.pendingRequests.length === 0;
        };
      }
    };
  });
