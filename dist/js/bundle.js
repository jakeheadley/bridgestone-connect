'use strict';

$(window).on('scroll', function () {
  var winScroll = $(this).scrollTop();

  $('.star').css({
    'transform': 'translate(-' + winScroll / 2 + '%)'
  });
  $('.moon').css({
    'transform': 'translateY(-' + winScroll / 6.5 + '%)'
  });
  $('.headline').css({
    'transform': 'translate(+' + winScroll / 8 + '%)'
  });
});
"use strict";

angular.module("bridgestoneConnectApp", []);
"use strict";

angular.module("bridgestoneConnectApp").controller("ctrl", function ($scope, service) {

    $scope.test = "bOOya\! The bridgestoneConnectApp is working";
});
"use strict";

angular.module("bridgestoneConnectApp").service("mainService", function () {});
//# sourceMappingURL=bundle.js.map
