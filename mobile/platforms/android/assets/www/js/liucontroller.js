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
      }, function(error) {
        console.log(error)
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
.controller('dashboardSettingCtrl', function ($scope, $ionicModal) {
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



