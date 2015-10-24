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


  $scope.selectDate = function() {
    var options = {
      date: new Date(),
      mode: 'date'
    }
    datePicker.show(options, function(date) {
      console.log(date)
    })

  }
})
