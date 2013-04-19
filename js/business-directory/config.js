'use strict';

/* Filters */

angular.module('businessDirectory.constants', [])
  .constant('config', {
    EVENTS: {
      BUSINESSES_OBTAINED: 'Businesses.getAll.Success'
    },
    BUSINESSES_SOURCE: '/business-directory/businesses.json'
    //BUSINESSES_SOURCE: 'https://raw.github.com/westbroadway/northmpls_content/master/business.json'
  });