/*global jQuery */
/* Contents
// ------------------------------------------------>
0.  IPPONGYM CUSTOM
1.  MENU SMOOTH SCROLL DWON PAGE
2.  LOADING SCREEEN
3.  ANIMACTION
4.  SMOOTH SCROLL
5.  CHANGE HEADER STYLE
6.  NAVBAR
7.  TRAINER SLIDER
8.  VIDEO SECTION
9.  GALLERY SECTION
10. BLOG SLIDER
11. HOME NAV SMOOTH SCROLL
12. SCROLL TO TOP
13. TESTIMONIALS SLIDER
14. PORTFOLIO
15. COUNTER
16. COMMING SOON
17. CLASSES FILTER
18. CONTACT FORM
19. TIME TABLE
*/
$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  // console.log($(this));
  // console.log(elementBottom > viewportTop && elementTop < viewportBottom);
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

/*---------------Contact_Form--------------*/
$(function() { 
  $('#contact-us-form').submit(function(ev) {
    ev.preventDefault();
    var $f = $(this);
    var self = this;
    $('#contact-us-btn').attr('disabled', true);
    if ($f.data('submitted') === true) {
      // Previously submitted - don't submit again
      ev.preventDefault();
    } else {
      // Mark it so that the next submit can be ignored
      $f.data('submitted', true);
    }
    grecaptcha.ready(function() {
      grecaptcha.execute('6Lc-dr0ZAAAAABcx8IdZyJ--WOx2xZ6Zm7llO2wF', { action: 'contactform' })
        .then(function(token) {
          var recaptchaResponse = document.getElementById('recaptchaResponse');
          recaptchaResponse.value = token;
        })
        .then(() => {
          var form = $(self);
          var formData = $(self).serialize();
          $.post('./mail.php', formData, function(data) {
            form.append('<div class="success-msg" style="color:#fff; font-weight:bold; margin-top: 10px; text-align: center;">Hemos recibido tu correo electrónico</div>');
          }).fail(function() {
            form.append('<div class="error-msg" style="margin-top: 10px; text-align: center;">Algo ha ido mal</div>');
          });
    })
    });
  });
});

