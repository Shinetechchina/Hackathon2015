(function(window, undefined) {
  var dictionary = {
    "58c2e88e-68e8-4c5b-8323-03bc9dabd4e5": "定制居能家居",
    "1482b44b-1b19-42c8-9ee7-4aafcc639c93": "已绑定设备的首页",
    "cc5c9bd5-aaf6-489b-8661-cede3e146593": "左侧菜单",
    "fc9efb2f-eb15-45ed-9f3f-1beda5d57c4d": "绑定家居设备",
    "68503a7d-e959-40d2-95b6-e671729aeb29": "未绑定设备的首页",
    "5dd45800-fc00-4423-8fc8-4e6520f8c99a": "添加模式",
    "f29b9c08-4dbb-41a1-9e02-7f1bd90aaec3": "我的树莓派",
    "a89409b1-a2d8-4efe-a043-2f4da795d8f4": "绑定成功后的界面",
    "b25617ac-3c30-419a-a041-d8c339a8b931": "加载画面",
    "2cf7e5ad-d0f9-4eec-ae8b-509f256c43e4": "绑定树莓派",
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