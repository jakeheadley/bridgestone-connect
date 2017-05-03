// Start: Main Service =========================================================
AA.service("mainService", function($http){

  this.getProducts = function(){
    return $http.get('/product_catalog/all').then(function(response){
      return response.data;
    })
  }

});
// End: Main Service ===========================================================
