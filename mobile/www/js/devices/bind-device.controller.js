angular.module("devices", ['ionic', 'services'])
.controller("BindDeviceController", function($scope, $state, DeviceCenter) {
    var device = {
      id: $scope.deviceId,
      name: $scope.deviceName
    }

    $scope.saveDevice = function() {
      DeviceCenter.register(device).then(function() {
        $state.go("familydevices")
      }, function() {
         console.log("current error")
      })
  }
})
