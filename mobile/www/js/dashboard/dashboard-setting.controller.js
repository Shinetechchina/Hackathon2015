angular.module('dashboard-setting', ['ionic'])
.controller("DashboardSettingController", function($scope, $ionicModal) {
   $ionicModal.fromTemplateUrl("templates/dashboard-setting-modal.html", {
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
