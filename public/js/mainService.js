// Start: Main Service =========================================================
AA.service("mainService", function($http){
      // *** Converting this ^ to => breaks EVERYTHING beneath! :( ***

  // Start: Signup/Entry user creation -----------------------------------------
  const baseUrl = 'http://localhost:3000/'

  this.newUser = (newUserObj) => {
    return $http({
      method: 'POST',
      url: baseUrl + 'newuser',
      data: {
        newUserObj
      }
    }).then((response) => {
      return response;
    });
  };
  // End: Signup/Entry user creation -------------------------------------------
  // Start: Product catalog handling -------------------------------------------
  this.getProducts = () => {
    return $http.get('/product_catalog/all').then((response) => {
      return response.data;
    })
  }
  // End: Product catalog handling ---------------------------------------------
  // Start: email service ------------------------------------------------------
  this.sendEmail = (email) => {
    console.log('line 28 email', email);
    return $http({
        method: "POST",
        url: '/api/entries',
        data: { email: email }
    }).then((response) => {
        console.log('response', response)
    })
  }
  // End: email service --------------------------------------------------------

});
// End: Main Service ===========================================================
