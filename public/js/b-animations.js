// Start: Animations ===========================================================
AA.directive('animaticDirective', function () {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      //Function for tire 1
      setTimeout(function(){
        $('#tire-one').css({
          'left': '8%',
          'transform': 'rotate(180deg)'
        }, 500)
      })

      // Function for tire 2 & 3
      $(window).on('scroll', function() {
        var winScroll = $(this).scrollTop();
        // console.log('win scroll', winScroll);
        if (winScroll > 330){
          $('#tire-two').css({
            'right': '8%',
            'transform': 'rotate(-180deg)'
          })
        } else {
          $('#tire-two').css({
            'right': '-305px',
            'transform': 'rotate(180deg)'
          })
        }
        // If controll for tire-three
        if (winScroll > 795){
          $('#tire-three').css({
            'left': '8%',
            'transform': 'rotate(180deg)'
          })
        } else {
          $('#tire-three').css({
            'left': '-305px',
            'transform': 'rotate(-180deg)'
          })
        }

      });

    }
  }

});

// End: Animations =============================================================
