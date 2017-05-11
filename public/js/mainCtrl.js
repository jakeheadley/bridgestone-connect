// Start: Main Controller ======================================================
AA.controller("mainCtrl", function($scope, mainService, $timeout){

  $scope.catalogClick = function(showme){
    $scope.showme = !$scope.showme;
  };

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

    for (var i=0; i<response.length; i++){
      if (response[i].featured === 'FALSE'){
        response[i].featured = false;
      }
    }

    $scope.product = response;
    // console.log('SP', $scope.product);

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
        $scope.season = 'SUMMER';
        $scope.seasonImage = {
          'background': '#e2e2e2 url(\'../public/img/hero-potenza.png\') no-repeat center center'
        }
        break;
      case 'allseason':
        $scope.tiresToShow = allSeasonTires;
        $scope.season = 'ALL SEASON';
        $scope.seasonImage = {
          'background': '#e2e2e2 url(\'../public/img/hero-turanza.png\') no-repeat center center'
        }
        break;
      case 'winter':
        $scope.tiresToShow = winterTires;
        $scope.season = 'WINTER';
        $scope.seasonImage = {
          'background': '#e2e2e2 url(\'../public/img/hero-blizzak.png\') no-repeat center center'
        }
        break;
    }
  }
  // Sets the product catalog form to be hidden by default ------------------ //
  $scope.showme = false;
  $scope.confirmation = false;

  // Checks to see if form input data is valid, before submitting form ------ //
	$scope.submitForm = function(isValid) {

		// If form is completely valid
		if (isValid) {
			alert('Success\!');
		}
	};

  // Controls timeout of confirmation and form, after creds are submitted --- //
  $scope.hideModals = function(){
    $timeout(function(){
      $scope.confirmation = !$scope.confirmation;
      $scope.showme = !$scope.showme;
    }, 5000)
  }
  // End: Product catalog handling ---------------------------------------------
  // Start: email service ------------------------------------------------------
  $scope.sendEmail = function(email) {
    console.log('line 72 mainCtrl: email:', email);
    mainService.sendEmail(email)
  }
  // End: email service --------------------------------------------------------


});
// End: Main Controller ========================================================
