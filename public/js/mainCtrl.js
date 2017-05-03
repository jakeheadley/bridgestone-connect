// Start: Main Controller ======================================================
AA.controller("mainCtrl", function($scope, mainService){

    //$scope.test = "bOOya\! The bridgestoneConnectApp is working";

    $scope.product = [];
    mainService.getProducts().then(function(response){
      console.log('main ctrl line 7: response:', response);
      $scope.product = response;
    })

    $scope.product.summer = [];
    mainService.getProducts().then(function(response){
      $scope.product.summer = response;
    })

});
// End: Main Controller ========================================================
