// Start: Main Controller ======================================================
AA.controller("mainCtrl", function($scope, mainService){

    //$scope.test = "bOOya\! The bridgestoneConnectApp is working";

    $scope.product = [];

    let summerTires;
    let allSeasonTires;
    let winterTires;

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

    $scope.showme = false;

});
// End: Main Controller ========================================================