/*---------------- time_table ------------------*/
$(function() { 
  $(".tab_content").hide();
  $(".tab_content:first").show();

  /* if in tab mode */
  $("ul.tabs li").click(function() {
    
    $(".tab_content").hide();
    var activeTab = $(this).attr("rel"); 
    $("#"+activeTab).fadeIn();    
    
    $("ul.tabs li").removeClass("active");
    $(this).addClass("active");

    $(".tab_drawer_heading").removeClass("d_active");
    $(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
    
  });
  /* if in drawer mode */
  $(".tab_drawer_heading").click(function() {
    
    $(".tab_content").hide();
    var d_activeTab = $(this).attr("rel"); 
    $("#"+d_activeTab).fadeIn();
    
    $(".tab_drawer_heading").removeClass("d_active");
    $(this).addClass("d_active");
    
    $("ul.tabs li").removeClass("active");
    $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
  });

  $('ul.tabs li').last().addClass("tab_last");
});

$('.scrollToTop').on('click', function(e) {
  $('html, body').animate({scrollTop : 0},800);
  return false;
});

(function($) {
  /*---------------- SCROLLSPY ------------------*/
  $('body').scrollspy({ target: '#main-navbar', offset: 100 });
  $('.nav-link').on('activate.bs.scrollspy', function() {
    var current = document.getElementsByClassName("current");
    // current.length > 0 && (current[0].className = current[0].className.replace(" current", ""));
    current.length > 0 && $(current[0]).removeClass("current");
    // this.className += " current";
    $(this).addClass("current");
  });
  $(window).on('resize scroll load', function() {
    var header = document.getElementById("onenav");
    // var sections = document.getElementsByTagName("section");
    var sections = $('#home, #aboutus, #course, #timetable, #gallery, #contact');
    for (var i = 0; i < sections.length; i++) {
      if ($(sections[i]).isInViewport()) {
        var current = document.getElementsByClassName("current");
        // current.length > 0 && (current[0].className = current[0].className.replace(" current", ""));
        current.length > 0 && $(current[0]).removeClass("current");
        var btns = header.getElementsByClassName("js-scroll-trigger");
        for (var j = 0; j < btns.length; j++) {
          /* Attention: the includes means that homeland includes home, doesn't affect on this specific case */
          if ($(btns[j]).attr("href").includes(sections[i].id)) {
            $(btns[j]).parent().addClass("current");
          }
        }
      }
    }
  })

  /*---------------- MENU SMOOTH SCROLL DWON PAGE ------------------*/
  $(window).on('scroll', function() {
    headerStyle();
  });
  /*---------------- LOADING SCREEEN ------------------*/
  headerStyle();
  
  $(window).on('load', function() {
    handlePreloader();
  });

  function handlePreloader() {
    if($('.preloader').length){
      $('.preloader').delay(500).fadeOut(500);
    }
  }
  /* WHOLE SCRIPT STRIzCT MODE SYNTAX */
"use strict";

$('.carousel').carousel({
  interval: 4000
})
  /*---------------- ANIMACTION ------------------*/
  if($('.wow').length){
    wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100,
        callback:     function(box) {
          // console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
      }
    );
    wow.init();
  } 
  /*---------------- SMOOTH SCROLL ------------------*/
  $("a[href^='#']:not(.scrollToTop)").on("click", function(e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);
    $("html, body").animate({
        "scrollTop": $target.offset().top - 90
    }, 1000, "swing");
  });
  /*---------------- CHANGE HEADER STYLE ------------------*/
  function headerStyle() {
    if($('.main-header').length){
      var topbarHeight = $('.header-top').innerHeight();
      var windowpos = $(window).scrollTop();
      if (windowpos >= topbarHeight) {
        $('.main-header').addClass('header-fixed');
      } else {
        $('.main-header').removeClass('header-fixed');
      }
    }
  }
  /*---------------- NAVBAR ------------------*/
  if(screen.width <= parseInt(767))
  {
    $('.menu_btn').on('click', function(e) {
      $('.navbar-collapse').toggleClass('in');
      $('.navbar-collapse').toggleClass('slideInLeft');
      $('.icon-bar').toggleClass('cross');
    });
  }
  $(window).on('scroll load', function(e) {
    var scroll = $(window).scrollTop();
    if (scroll > parseInt(50)) {
      $(".header-lower").css("background" , "rgba(0, 131, 81, 0.90)");
    }
    else{
      $(".header-lower").css("background" , "rgba(0, 131, 81, 0.55)");   
    }
  })
  var header = document.getElementById("onenav");
  var btns = header.getElementsByClassName("nav-link");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("current");
      current[0].className = current[0].className.replace(" current", "");
      this.className += " current";
    });
  }
  /*---------------- TRAINER SLIDER ------------------*/
  var owl = $('#slider3');
    owl.owlCarousel({
    loop:true,
    margin: 20,
    autoplayTimeout:5000,
    smartSpeed:450,
    dots:true,
    nav: true,
    navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  })
  /*---------------- VIDEO SECTION ------------------*/
  var $iframe = $('iframe'),
  $videoLink = $('.video-link'),
  playerTemplate = '<div class="player"><div class="player__video"><div class="video-filler"></div><button class="video-close">&times;</button><iframe class="video-iframe" src="{{iframevideo}}" frameborder="0" allowfullscreen></iframe></div><div/>';

  $videoLink.on('click', function(e) {
    var localTemplate = '',
      videoWidth = parseInt($(this).data('width')),
      videoHeight = parseInt($(this).data('height')),
      videoAspect = ( videoHeight / videoWidth ) * parseInt(100),
      $player = null,
      $video = null,
      $close = null,
      $iframe = null;
      e.preventDefault();
      localTemplate = playerTemplate.replace('{{iframevideo}}', $(this).prop('href'));
      $player = $(localTemplate);
      $player
        .find('.video-filler')
        .css('padding-top', videoAspect + '%');
      $close = $player
        .find('.video-close')
        .on('click', function() {
          $(this).off().closest('.player').hide().remove();
    });

    $player.appendTo('body').addClass('js--show-video');
  });
  /*---------------- GALLERY SECTION ------------------*/
  $('.footer-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    image: {
      verticalFit: true,
        titleSrc: function (item) {
        return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
        }
      },
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function (element) {
          return element.find('img');
        }
      }
  });
  var owl = $('#slider2');
    owl.owlCarousel({
    loop:true,
    margin: 0,
    autoplayTimeout:5000,
    smartSpeed:450,
    dots:false,
    nav: false,
    navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  })
  /*---------------- BLOG SLIDER ------------------*/
  var owl = $('#slider4');
    owl.owlCarousel({
    loop:false,
    margin: 20,
    autoplayTimeout:5000,
    smartSpeed:450,
    dots:false,
    nav: true,
    navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],  
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  })
  /*---------------- HOME NAV SMOOTH SCROLL ------------------*/
  $('.ToTop').on('click', function(e) {
    $('html, body').animate({scrollTop : 0},800);
    $('.nav-link').removeClass('current');
    $('.home').addClass('current');
    return false;
  });
  // $('.scrollToTop').on('click', function(e) {
  //   $('html, body').animate({scrollTop : 0},800);
  //   return false;
  // });
  /*---------------- SCROLL TO TOP ------------------*/
  $(window).on('scroll', function(e) {
    if ($(this).scrollTop() > parseInt(100)) {
      $('.scrollToTop').fadeIn();
    } 
    else {
      $('.scrollToTop').fadeOut();
    }
  });
  /*---------------- TESTIMONIALS SLIDER ------------------*/
  var owl = $('#testimonials_slider');
    owl.owlCarousel({
    loop:true,
    margin: 30,
    autoplayTimeout:5000,
    smartSpeed:450,
    dots:false,
    nav: true,
    navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 2
      }
    }
  })
  /*---------------- PORTFOLIO ------------------*/
  var $container = $('.portfolioContainer');
    $container.isotope({
      filter: '*',
      animationOptions: {
        duration: 200,
        easing: 'linear',
        queue: false
      }
  });
  $('.portfolioFilter a').on('click', function(e) {
    $('.portfolioFilter .current').removeClass('current');
    $(this).addClass('current');
    var selector = $(this).attr('data-filter');
    $container.isotope({
      filter: selector,
      animationOptions: 
      {
        duration: 200,
        easing: 'linear',
        queue: false
      }
    });
    return false;
  });
  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    getSortData: {
      name: '.name',
      category: '[data-category]'
    },
    masonry: {
      columnWidth: 200
    }
  });
  /*---------------- COUNTER ------------------*/

  $(window).on('scroll', function(e) {    
    var a = 0;
    if($('#counter').length!= parseInt(0)){
    var oTop = $('#counter').offset().top - window.innerHeight;
      if (a == parseInt(0) && $(window).scrollTop() > oTop) {
        $('.counter-value').each(function() {
          var $this = $(this),
            countTo = $this.attr('data-count');
          $({
            countNum: $this.text()
          }).animate({
              countNum: countTo
            },

            {

              duration: 2000,
              easing: 'swing',
              step: function() {
                $this.text(Math.floor(this.countNum));
              },
              complete: function() {
                $this.text(this.countNum);
                //alert('finished');
              }

            });
        });
        a = 1;
      }
    }
  });
  /*---------------- Coming_Soon ------------------*/
  function srvTime() {
    try {
      xmlHttp = new XMLHttpRequest();
    } catch (err1) {
    try {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (err2) {
    try {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (err3) {
      console.warn("AJAX not supported");
    }
    }
    }
    xmlHttp.open("HEAD", window.location.href.toString(), false);
    xmlHttp.setRequestHeader("Content-Type", "text/html");
    return xmlHttp.getResponseHeader("Date");
  }
  
 /*---------------- classes_filter ------------------*/
  $(function() { 
    $('nav ul li a:not(:only-child)').on('click', function(e) {
      $(this).siblings('.nav-dropdown').toggle();
    
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    $('html').on('click', function(e) {
      $('.nav-dropdown').hide();
    });
    $('#nav-toggle').on('click', function(e) {
      $('nav ul').slideToggle();
    });
    $('#nav-toggle').on('click', function(e) {
      this.classList.toggle('active');
    });
  });


/*---------------Contact_Form--------------*/

// $('#contact-us-form').submit(function(ev) {
//   var form = $(this);
//   var formData = $(this).serialize();
//   console.log(this);
 
//   $.post('../mail.php', formData, function(data) {
//     //form.find('.send_mes').val('');
//     form.append('<div class="success-msg" style="color:#fff; font-weight:bold;">Mail Sent.</div>');
//   }).fail(function() {
//     //form.find('.required-field').val('');
//     form.append('<div class="error-msg">Error occurred.</div>');
//   });

//     ev.preventDefault();
//     return false;

// });
// $(function() {
  // $('#contact-us-btn').click(function() {
  //   console.log('xx')
  // })
  // $('#contact-us-btn').on('click', function(ev) {
  //   console.log('xx')
  //   ev.preventDefault();
  // })
  // $('#contact-us-form').submit(function(ev) {
  //   ev.preventDefault();
  //   var form = $(this);
  //   var formData = $(this).serialize();
   
  //   $.post('../mail.php', formData, function(data) {
  //     //form.find('.send_mes').val('');
  //     form.append('<div class="success-msg" style="color:#fff; font-weight:bold;">Mail Sent.</div>');
  //   }).fail(function() {
  //     //form.find('.required-field').val('');
  //     form.append('<div class="error-msg">Error occurred.</div>');
  //   });

  //   return false;

  // });
// });




  // /*---------------- time_table ------------------*/
  // (function($) {
  //   $(".tab_content").hide();
  //   $(".tab_content:first").show();

  //   /* if in tab mode */
  //   $("ul.tabs li").click(function() {
  //     console.log('xx')
      
  //     $(".tab_content").hide();
  //     var activeTab = $(this).attr("rel"); 
  //     $("#"+activeTab).fadeIn();    
      
  //     $("ul.tabs li").removeClass("active");
  //     $(this).addClass("active");

  //     $(".tab_drawer_heading").removeClass("d_active");
  //     $(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
      
  //   });
  //   /* if in drawer mode */
  //   $(".tab_drawer_heading").click(function() {
      
  //     $(".tab_content").hide();
  //     var d_activeTab = $(this).attr("rel"); 
  //     $("#"+d_activeTab).fadeIn();
      
  //     $(".tab_drawer_heading").removeClass("d_active");
  //     $(this).addClass("d_active");
      
  //     $("ul.tabs li").removeClass("active");
  //     $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
  //   });

  //   $('ul.tabs li').last().addClass("tab_last");
  // });

  $(function() {
      var selectedClass = "";
      $(".fil-cat").on('click', function(e) {
      selectedClass = $(this).attr("data-rel"); 
      $("#portfolio").fadeTo(100, 0.1);
      $("#portfolio div").not("."+selectedClass).fadeOut().removeClass('scale-anm');
      setTimeout(function() {
        $("."+selectedClass).fadeIn().addClass('scale-anm');
        $("#portfolio").fadeTo(300, 1);
      }, 300); 
    });
  });

  $(window).on('load', function(){
    var $container = $('.portfolioContainer');
    $container.isotope({
      filter: '*',
      animationOptions: {
        duration: 100,
        easing: 'linear',
        queue: false
      }
  });

  $('.portfolioFilter a').on('click', function(e) {
  $('.portfolioFilter .current').removeClass('current');
  $(this).addClass('current');

  var selector = $(this).attr('data-filter');

  $container.isotope({
      filter: selector,
      animationOptions: {
          duration: 100,
          easing: 'linear',
          queue: false
      }
   });
   return false;
}); 
});
$(".navbar-nav a").on('click', function () {
	$(".navbar-collapse").removeClass("in");
});
})(window.jQuery);