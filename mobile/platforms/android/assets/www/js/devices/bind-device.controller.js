angular.module("devices", ['ionic'])
.controller("BindDeviceController", function($scope, $state) {
  $scope.saveDevice = function() {
    $state.go("dashboard")
  }
})
