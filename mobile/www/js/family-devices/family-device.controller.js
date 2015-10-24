angular.module('starter-family-devices', [])
.controller('FamilyDeviceCtl', function($scope, $state) {

  $scope.items = [
    {id: "1",
     name: ''},
    {id: "2",
     name: ''},
    {id: "3",
     name: ''},
  ]

  $scope.showPreDefinedDevices = false;

  $scope.selectedItem = null;

  $scope.preDefinedDevices = [
    '空调',
    '电脑',
  ]

  $scope.addDevice = function(item) {
    $scope.showPreDefinedDevices = !$scope.showPreDefinedDevices;
    $scope.selectedItem = item;
  }

  $scope.submit = function (){

    $state.go('devices-show')
    // submite items json
    
  }
})

.controller('FamilyDeviceShowCtl', function($scope){


  // 获取到的家庭设备信息
  $scope.controlCenter = {
    "id": "xxxxxxx-0001",
    "name": "家里",
    "devices": [
      {
        "id": 1,
        "name": "空调",
        "status": 1
      },
      {
        "id": 2,
        "name": "电视",
        "status": 0
      },
      {
        "id": 3,
        "name": "电视",
        "status": 1
      }
    ],
    activeConfig: {
      "id": 1,
      "deviceSettings": [
        {
          "id": 1,
          "model": 0
        },
        {
          "id": 2,
          "model": 1,
          "startTime": "8:00",
          "endTime": "10:00"
        },
        {
          "id": 3,
          "model": 2,
          "distance": 500,
          "Status": 0
        }
      ]
    },
  };
})
