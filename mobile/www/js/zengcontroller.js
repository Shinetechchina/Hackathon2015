//曾智
angular.module('starter.zengcontrollers', ["ionic", "services"])
 //绑定家居设备
.controller('familyDevicesCtrl', function ($scope, DeviceCenter, $state,$ionicHistory) {
  
  $scope.$watch("", function() {
    DeviceCenter.getFamilyDevices().then(function(response) {
      $scope.items = response.data.devices;
    })
  })

  $scope.showPreDefinedDevices = false;

  $scope.selectedItem = null;

  $scope.preDefinedDevices =DeviceCenter.familyDeviceTypes;

  $scope.addDevice = function(item) {
    $scope.showPreDefinedDevices = !$scope.showPreDefinedDevices;
    $scope.selectedItem = item;
  }

  $scope.chooseName = function(item) {
    $scope.selectedItem = null;
  };

  $scope.submit = function (){

    DeviceCenter.setFamilyDevices({devices: $scope.items}).then(function(){
      $state.go('app.familydevicesshow')
      $ionicHistory.clearHistory();
    })
  }
})

//已绑定首页
.controller('familyDevicesShowCtrl', function ($scope, DeviceCenter,$ionicHistory,$state) {
  $scope.$watch("", function() {
    DeviceCenter.getFamilyDevices().then(function(response) {
      $scope.items = response.data.devices;
    })
  })
 
  $scope.toggle = function(item) {
    if (Number(item.status) === 0) {
      item.status = 1
    } else {
      item.status = 0
    }
    DeviceCenter.setDevice(item)
  };
   $scope.goBind=function(){
      $state.go("app.bind");
    };
})
