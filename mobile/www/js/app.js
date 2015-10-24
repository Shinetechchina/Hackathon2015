// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'dashboard', 'devices', 'dashboard-setting', 'starter-family-devices', 'services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('devices', {
    url: '/devices',
    templateUrl: "templates/devices.html"
  })
  .state('bind', {
    url: '/device/bind',
    templateUrl: "templates/bind.html",
    controller: "BindDeviceController"
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: "templates/dashboard.html",
    controller: "DashboardController"
  })
  .state('dashboard-setting', {
    url: '/dashboard-setting',
    templateUrl: "templates/dashboard-setting.html",
    controller: "DashboardSettingController"
  })
  $urlRouterProvider.otherwise('/devices');
})
