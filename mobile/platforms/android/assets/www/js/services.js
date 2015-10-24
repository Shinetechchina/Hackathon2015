
angular.module('services', [])

.factory('DeviceCenter', function($http) {
  var http = function(method, url, data) {
    var hostName = "/v1";
    var req = {
      method: method,
      url: hostName + url,
      headers: {
        'Content-Type': "application/json"
      },
      data: data
    };
    return $http(req)
  };

  return {
    // {name: "", id: ""}
    // 控制中心注册
    register: function (data) {
      var self = this;
      data.id = "100";
      return http("POST", "/ControlCenters/Register", data)
    },
    getFamilyDevices: function() {
      return http("GET", "/ControlCenters/" + this.token, {})
    },
    setFamilyDevices: function(data) {
      return http("POST", "/ControlCenters/" + this.token, data)
    },
    // data will be {id: 1 , status: 0}
    setDevice: function(data) {
      return http("POST", "/ControlCenters/" + this.token + "/Device", data)
    },
    // 上传个性化配置
    updateConfig: function(data) {
      return http('POST', "/ControlCenters/" + this.token + "/Config", data)
    },
    // 设置启动配置
    activeConfig: function(deviceId) {
      return http('POST', "/ControlCenters/" + this.token + "/SetConfigActive", {id: deviceId})
    },
    token: "token"
  }
})
