
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
    return $http.get("/v1/ControlCenter/sdafds")
  };

  return {
    // {name: "", id: ""}
    // 控制中心注册
    register: function (data) {
      var self = this;
      return http("POST", "/ControlCenter/Register", data).then(
        function(response) {
          self.token = response.token;
        },
        function(error) {
          self.token = "gppd";
          throw error
        }
      )
    },
    getFamilyDevices: function() {
      return http("GET", "/ControlCenter/" + this.token, {})
    },
    setFamilyDevices: function(data) {
      return http("POST", "/ControlCenter/" + this.token, data)
    },
    // data will be {id: 1 , status: 0}
    setDevice: function(data) {
      return http("POST", "/ControlCenter/" + this.token + "/Device", data)
    },
    // 上传个性化配置
    updateConfig: function(data) {
      return http('POST', "/ControlCenter/" + this.token + "/Config", data)
    },
    // 设置启动配置
    activeConfig: function(deviceId) {
      return http('POST', "/ControlCenter/" + this.token + "/SetConfigActive", {id: deviceId})
    },
    token: null
  }
})
