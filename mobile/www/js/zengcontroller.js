﻿//曾智
angular.module('starter.zengcontrollers', ["ionic", "services"])
 //绑定家居设备
.controller('familyDevicesCtrl', function ($scope, DeviceCenter) {
  
  $scope.$watch("", function() {
    DeviceCenter.getFamilyDevices().then(function(response) {
      $scope.items = response.data;
    })
  })

  $scope.showPreDefinedDevices = false;

  $scope.selectedItem = null;

  $scope.preDefinedDevices = [
    '空调',
    '电脑',
    ""
  ]

  $scope.addDevice = function(item) {
    $scope.showPreDefinedDevices = !$scope.showPreDefinedDevices;
    $scope.selectedItem = item;
  }

  $scope.submit = function (){

    DeviceCenter.setFamilyDevices($scope.items.devices).then(function(){
      $state.go('devices-show')
    })
  }
})

//已绑定首页
.controller('familyDevicesShowCtrl', function ($scope, DeviceCenter) {
  $scope.$watch("", function() {
    DeviceCenter.getFamilyDevices().then(function(response) {
      $scope.items = response.data;
    })
  })
})
