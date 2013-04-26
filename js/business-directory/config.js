'use strict';

/* Filters */

angular.module('businessDirectory.constants', [])
  .constant('config', {
    EVENTS: {
      BUSINESSES_OBTAINED: 'Businesses.getAll.Success'
    },
    BUSINESSES_SOURCE: '/business-directory/businesses2.json'
//    BUSINESSES_SOURCE: 'https://api.github.com/repos/westbroadway/northmpls_content/contents/business.json'
  });