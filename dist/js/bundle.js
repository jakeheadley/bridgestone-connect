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
"use strict";

// Start: App ==================================================================
angular.module("bridgestoneConnectApp", []);
// Start: App ==================================================================
"use strict";

// Start: Main Controller ======================================================
angular.module("bridgestoneConnectApp").controller("mainCtrl", function ($scope, mainService) {

    $scope.test = "bOOya\! The bridgestoneConnectApp is working";
});
// End: Main Controller ========================================================
"use strict";

// Start: Main Service =========================================================
angular.module("bridgestoneConnectApp").service("mainService", function () {});
// End: Main Service ===========================================================
'use strict';

// Defining Required Dependencies ==============================================
var express = require('express');
var massive = require('massive');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');
var PORT = 3000;

// Declaring the App ===========================================================
var app = module.exports = express();

// Connecting to the Database ==================================================
var conn = massive.connectSync({
  connectionString: "postgres://postgres:Zoltan_22@localhost/bridgestone_connect"
});

//var app = express();
app.use(bodyParser.json());

app.set('db', conn);
var db = app.get('db');

app.get('/product_catalog/all', function (req, res, next) {
  db.getAllProducts(function (err, products) {
    if (!err) {
      res.status(200).send(products);
    }
  });
});

// app.get('/products', serverCtrl.getProducts);
//
// app.get('/product/:id', serverCtrl.getProductById);
//
// app.post('/newuser', serverCtrl.newUser);


// === Server listening to the PORT ============================================
app.listen(PORT, function () {
  console.log('Listening on port:', PORT, 'yAy\!');
});
//# sourceMappingURL=bundle.js.map
