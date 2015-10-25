 
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.zengcontrollers', 'starter.liucontrollers', 'services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            cache: false,
            templateUrl: 'templates/menu.html',
            controller: 'appCtrl'
        })
        .state('app.devices', {
            cache: false,
            url: '/devices',
            views: {
                'menuContent': {
                    templateUrl: 'templates/devices.html',
                    controller: 'devicesCtrl'
                }
            },
        })
        .state('app.bind', {
            cache: false,
            url: '/bind',
            views: {
                'menuContent': {
                    templateUrl: 'templates/bind.html',
                    controller: 'bindCtrl'
                }
            },
        })
        .state('app.familydevices', {
            cache: false,
            url: '/familydevices',
            views: {
                'menuContent': {
                    templateUrl: 'templates/familyDevices.html',
                    controller: "familyDevicesCtrl"
                }
            },
        })
        .state('app.familydevicesshow', {
            cache: false,
            url: '/familydevicesshow',
            views: {
                'menuContent': {
                    templateUrl: "templates/familyDevicesShow.html",
                    controller: "familyDevicesShowCtrl"
                }
            },
        })
        .state('app.dashboard', {
            cache: false,
            url: '/dashboard',
            views: {
                'menuContent': {
                    templateUrl: "templates/dashboard.html",
                    controller: "dashboardCtrl"
                }
            },
        })
        .state('app.dashboardsetting', {
            cache: false,
            url: '/dashboardsetting',
            views: {
                'menuContent': {
                    templateUrl: "templates/dashboardSetting.html",
                    controller: "dashboardSettingCtrl"
                }
            },
        })
        .state('app.confignew', {
            cache: false,
            url: '/config/new',
            views: {
                'menuContent': {
                    templateUrl: "templates/configNew.html",
                    controller: "configNewCtrl"
                }
            },
        });
         



    //.state('app.browse', {
    //    url: '/browse',
    //    views: {
    //        'menuContent': {
    //            templateUrl: 'templates/browse.html'
    //        }
    //    }
    //})
    //  .state('app.playlists', {
    //      url: '/playlists',
    //      views: {
    //          'menuContent': {
    //              templateUrl: 'templates/playlists.html',
    //              controller: 'PlaylistsCtrl'
    //          }
    //      }
    //  })

    //.state('app.single', {
    //    url: '/playlists/:playlistId',
    //    views: {
    //        'menuContent': {
    //            templateUrl: 'templates/playlist.html',
    //            controller: 'PlaylistCtrl'
    //        }
    //    }
    //});
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/familydevices');
})
.filter("deviceImg",function(DeviceCenter){
    return function(img,status){
        var open=status==1?"on":"off";
        for(var i =0;i<DeviceCenter.familyDeviceTypes.length;i++){
            if(DeviceCenter.familyDeviceTypes[i]==img){
                console.log('img/'+i+"_"+open+".png");
                return 'img/'+i+"_"+open+".png";
            }
        }
        return "img/no_setting.png";
    }
}); 
