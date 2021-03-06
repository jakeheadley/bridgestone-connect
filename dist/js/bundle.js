'use strict';

// Start: App ==================================================================
// var AA = angular.module("bridgestoneConnectApp", []);
var AA = angular.module('materializeApp', ['ui.materialize']).controller('BodyController', ["$scope", function ($scope) {
    $scope.select = {
        value: "Option1",
        choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
    };
}]);
// Start: App ==================================================================
'use strict';

// Start: Animations ===========================================================
AA.directive('animaticDirective', function () {
  return {
    restrict: 'A',
    link: function link(scope, elem, attrs) {
      //Function for tire 1
      setTimeout(function () {
        $('#tire-one').css({
          'left': '8%',
          'transform': 'rotate(180deg)'
        }, 500);
      });

      // Function for tire 2 & 3
      $(window).on('scroll', function () {
        var winScroll = $(this).scrollTop();
        // console.log('win scroll', winScroll);
        if (winScroll > 330) {
          $('#tire-two').css({
            'right': '8%',
            'transform': 'rotate(-180deg)'
          });
        } else {
          $('#tire-two').css({
            'right': '-305px',
            'transform': 'rotate(180deg)'
          });
        }
        // If controll for tire-three
        if (winScroll > 850) {
          $('#tire-three').css({
            'left': '8%',
            'transform': 'rotate(180deg)'
          });
        } else {
          $('#tire-three').css({
            'left': '-305px',
            'transform': 'rotate(-180deg)'
          });
        }
      });
    }
  };
});

// End: Animations =============================================================
'use strict';

// Start: This is the footer directive =========================================
AA.directive('footerDirective', function () {
  return {
    restrict: 'E',
    templateUrl: './public/views/footer.html',
    controller: 'mainCtrl'
  };
});
// End: This is the footer directive ===========================================
'use strict';

// Start: This is the header directive =========================================
AA.directive('headerDirective', function () {
  return {
    restrict: 'E',
    templateUrl: './public/views/header.html',
    controller: 'mainCtrl'
  };
});
// End: This is the header directive ===========================================
'use strict';

// Start: Main Controller ======================================================
AA.controller("mainCtrl", function ($scope, mainService, $timeout) {

  //$scope.test = "bOOya\! The bridgestoneConnectApp is working";

  // Start: Function used for the click event on Product Catalog ---------------
  $scope.catalogClick = function (showme) {
    $scope.showme = !$scope.showme;
  };
  // End: Function used for the click event on Product Catalog -----------------
  $scope.product = [];
  // Defining season varibles to be used.
  var summerTires = void 0;
  var allSeasonTires = void 0;
  var winterTires = void 0;
  // Start: User signup --------------------------------------------------------
  $scope.signUp = function (newUserObj) {
    // console.log(newUserObj);
    newUserObj.season = $scope.season;
    mainService.newUser(newUserObj).then(function (response) {
      // console.log(response);
    });
  };
  // Start: Product catalog handling -------------------------------------------
  mainService.getProducts().then(function (response) {
    for (var i = 0; i < response.length; i++) {
      if (response[i].featured === 'FALSE') {
        response[i].featured = false;
      }
    }
    $scope.product = response;
    // console.log('SP', $scope.product);
    summerTires = response.filter(function (tireObj) {
      return tireObj.tire_season === 'SUMMER';
    });
    allSeasonTires = response.filter(function (tireObj) {
      return tireObj.tire_season === 'ALL SEASON';
    });
    winterTires = response.filter(function (tireObj) {
      return tireObj.tire_season === 'WINTER';
    });
  });
  $scope.tireSeason = function (season) {
    switch (season) {
      case 'summer':
        $scope.tiresToShow = summerTires;
        $scope.season = 'SUMMER';
        $scope.seasonImage = {
          'background': '#e2e2e2 url(\'../public/img/hero-potenza.png\') no-repeat center center'
        };
        break;
      case 'allseason':
        $scope.tiresToShow = allSeasonTires;
        $scope.season = 'ALL SEASON';
        $scope.seasonImage = {
          'background': '#e2e2e2 url(\'../public/img/hero-turanza.png\') no-repeat center center'
        };
        break;
      case 'winter':
        $scope.tiresToShow = winterTires;
        $scope.season = 'WINTER';
        $scope.seasonImage = {
          'background': '#e2e2e2 url(\'../public/img/hero-blizzak.png\') no-repeat center center'
        };
        break;
    }
  };
  // Sets the product catalog form to be hidden by default ------------------ //
  $scope.showme = false;
  $scope.confirmation = false;
  // Checks to see if form input data is valid, before submitting form ------ //
  $scope.submitForm = function (isValid) {
    // If form is completely valid
    if (isValid) {
      alert('Success\!');
    }
  };
  // Controls timeout of confirmation and form, after creds are submitted --- //
  $scope.hideModals = function () {
    $timeout(function () {
      $scope.confirmation = !$scope.confirmation;
      $scope.showme = !$scope.showme;
    }, 5000);
  };
  // End: Product catalog handling ---------------------------------------------
  // Start: email service ------------------------------------------------------
  $scope.sendEmail = function (email) {
    // console.log('line 72 mainCtrl: email:', email);
    mainService.sendEmail(email);
  };
  // End: email service --------------------------------------------------------
});
// End: Main Controller ========================================================
'use strict';

// Start: Main Service =========================================================
AA.service("mainService", function ($http) {
  // *** Converting this ^ to => breaks EVERYTHING beneath! :( ***

  // Start: Signup/Entry user creation -----------------------------------------
  var baseUrl = 'http://localhost:3000/';

  this.newUser = function (newUserObj) {
    return $http({
      method: 'POST',
      url: baseUrl + 'newuser',
      data: {
        newUserObj: newUserObj
      }
    }).then(function (response) {
      return response;
    });
  };
  // End: Signup/Entry user creation -------------------------------------------
  // Start: Product catalog handling -------------------------------------------
  this.getProducts = function () {
    return $http.get('/product_catalog/all').then(function (response) {
      return response.data;
    });
  };
  // End: Product catalog handling ---------------------------------------------
  // Start: email service ------------------------------------------------------
  this.sendEmail = function (email) {
    console.log('line 28 email', email);
    return $http({
      method: "POST",
      url: '/api/entries',
      data: { email: email }
    }).then(function (response) {
      console.log('response', response);
    });
  };
  // End: email service --------------------------------------------------------
});
// End: Main Service ===========================================================
'use strict';

// Start: This is the product-catalog directive ================================
AA.directive('productCatalogDirective', function () {
  return {
    restrict: 'E',
    templateUrl: './public/views/product-catalog.html',
    controller: 'mainCtrl'
  };
});
// End: This is the product-catalog directive ==================================
'use strict';

// Start: This is the social directive =========================================
AA.directive('socialDirective', function () {
  return {
    restrict: 'E',
    templateUrl: './public/views/social-links.html',
    controller: 'mainCtrl'
  };
});
// End: This is the social directive ===========================================
//# sourceMappingURL=bundle.js.map
