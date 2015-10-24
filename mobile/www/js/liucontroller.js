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

        $scope.getDescription=function(device){
          //alert(device.model);
          switch(+device.model){
            case 0:
              return "手动";
            case 1:
               // console.log(device);
               if(device.startTime==null||device.startTime==undefined||device.startTime=="") return "自动";
               if(device.endTime==null||device.endTime==undefined||device.endTime=="") return "自动";
               var starth= device.startTime.getHours();
               var endh= device.endTime.getHours();
               var startm= device.startTime.getMinutes();
               var endm= device.endTime.getMinutes();
               // var nowh=new Date().getHours();
               // var nowm=new Date().getMinutes();
               return starth+":"+startm+"开启"+" "+endh+":"+endm+"关闭";
               //以下的算法是如果只需要换按现在的时间计算紧接着的预告
               // if(starth<endh){ //10:00开启   18：00 关闭
               //    if(nowh>=starth&&nowh<endh){
               //        return endh+":"+endm+"关闭";
               //    }else{
               //        return starth+":"+startm+"开启";
               //    }
               // }else if(starth>endh){            //   18:00 开启   10：00关闭
               //    if(nowh>=endh&&nowh<starth){
               //        return starth+":"+startm+"开启";
               //    }else{
               //        return endh+":"+endm+"关闭";
               //    }
               // }else{
               //    if(startm<endm){
               //        if(nowm>=startm&&nowm<endm){
               //            return endh+":"+endm+"关闭";
               //        }else{
               //            return starth+":"+startm+"开启";
               //        }
               //    }else{
               //       if(nowh>=endm&&nowh<startm){
               //          return starth+":"+startm+"开启";
               //        }else{
               //            return endh+":"+endm+"关闭";
               //        }
               //    }
               // }
              return "自动";
            case 2:
              return "距离感知";
            default:
              return "";
          }
        }

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
       
      // if($scope.currentDevice==null||$scope.currentDevice==undefined)return;
      //  console.log($scope.currentDevice);
      // if(+$scope.currentDevice.model==1){ //如果是手动的话
      //   if($scope.currentDevice.endTime==undefined||$scope.currentDevice.startTime==undefined){
      //     alert("自动模式下，必须输入开启时间和结束时间");
      //     return;
      //   }else{
      //     alert($scope.currentDevice.startTime.getTime());
      //     alert($scope.currentDevice.endTime.getTime());
      //     if($scope.currentDevice.startTime.getTime()==$scope.currentDevice.endTime.getTime()){
      //       alert("开启和关闭时间不能一样，会烧的，伙计！");
      //       return;
      //     }
      //   }
      // } 
      
      // alert("closeSetting3");
      $scope.modal.hide()
      // alert("closeSetting4");
      $scope.currentDevice = null;
    } 
    $scope.submit = function() {
      DeviceCenter.updateConfig({config: $scope.config}).then(function(){
        $state.go('app.dashboardsetting')
      })
      $scope.currentDevice = null
    }
})



