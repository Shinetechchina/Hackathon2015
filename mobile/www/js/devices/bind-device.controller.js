angular.module("devices", ['ionic', 'services'])
.controller("BindDeviceController", function($scope, $state, DeviceCenter) {
  $scope.saveDevice = function() {
    DeviceCenter.getFamilyDevices();
    // DeviceCenter.register({id: "1", name: "sdafdsf"}).then(
    //   function(){
    //     $state.go("familydevices")
    //   },
    //   function() {
    //     DeviceCenter.getFamilyDevices();
    //     console.log(DeviceCenter.token)
    //   }
    // )
  }
})
