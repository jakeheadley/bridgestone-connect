// Start: Main Service =========================================================
AA.service("mainService", function($http){

  // Start: Signup/Entry user creation -----------------------------------------
  const baseUrl = 'http://localhost:3000/'

  this.newUser = function (newUserObj) {
    return $http({
      method: 'POST',
      url: baseUrl + 'newuser',
      data: {
        newUserObj
      }
    }).then(function (response) {
      return response;
    });
  };
  // End: Signup/Entry user creation -------------------------------------------
  // Start: Product catalog handling -------------------------------------------
  this.getProducts = function(){
    return $http.get('/product_catalog/all').then(function(response){
      return response.data;
    })
  }
  // End: Product catalog handling ---------------------------------------------
  // Start: email service ------------------------------------------------------
  this.sendEmail = function(email) {
    console.log('line 28 email', email);
    return $http({
        method: "POST",
        url: '/api/entries',
        data: { email: email }
    }).then(function(response) {
        console.log('response', response)
    })
  }
  // End: email service --------------------------------------------------------

});
// End: Main Service ===========================================================
