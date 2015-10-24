angular.module('starter.controllers', ["ionic"])
.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    //$ionicModal.fromTemplateUrl("templates/dashboard-setting-modal.html", {
    //    scope: $scope,
    //    animation: "slide-in-up"
    //}).then(function (modal) {
    //    $scope.modal = modal
    //})
    //alert("aaa");
    $scope.popSetting = function () {
        $scope.modal.show();
    }

    $scope.closeSetting = function () {
        $scope.modal.close();
    }
})
