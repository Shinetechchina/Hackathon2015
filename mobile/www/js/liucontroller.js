//刘民晗
angular.module('starter.liucontrollers', ["ionic", "services"])
 //左侧菜单
.controller('appCtrl', function ($scope, $state) {
})
 //未绑定设备的首页
.controller('devicesCtrl', function ($scope, $state) {
})
//绑定树莓派
.controller('bindCtrl', function ($scope, $state, DeviceCenter) {
    $scope.device = {
      id: "",
      name: ""
    }

    $scope.saveDevice = function() {
      console.log($scope.device)
      DeviceCenter.register($scope.device).then(function() {
        $state.go("app.familydevices")
      })
    }
})
//我的树莓派
.controller('dashboardCtrl', function ($scope, DeviceCenter) {
    DeviceCenter.getFamilyDevices().then(function(response) {
      $scope.device = response.data.name
    })
})
//定制智能家居
.controller('dashboardSettingCtrl', function ($scope, $ionicModal, DeviceCenter) {
    $scope.$watch("", function() {
      DeviceCenter.getFamilyDevices().then(function(response) {
        $scope.configs = response.data.configs;
        $scope.devices = response.data.devices;
      })
    }
    );
    $ionicModal.fromTemplateUrl("templates/dashboardSettingModal.html", {
      scope: $scope,
      animation: "slide-in-up"
    }).then(function(modal) {
      $scope.modal = modal
    })

    $scope.popSetting = function() {
      $scope.modal.show()
    }

    $scope.closeSetting = function() {
      $scope.modal.close()
    }
})

.controller('configNewCtrl', function($scope, DeviceCenter, $ionicModal, $state){
    $scope.$watch("", function() {
      DeviceCenter.getFamilyDevices().then(function(response) {
        $scope.configs = response.data.configs;
        $scope.devices = response.data.devices;

        $scope.configLength = $scope.configs? $scope.configs.length: 0;

        $scope.deviceSettings = [];
        angular.forEach($scope.devices, function(device){
          $scope.deviceSettings.push({id: device.id, model: 0, startTime: '', endTime: '', name: device.name});
        })

        $scope.config = {
          "id": $scope.configLength,
          "deviceSettings": $scope.deviceSettings
        };
      })
    }
    );
    $scope.currentDevice = null;
    $ionicModal.fromTemplateUrl("templates/dashboardSettingModal.html", {
      scope: $scope,
      animation: "slide-in-up"
    }).then(function(modal) {
      $scope.modal = modal
    })

    $scope.popSetting = function(device) {
      $scope.modal.show()
      $scope.currentDevice = device;
    }

    $scope.closeSetting = function() {
      $scope.modal.hide()
      $scope.currentDevice = null;
    }

    $scope.submit = function() {
      DeviceCenter.updateConfig({config: $scope.config}).then(function(){
        $state.go('app.dashboardsetting')
      })
      $scope.currentDevice = null
    }
})



