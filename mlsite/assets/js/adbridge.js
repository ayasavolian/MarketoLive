$(document).ready(function(){
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
  var updateDemoButton = function(){
    console.log("test1");
    var pod = getCookie("userPod");
    console.log(pod);
    if(pod === 'app-sjp'){
      $("a[href='nothing']").attr('href', 'https://app-sjp.marketo.com/#SL1094330B2')
      console.log($('#demo-in-marketo').href);
    }
  }
  updateDemoButton();
  setTimeout(function(){
    $('#adbridge-two').animate({'margin-left':'-17%'},1000);
  },500);
  $('.margin-left').fadeIn("slow", "linear");

  document.onscroll = function() {
    var currHeight = $(document).scrollTop();
    console.log("test1");
    if(currHeight > 550)
      $('#adbridge-top').css('display','block');
    else{
      $('#adbridge-top').css('display','none');      
    }
  };
  var currentPosition = 1;
  $("#adbridge-top").click(function() {
      var currHeight = $(document).scrollTop();
      console.log(currHeight);
      console.log("test");
      if(currHeight > 550 && currHeight < 800){
        console.log("test1");
        $('html,body').animate({
           scrollTop: $("#adbridge-space").offset().top
        });
        $('#adbridge-top').css('display','none');
      }
      else if(currHeight > 800){
        console.log("test2");
        $('html,body').animate({
           scrollTop: $("#cloud-container").offset().top
        });
      }
      else{}
  });
  $("#adbridge-back,#adbridge-next").click(function() {
    console.log(this.id);
    switch(this.id){
      /*
      case 'adbridge-back':
        if(currentPosition != 0){
          switch(currentPosition){
            case 
          }
        }
      */
      case 'adbridge-next':
        switch(currentPosition){
          case 0:
            $('#adbridge-bkg-line-1').css('display','inline-block');
            setTimeout(function(){
              $('#adbridge-bkg-line-1').animate({'width':'30%'}, 1500);
            }, 500);
            $('#adbridge-description-first').css('display','none');
            $('#adbridge-two').fadeIn("slow", "linear");
            $('#adbridge-two').css("display", "inline-block");
            $('#adbridge-description-second').fadeIn("slow", "linear");
            currentPosition++;
            break;
          case 1:
            $('#adbridge-one').animate({'margin-left':'1%'});
            $('.part-one-section').css('width','40%');
            $('.part-one-middle-section').css('width','40%');
            $('#adbridge-bkg-line-2').css('display','inline-block');
            setTimeout(function(){
              $('#adbridge-bkg-line-2').animate({'width':'40%'}, 1500);
              setTimeout(function(){
                $('#adbridge-bkg-line-2').css('min-width','500px');
              }, 1500);
            }, 500);
            $('#adbridge-description-first').css('display','none');
            $('#adbridge-three').fadeIn("slow", "linear");
            $('#adbridge-three').css("display", "inline-block");
            $('#adbridge-description-third').fadeIn("slow", "linear");
            currentPosition++;
            break;
          case 2:
            $('#adbridge-top').css('display','block');
            $('.add-spacing').css('display','block');
            $('#adbridge-arrow').fadeIn("slow","linear");
            setTimeout(function(){
              $('html,body').animate({
                 scrollTop: $("#cloud-container").offset().top
              });
            }, 1500);
            $('#adbridge-description-third').css('display','none');
            setTimeout(function(){
              $('#cloud-img').fadeIn("slow", "linear");
              $('#adbridge-description-fourth').fadeIn("slow", "linear");
            }, 1500);
            currentPosition++;
            break;
          case 3:
            $('#adbridge-next').css('display','none');
            $('.arrow-from-cloud-container').css('height','350px');
            $('#last-arrow').css("display","inline-block");
            $('#last-arrow').animate({"height":"350px"});
            setTimeout(function(){
              $('html,body').animate({
                 scrollTop: $("#fb-container").offset().top
              });
            }, 1500);
            setTimeout(function(){
              $('#fb-img').fadeIn("slow", "linear");
              $('#adbridge-description-fifth').fadeIn("slow", "linear");
            }, 1500);
            currentPosition++;
            break;
          default:
            console.log("not 1-4");
            break;
          break;
        }
      default:
        console.log("was neither");
        break;
    }
  });


});