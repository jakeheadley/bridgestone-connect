// Start: Animations ===========================================================
// $(window).on('scroll', function() {
//   var winScroll = $(this).scrollTop();
//
//   $('.star').css({
//     'transform': 'translate(-' + winScroll / 2 + '%)'
//   });
//   $('.moon').css({
//     'transform': 'translateY(-' + winScroll / 6.5 + '%)'
//   });
//     $('.headline').css({
//     'transform': 'translate(+' + winScroll / 8 + '%)'
//   });
// });
// End: Animations =============================================================
"use strict";
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
AA.controller("mainCtrl", function ($scope, mainService) {

  //$scope.test = "bOOya\! The bridgestoneConnectApp is working";

  $scope.product = [];

  var summerTires = void 0;
  var allSeasonTires = void 0;
  var winterTires = void 0;

  mainService.getProducts().then(function (response) {
    $scope.product = response;
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
        break;
      case 'allseason':
        $scope.tiresToShow = allSeasonTires;
        break;
      case 'winter':
        $scope.tiresToShow = winterTires;
        break;
    }
  };

  $scope.showme = false;
});
// End: Main Controller ========================================================
"use strict";

// Start: Main Service =========================================================
AA.service("mainService", function ($http) {

  this.getProducts = function () {
    return $http.get('/product_catalog/all').then(function (response) {
      return response.data;
    });
  };
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
//# sourceMappingURL=bundle.js.map
