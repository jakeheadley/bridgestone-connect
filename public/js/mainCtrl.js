// Start: Main Controller ======================================================
AA.controller("mainCtrl", function($scope, mainService){

  //$scope.test = "bOOya\! The bridgestoneConnectApp is working";

  // Start: Product catalog handling -------------------------------------------
  $scope.product = [];

  let summerTires;
  let allSeasonTires;
  let winterTires;

  $scope.signUp = function(newUserObj) {
    console.log(newUserObj);
    mainService.newUser(newUserObj).then(function(response){
      console.log(response);
    });
  };

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
        break;
      case 'allseason':
        $scope.tiresToShow = allSeasonTires;
        break;
      case 'winter':
        $scope.tiresToShow = winterTires;
        break;
    }
  }
  // Sets the product catalog form to be hidden by default -- //
  $scope.showme = false;
  // End: Product catalog handling ---------------------------------------------
});
// End: Main Controller ========================================================
