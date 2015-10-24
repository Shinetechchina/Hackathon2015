(function(window, undefined) {
  var dictionary = {
    "f2165aa6-6c05-47f1-89a3-5fc9350c0619": "配置模式",
    "68f37fa8-5b1a-4ab1-9435-3d712f014024": "加载屏幕",
    "d403a5b5-9ce3-407b-8fcd-a94216a18213": "已绑定的首页",
    "7ac8aded-b13a-4b9c-9904-e024a1ff45cd": "绑定家居设备",
    "61f7a552-16f0-4d3b-93b3-259d7e92171f": "未绑定设备的首页",
    "ae5ecd1c-387a-4552-9ddd-0766d828b1a6": "配置模式手动_距离感应",
    "640bfcd0-2792-4cee-981b-82099b4a9542": "添加管理策略",
    "1c91ae8d-1b9f-448a-b0ee-84ed1eb0c8a4": "模式项打开状态-自动",
    "3e11fc38-6b4d-431c-a323-f28c95b4b7b1": "我的树莓派",
    "7606dea7-a9be-4d28-b1ae-0421f1e285e2": "绑定家居设备成功",
    "28ab2b87-cc47-4963-8958-995e2f1d7e85": "绑定树莓派",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1"
  };

  var uriRE = /^(\/#)?(screens|templates|masters)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);