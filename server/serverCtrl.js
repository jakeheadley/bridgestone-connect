const app = require('./server.js')
    , db = app.get('db');

module.exports = {
  newUser: function(req, res) {
      console.log(req.body.newUserObj);
      let first = req.body.newUserObj.firstname
        , last = req.body.newUserObj.lastname
        , email = req.body.newUserObj.email
        , mailing = req.body.newUserObj.mailing
        , city = req.body.newUserObj.city
        , state = req.body.newUserObj.state
        , zipcode = req.body.newUserObj.zipcode;
      db.new_user([first, last, email, mailing, city, state, zipcode], function(err, sqlResponse) {
        !err ? res.status(200).send(sqlResponse) : res.status(500).send(err)
      });
  },

  getProducts: function(req, res){
    db.get_products(function(err, products) {
      if (!err) {
        res.status(200).send(products);
      }
    });
  }
}
