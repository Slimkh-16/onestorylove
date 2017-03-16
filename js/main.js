(function() {

  "use strict";

  var body = document.querySelector('body'),
      isMobile = false,
      scrollTopPosition,
      browserYou,
      swiper4,
      swiper5,
      calendar;
  var genFunc = {

    initialized: false,

    initialize: function() {

      if (this.initialized) return;

      this.initialized = true;

      this.build();
    },

    build: function() {
      // preloader
      this.pagePreloader();
      // browser
      browserYou = this.getBrowser();
      if (browserYou.platform == 'mobile') { isMobile = true;document.documentElement.classList.add('mobile')}else {document.documentElement.classList.add('desktop')}
      if ((browserYou.browser == 'ie')) {document.documentElement.classList.add('ie');}
      if ((browserYou.browser == 'ie' &&  browserYou.versionShort < 9) || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < 18) || (browserYou.browser == 'firefox' &&  browserYou.versionShort < 30)) {
          alert('Обновите браузер')
      }
      // materialPlagin
      this.materialPlagins();
      // map
      if(document.getElementById('map') !== null) {
        this.mapFunction();
      }
      // swiper
      this.swiperSliders();
      // validate
      this.validateForm();
      //appear
      this.appearFunction();
      //copyright
      this.copyright();
    },
    copyright: function(){
      var yearBlock = document.querySelector('.yearN'), 
          yearNow = new Date().getFullYear().toString();
      if (yearNow.length) {
        yearBlock.innerText = yearNow
      }
    },
    getBrowser: function() {
      var ua = navigator.userAgent;
      var bName = function () {
          if (ua.search(/Edge/) > -1) return "edge";
          if (ua.search(/MSIE/) > -1) return "ie";
          if (ua.search(/Trident/) > -1) return "ie11";
          if (ua.search(/Firefox/) > -1) return "firefox";
          if (ua.search(/Opera/) > -1) return "opera";
          if (ua.search(/OPR/) > -1) return "operaWebkit";
          if (ua.search(/YaBrowser/) > -1) return "yabrowser";
          if (ua.search(/Chrome/) > -1) return "chrome";
          if (ua.search(/Safari/) > -1) return "safari";
          if (ua.search(/maxHhon/) > -1) return "maxHhon";
      }();
                                                                                                                                                                        
      var version;
      switch (bName) {
          case "edge":
              version = (ua.split("Edge")[1]).split("/")[1];
              break;
          case "ie":
              version = (ua.split("MSIE ")[1]).split(";")[0];
              break;
          case "ie11":
              bName = "ie";
              version = (ua.split("; rv:")[1]).split(")")[0];
              break;
          case "firefox":
              version = ua.split("Firefox/")[1];
              break;
          case "opera":
              version = ua.split("Version/")[1];
              break;
          case "operaWebkit":
              bName = "opera";
              version = ua.split("OPR/")[1];
              break;
          case "yabrowser":
              version = (ua.split("YaBrowser/")[1]).split(" ")[0];
              break;
          case "chrome":
              version = (ua.split("Chrome/")[1]).split(" ")[0];
              break;
          case "safari":
              version = ua.split("Safari/")[1].split("")[0];
              break;
          case "maxHhon":
              version = ua.split("maxHhon/")[1];
              break;
      }
      var platform = 'desktop';
      if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
      var browsrObj;
      try {
          browsrObj = {
              platform: platform,
              browser: bName,
              versionFull: version,
              versionShort: version.split(".")[0]
          };
      } catch (err) {
          browsrObj = {
              platform: platform,
              browser: 'unknown',
              versionFull: 'unknown',
              versionShort: 'unknown'
          };
      }
      return browsrObj;
    },
    swiperSliders: function(){
      var swiper = new Swiper('.first-section-slider .swiper-container', {
          loop:true,
          autoplay: 2000,
          speed: 1500,
          //parallax:true,
          slidesPerView: 1
      });
    },
    pagePreloader: function() {
      window.addEventListener('load',function(){
        setTimeout(function(){body.classList.add('loaded')},500);
        setTimeout(function(){document.querySelector('.preloader').style.display = 'none';},1200);
      })
    },
    validateForm : function(){
      $('#email').on('focus',function(){
        $('.feed-section').find('.input-field').slideDown()
        $('.feed-section').find('button').slideDown()
      });
      $('.js_validate button[type="submit"]').on("click", function(){
        return validate($(this).parent(".js_validate"));
      }); 
      function validate(form) {
        var error_class = "error";
        var norma_class = "pass";
        var item        = form.find("[required]");
        var e           = 0;
        var reg         = undefined;
        var pass        = form.find('.password').val();
        var pass_1      = form.find('.password_1').val();
        var email       = false;
        var password    = false;
        var phone       = false;
        function mark (object, expression) {
            if (expression) {
                object.parents('.required-field').addClass(error_class).removeClass(norma_class);
                e++;
            } else
                object.parents('.required-field').addClass(norma_class).removeClass(error_class);
        }
        form.find("[required]").each(function(){
            switch($(this).attr("data-validate")) {
                case undefined:
                    mark ($(this), $.trim($(this).val()).length === 0);
                break;
                case "email":
                    email = true;
                    reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    mark ($(this), !reg.test($.trim($(this).val())));
                    email = false;
                break;
                case "phone":
                    phone = true;
                    reg = /[0-9 -()+]{10}$/;
                    mark ($(this), !reg.test($.trim($(this).val())));
                    phone = false;
                break;
                case "pass":
                    password = true;
                    reg = /^[a-zA-Z0-9_-]{6,}$/;
                    mark ($(this), !reg.test($.trim($(this).val())));
                    password = false;
                break;
                case "pass1":
                    mark ($(this), (pass_1 !== pass || $.trim($(this).val()).length === 0));
                break;
                default:
                    reg = new RegExp($(this).attr("data-validate"), "g");
                    mark ($(this), !reg.test($.trim($(this).val())));
                break;
            }
        })
        $('.js_valid_radio').each(function(){
            var inp = $(this).find('input.required');
            var rezalt = 0;
            for (var i = 0; i < inp.length; i++) {
                if ($(inp[i]).is(':checked') === true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
               $(this).addClass(error_class).removeClass(norma_class);
                e=1;
            } else {
                $(this).addClass(norma_class).removeClass(error_class);
            }
        })
        if (e === 0) {
         return true;
        }
        else {
            form.find("."+error_class+" input:first").focus();
            return false;
        }
      }
    },
    materialPlagins: function() {
      $('.header .btn').on('click',function(){
        $('body,animate').animate({
          scrollTop: $('.sixth-section').offset().top
        },700)
        return false;
      });
      $('.dropdown-button').dropdown();
      $('select').not('.my_select_box').material_select();
      $('.collapsible').collapsible();
      /*if(isMobile === false) {
        $('.parallax').parallax();
      }*/
      
      $('.modal').modal({opacity: 1});
    },
    appearFunction: function() {
      if(isMobile == false) {
        $('.animated').appear(function() {
          var elem = $(this);
          var animation = elem.data('animation');
          if (!elem.hasClass('visible')) {
            var animationDelay = elem.data('animation-delay');
            if (animationDelay) {
              setTimeout(function() {
                  elem.addClass(animation + " visible");
              }, animationDelay);
            } else {
              elem.addClass(animation + " visible");
            }
          }
        },{accX: 0, accY: -500});
      } else {
        $('.animated').each(function(){
          var animation = $(this).data('animation');
          $(this).addClass(animation + " visible");                                                                                                                                                                
        });
      }
    },
  };

  genFunc.initialize();
  //resize document
  window.addEventListener('scroll',function(){
    scrollTopPosition = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  });
  window.onload = function(){
    heightBlock('.js-height_1');
    heightBlock('.js-height_2');
  };
  window.addEventListener('resize',function(){
    heightBlock('.js-height_1');
    heightBlock('.js-height_2');
  });
  function heightBlock(ell){
    var elem = document.querySelectorAll(ell);
    var maxH = 0;
    for (var i = 0; i < elem.length; ++i) {
      elem[i].style.height = "";
      elem[i].removeAttribute("style");
      if (maxH < elem[i].offsetHeight) {
        maxH = elem[i].offsetHeight; 
      }
      
      elem[i].style.height = maxH + "px";
    }
    for (var i = 0; i < elem.length; ++i) {
      elem[i].style.height = maxH + "px";
    }
    
  }
})();
