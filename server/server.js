// Defining Required Dependencies ==============================================
const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const PORT = 3000;

// Declaring the App ===========================================================
const app = module.exports = express();
// Connecting to the Database ==================================================
var conn = massive.connectSync({
  connectionString : "postgres://postgres:Zoltan_22@localhost/bridgestone_connect"
});

app.use(bodyParser.json());
app.use(express.static(__dirname + './../'));

app.set('db', conn);
var db = app.get('db');

// Requiring server controller AFTER database == [*order is important here*] ===
var serverCtrl = require('./serverCtrl');

app.get('/product_catalog/all', serverCtrl.getProducts);
app.post('/newuser', serverCtrl.newUser);

// === Server listening to the PORT ============================================
app.listen(PORT, function(){
  console.log('Listening on port:', PORT, 'yAy\!');
});
