angular.module("starter")
.controller("BindDeviceController", function($scope, $state) {
  $scope.saveDevice = function() {
    $state.go("devices")
  }
})
