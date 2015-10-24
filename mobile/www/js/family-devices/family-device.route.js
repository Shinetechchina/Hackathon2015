angular.module('starter-family-devices')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('familydevices', {
    url: '/family/devices',
    templateUrl: "templates/family-devices.html",
    controller: "FamilyDeviceCtl"
  })
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('devices-show', {
    url: '/family/devices/show',
    templateUrl: "templates/family-devices-show.html",
    controller: "FamilyDeviceShowCtl"
  })
})
