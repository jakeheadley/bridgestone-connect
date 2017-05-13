const app = require('./server.js')
    , db = app.get('db')
    , nodemailer = require('nodemailer')
    , config = require('./config.js');
// New user handler - sends to the database ....................................
module.exports = {
  newUser: (req, res) => {
    let first = req.body.newUserObj.firstname
      , last = req.body.newUserObj.lastname
      , email = req.body.newUserObj.email
      , mailing = req.body.newUserObj.mailing
      , city = req.body.newUserObj.city
      , state = req.body.newUserObj.state
      , zipcode = req.body.newUserObj.zipcode
      , season = req.body.newUserObj.season;

    db.new_user([first, last, email, mailing, city, state, zipcode], (err, sqlResponse) => {
      if (!err){
        db.new_entry([sqlResponse[0].id, season], (innerErr, innerSqlResponse) => {
          !err ? res.status(200).send(innerSqlResponse) : res.status(500).send(innerErr);
        })
      } else {
        res.status(500).send(err);
      }
    });
  },
  // Get tire products from the catalog DB .....................................
  getProducts: (req, res) => {
    db.get_products((err, products) => {
      if (!err) {
        res.status(200).send(products);
      }
    });
  },
  // Send email after form submission ..........................................
  sendEmail: (req, res) => {
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
    // Setup email data with unicode symbols ...................................
    let mailOptions = {
      from: ['bridgestone.devmountain@gmail.com'], // sender address
      to: ['bridgestone.devmountain@gmail.com', req.body.email], // list of receivers
      subject: 'Congratulations! You have been entered to win a set of Bridgestone tires.', // Subject line
      text: 'Hello world ?', // plain text body
      html: "<!DOCTYPE html PUBLIC \"-\/\/W3C\/\/DTD XHTML 1.0 Transitional \/\/EN\" \"http:\/\/www.w3.org\/TR\/xhtml1\/DTD\/xhtml1-transitional.dtd\">\r\n<html lang=\"en\">\r\n<head>\r\n  <meta http-equiv=\"Content-Type\" content=\"text\/html; charset=UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n  <link href=\"https:\/\/fonts.googleapis.com\/css?family=Pathway+Gothic+One|Roboto:400,500,700|Titillium+Web:400,600,700\" rel=\"stylesheet\" type=\"text\/css\">\r\n <style type=\"text\/css\">\r\n body { font-family: \'Roboto\', sans-serif;}\r\n h1, h2, h3, h4 { font-family: \'Titillium Web\', sans-serif;}\r\n  <\/style>\r\n<\/head>\r\n  <body style=\"margin:0; padding:0; background-color:#F2F2F2;\"><center>\r\n <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#F2F2F2\">\r\n <tr>\r\n <td align=\"center\" valign=\"top\" style=\"background: #E42300; border: 1px red solid\">\r\n <h1 style=\"font-size: 65px; color: #FFF; margin-bottom: 0; margin-top: 0;\">CONGRATULATIONS!<\/h1>\r\n <h2 style=\"font-size: 22px; font-family: \'Roboto\', sans-serif; color: #FFF; margin-top:0;\">You have been entered to win a brand new set of Bridgestone tires.<\/h2>\r\n          <\/td>\r\n <\/tr>\r\n <tr>\r\n <td align=\"center\" valign=\"top\" style=\"\">\r\n <table width=\"600px\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n <tr align=\"left\">\r\n <td style=\"padding-top: 20px; padding-bottom: 50px;\">\r\n <h2 style=\"font-size: 20px;\">Your journey to the top is full of twists and turns. Best of luck!!<br\/>That\u2019s why our tires are rigorously engineered to perform their best when you need them most.<\/h2>\r\n <p>Curabitizzle things gizzle quis nisi bizzle mollizzle. Suspendisse own yo\'. Ass odio. Ghetto neque. Cras orci. Crizzle maurizzle sure, nizzle brizzle, stuff shizznit fo shizzle, boom shackalack izzle, i saw beyonces tizzles and my pizzle went crizzle. Ass gravida. Vestibulum boofron mi, gangster izzle, sagittis sizzle, adipiscing semper, velit. Crizzle izzle ipsum. Daahng dawg volutpizzle sheezy bling bling orci. <\/p><p>Cras izzle justo in purus sodales ornare. Shizznit venenatizzle justo et its fo rizzle. Ass yo. Suspendisse crazy placerat lacus. Ma nizzle izzle ante. Nunc pharetra, fo shizzle eu dapibus hendrerizzle, away felis elementizzle sizzle, cool aliquizzle magna felizzle shizzlin dizzle pede. Sizzle a nisl. Class aptent taciti the bizzle izzle shiz torquent shizzle. <\/p>\r\n <\/td>\r\n <\/tr>\r\n <\/table>\r\n <\/td>\r\n <\/tr>\r\n <tr style=\"background: #BCBCBC; height: 100px;\">\r\n <td align=\"center\">\r\n <img width=\"250px\" src=\"http:\/\/logo-logos.com\/wp-content\/uploads\/2016\/10\/Bridgestone_logo_logotype.png\" alt=\"Bridgestone\">\r\n <\/td>\r\n <\/tr>\r\n <\/table>\r\n  <\/center><\/body>\r\n<\/html>"
      // html body
    };
    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}
