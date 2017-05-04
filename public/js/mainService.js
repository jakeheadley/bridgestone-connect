// Start: Main Service =========================================================
AA.service("mainService", function($http){

  // Start: Signup/Entry user creation -----------------------------------------

  const baseUrl = 'http://localhost:3000/'

  this.newUser = function (newUserObj) {
    //console.log(newUserObj);
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

});
// End: Main Service ===========================================================
