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

    $scope.saveDevice = function() {
      DeviceCenter.register({id:100,name:"name"}).then(function() {
        $state.go("familydevices")
      }, function() {
        console.log("current error")
      })
    }
})
//我的树莓派
.controller('dashboardCtrl', function ($scope) {
})
//定制智能家居
.controller('dashboardSettingCtrl', function ($scope) {
})



