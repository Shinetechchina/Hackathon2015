//曾智
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

    DeviceCenter.

    $state.go('devices-show')
    // submite items json
    
  }
})

//已绑定首页
.controller('familyDevicesShowCtrl', function ($scope) {
    alert("aaa");
})
