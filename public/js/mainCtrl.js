// Start: Main Controller ======================================================
AA.controller("mainCtrl", function($scope, mainService, $timeout){

  //$scope.test = "bOOya\! The bridgestoneConnectApp is working";
  $scope.product = [];

  let summerTires;
  let allSeasonTires;
  let winterTires;

  // Start: User signup --------------------------------------------------------
  $scope.signUp = function(newUserObj) {
    console.log(newUserObj);
    newUserObj.season = $scope.season;
    mainService.newUser(newUserObj).then(function(response){
      console.log(response);
    });
  };

  // Start: Product catalog handling -------------------------------------------
  mainService.getProducts().then(function(response){
    $scope.product = response;
    summerTires = response.filter((tireObj) => {
      return tireObj.tire_season === 'SUMMER'
    });
    allSeasonTires = response.filter((tireObj) => {
      return tireObj.tire_season === 'ALL SEASON'
    });
    winterTires = response.filter((tireObj) => {
      return tireObj.tire_season === 'WINTER'
    });
  })
  $scope.tireSeason = function(season){
    switch (season) {
      case 'summer':
        $scope.tiresToShow = summerTires;
        $scope.season = 'SUMMER'
        break;
      case 'allseason':
        $scope.tiresToShow = allSeasonTires;
        $scope.season = 'ALL SEASON'
        break;
      case 'winter':
        $scope.tiresToShow = winterTires;
        $scope.season = 'WINTER'
        break;
    }
  }
  // Sets the product catalog form to be hidden by default -- //
  $scope.showme = false;
  $scope.confirmation = false;

  $scope.hideModals = function(){
    $timeout(function(){
      $scope.confirmation = !$scope.confirmation;
      $scope.showme = !$scope.showme;
    }, 5000)
  }
  // End: Product catalog handling ---------------------------------------------
});
// End: Main Controller ========================================================
