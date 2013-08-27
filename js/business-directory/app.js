'use strict';


// Declare app level module which depends on filters, and services
var businessDirectory = angular.module('businessDirectory', [
    , 'businessDirectory.constants'
    , 'businessDirectory.filters'
    , 'businessDirectory.services'
    , 'businessDirectory.directives'
    , 'businessDirectory.controllers'
    , 'ui.map'
  ]);

businessDirectory.controllers = angular.module('businessDirectory.controllers', []);