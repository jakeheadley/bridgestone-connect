const app = require('./server.js')
    , db = app.get('db')
    , nodemailer = require('nodemailer')
    , config = require ('./config.js');

module.exports = {
  newUser: function(req, res) {
    let first = req.body.newUserObj.firstname
      , last = req.body.newUserObj.lastname
      , email = req.body.newUserObj.email
      , mailing = req.body.newUserObj.mailing
      , city = req.body.newUserObj.city
      , state = req.body.newUserObj.state
      , zipcode = req.body.newUserObj.zipcode
      , season = req.body.newUserObj.season;

    db.new_user([first, last, email, mailing, city, state, zipcode], function(err, sqlResponse) {
      if (!err){
        db.new_entry([sqlResponse[0].id, season], function(innerErr, innerSqlResponse){
          !err ? res.status(200).send(innerSqlResponse) : res.status(500).send(innerErr);
        })
      } else {
        res.status(500).send(err);
      }
    });
  },

  getProducts: function(req, res){
    db.get_products(function(err, products) {
      if (!err) {
        res.status(200).send(products);
      }
    });
  },

  sendEmail: function(req, res){
    // console.log('serverCtrl line 35:', req.body.email);
    // res.status(200).send();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bridgestone.devmountain@gmail.com',
            pass: config.EMAIL_PASSWORD
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: ['bridgestone.devmountain@gmail.com'], // sender address
        to: ['bridgestone.devmountain@gmail.com', req.body.email], // list of receivers
        subject: 'Congratulations!', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }

}
