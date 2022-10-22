(function(e) {
  e(document).ready(function() {
    initHeaderSticky()
  });
  e(window).resize(function() {
    initHeaderSticky()
  });
  e(window).scroll(function() {
    initHeaderSticky()
  });

  function initHeaderSticky() {
    if (jQuery(document).height() > jQuery(window).height()) {
      if (jQuery(window).width() >= 1200) {
        if (jQuery('.header_1 .main-header,.header_2 .main-header,.header_3 .main-header').hasClass("sticky_header")) {
          if (jQuery(this).scrollTop() > 400) {            
            jQuery('.header_1 .main-header,.header_2 .main-header,.header_3 .main-header').addClass("fixed");
          } else {           
            jQuery('.header_1 .main-header, .header_2 .main-header,.header_3 .main-header').removeClass("fixed");
          }
        } else {
          jQuery('.header_1 .main-header,.header_2 .main-header,.header_3 .main-header').removeClass("fixed");
        }
      } else {        
        jQuery('.header_1 .main-header,.header_2 .main-header,.header_3 .main-header').removeClass("fixed");
      }
    }
  }
  var cookieName = "ttwishlistList";

  e(document).ready(function() {
    t.init()
    t.closeQuickViewPopup();
    e(".quick-view .content").removeAttr( "id" );
  });
  e(document).on("click", function(n) {
    var r = e(".quick-view");
    var i = e("#slidedown-cart");
    var s = e(".site-header_cart_link");
    var o = e("#email-modal .modal-window");
    e(".quick-view .overlay, .close-window").on("click", function() {
      if (!r.is(n.target) && r.has(n.target) && !i.is(n.target) && !i.is(n.target) && i.has(n.target).length === 0 && !s.is(n.target) && s.has(n.target).length === 0 && !o.is(n.target) && o.has(n.target).length === 0) {
        t.closeQuickViewPopup();
        e(".content").removeAttr( "id" );
      }
    });
    if (!r.is(n.target) && r.has(n.target).length === 0 && !i.is(n.target) && i.has(n.target).length === 0 && !s.is(n.target) && s.has(n.target).length === 0 && !o.is(n.target) && o.has(n.target).length === 0) {
      t.closeDropdownCart();
      t.closeEmailModalWindow()
    }
  })
  var t = {
    KidsTimeout: null,
    isSidebarAjaxClick: !1,
    init: function() {
      this.initQuickView();
      this.initAddToCart();
      this.initAddToCarts();
      this.initModal();
      this.initShortcode();
      this.productAccordion();
      this.producteffect();
      this.productStyle();
      this.productCompact();
      this.initProductAddToCart();
      this.initDropDownCart();
      this.initWishlist();
      this.initcompare(); 
      this.initProductMoreview();
      this.initSidebar();
      this.initColorSwatchGrid();
      this.initInfiniteScrolling();
      this.FacetFiltersForm()
    },
    initColorSwatchGrid: function() {
      jQuery('.item-swatch li label,.product-size li label').click(function(){                   
        var newImage = jQuery(this).parent().find('.hidden img').attr('src');
        jQuery(this).closest('ul').find('.active').removeClass('active');
        jQuery(this).parent().addClass('active');
        jQuery(this).closest('.product-wrapper').find('.featured-image').attr({ src: newImage }); 
        return false;
      });

      jQuery('.item-swatch li label,.product-size li label').on('click', function(e){
        e.preventDefault();    
        jQuery(this).closest('ul').find('.active').removeClass('active');
        jQuery(this).parent().addClass('active');
        var productImage = jQuery(this).parents('.product-wrapper').find('.product-t'); 
        productImage.find('img.featured-image').attr('src', jQuery(this).data('image'));  
      });
    },
    initWishlist: function() {
      t.updateWishlistButtons()
      t.initWishlistButtons()
    },
    initWishlistButtons: function() {
      if (e(".add-in-wishlist-js").length == 0) {
        return !1
      }
      e(".add-in-wishlist-js").each(function() {
        e(this).unbind();
        e(this).click(function(event) {
          event.preventDefault();
          try {
            var id = e(this).attr('href');
            if (e.cookie(cookieName) == null) {
              var str = id
              } else {
                if (e.cookie(cookieName).indexOf(id) == -1) {
                  var str = e.cookie(cookieName) + '__' + id
                  console.log(str);
                }
              }
            e.cookie(cookieName, str, {
              expires: 14,
              path: '/'
            });
            jQuery('.default-wishbutton-' + id).find('i').addClass('mdi-spin mdi-refresh').removeClass('mdi-heart-outline');
            if (e(this).closest('.product-information').length > 0) {
              setTimeout(function() {
                jQuery('.loadding-wishbutton-' + id).remove();
                jQuery('.added-wishbutton-' + id).show();
                jQuery('.default-wishbutton-' + id).remove()
              }, 2000)
            } else {
              jQuery('.loadding-wishbutton-' + id).show();
              jQuery('.default-wishbutton-' + id).remove();
              setTimeout(function() {
                jQuery('.loadding-wishbutton-' + id).remove();
                jQuery('.added-wishbutton-' + id).show()
              }, 2000)
            }
            e(this).unbind()
          } catch (err) {}
        })
      })
    },
    updateWishlistButtons: function() {
      try {
        if (e.cookie(cookieName) != null && e.cookie(cookieName) != '__' && e.cookie(cookieName) != '') {
          var str = String(e.cookie(cookieName)).split("__");
          for (var i = 0; i < str.length; i++) {
            if (str[i] != '') {
              jQuery('.added-wishbutton-' + str[i]).show();
              jQuery('.default-wishbutton-' + str[i]).remove();
              jQuery('.loadding-wishbutton-' + str[i]).remove()
            }
          }
        }
      } catch (err) {}
    },      
    initcompare: function() {
      t.initcompareButtons();  
    },
    initcompareButtons: function() {
      var compareButtonClass = '.add-in-compare-js',
          compareRemoveButtonClass = '.js-remove-compare',
          $compareCount = e('.compare-count'),
          $comparemsg = e('.max_compare'),
          compareObject = JSON.parse(localStorage.getItem('localCompare')) || [];

      function updateCompare(self) {
        var productHandle = e(self).data('comparehandle'),
            alertText = '';
        var isAdded = e.inArray(productHandle,compareObject) !== -1 ? true:false;
        if (isAdded) {
          compareObject.splice(compareObject.indexOf(productHandle), 1);
          alertText = "Item removed to the comparison list!";
          jQuery('#modalCompare1').modal();
          $comparemsg.text(alertText);
        }else{
          if (compareObject.length === 3){
            alertText = "Maximum products to compare. Limit is 3!";
            //alertClass = 'error';
            jQuery('#modalCompare1').modal();
            $comparemsg.text(alertText);
          }else{
            //alertClass = 'notice';
            compareObject.push(productHandle);
            alertText = "Item added to the comparison list!";
            jQuery('#modalCompare1').modal();
            $comparemsg.text(alertText);
          }
        }
        localStorage.setItem('localCompare', JSON.stringify(compareObject)); 
        $compareCount.text(compareObject.length);
      };

      function loadCompare(){
        //button text
        e(compareButtonClass).each(function(){
          var productHandle = e(this).data('comparehandle');
          var status = e.inArray(productHandle,compareObject) !== -1 ? 'added' : '';
          e(this).removeClass('added').addClass(status);
        });

        //count items
        $compareCount.text(compareObject.length);
      }
      e(document).on('click',compareButtonClass,function (event) {
        event.preventDefault();
        updateCompare(this);
        loadCompare();
      });
      e(document).on('click',compareRemoveButtonClass,function(){
        var productHandle = $(this).data('comparehandle');
        compareObject.splice(compareObject.indexOf(productHandle), 1);
        localStorage.setItem('localCompare', JSON.stringify(compareObject)); 
        loadCompare();
      });

      loadCompare();

    },
    productCompact: function() {
      if ($(".product-design-compact .tt-scroll").length > 0) {
        $(".product-design-compact .tt-scroll").nanoScroller({
          paneClass: 'tt-scroll-pane',
          sliderClass: 'tt-scroll-slider',
          contentClass: 'tt-scroll-content',
          preventPageScrolling: !1
        })
      }
    },
    initShortcode: function() {
      e('.tt-toggle').toggle(function() {
        e(this).addClass('active')
      }, function() {
        e(this).removeClass('active')
      });
      e('.tt-toggle').click(function() {
        e(this).next('.tt-toggle-content').slideToggle()
      });
      e('.tt-toggle-frame-set').each(function() {
        var $this = e(this),
            $toggle = $this.find('.tt-toggle-accordion');
        $toggle.click(function() {
          if (e(this).next().is(':hidden')) {
            $this.find('.tt-toggle-accordion').removeClass('active').next().slideUp();
            e(this).toggleClass('active').next().slideDown()
          }
          return !1
        });
        $this.find('.tt-toggle-accordion:first').addClass("active");
        $this.find('.tt-toggle-accordion:first').next().slideDown()
      })
    },
    productAccordion: function() {
      var $accordion = $('.tabs-layout-accordion');
      var time = 300;
      var hash = window.location.hash;
      var url = window.location.href;
      if (hash.toLowerCase().indexOf('comment-') >= 0 || hash === '#reviews' || hash === '#tab-reviews') {
        $accordion.find('.tab-title-reviews').addClass('active')
      } else if (url.indexOf('comment-page-') > 0 || url.indexOf('cpage=') > 0) {
        $accordion.find('.tab-title-reviews').addClass('active')
      } else {
        $accordion.find('.tt-accordion-title').first().addClass('active');
        $accordion.find('.tt-Tabs-panel').first().addClass('active')
      }
      $accordion.on('click', '.tt-accordion-title', function(e) {
        e.preventDefault();
        var $this = $(this),
            $panel = $this.siblings('.tt-Tabs-panel');
        if ($this.hasClass('active')) {
          $this.removeClass('active');
          $panel.stop().slideUp(time)
        } else {
          $accordion.find('.tt-accordion-title').removeClass('active');
          $accordion.find('.tt-Tabs-panel').slideUp();
          $this.addClass('active');
          $panel.stop().slideDown(time)
        }
        $(window).resize();
        setTimeout(function() {
          $(window).resize()
        }, time)
      })
    },
    producteffect: function() {
      $('.product-wrapper.product_container').on('mouseover', function() {
        var effect = e(this).parents(".product-layouts.item-row");
        var p = effect.data("id");
        p = p.match(/\d+/g);
        var productload = e("#product-" + p + ".grid-view-item .product-wrapper");
        //console.log(productload);
        if (!productload.hasClass('imgloaded')) {
          productload.addClass('loading'); 
          setTimeout(function(){
            productload.removeClass('loading'); 
          }, 1000);
        }
        productload.addClass('imgloaded')
      });
    },
    productStyle: function() {
      e('.design_2 .product-wrapper-owlslider .product-block .pro_img').each(function() {
        var img = e(this);
        var I1 = img.data("image-id");
        e('.design_2 .additinal-product .product-block .pro_img').on('click', function() {
          var images = e(this);
          var I = images.data("image-id");
          if (I == I1) {
            img.siblings().removeClass("active").removeClass("variant-active");
            img.toggleClass("active");
            $('html, body').animate({
              scrollTop: e(img).offset().top
            }, 2000 );
          }
        });       
      });

      e('.design_2 select.single-option-selector').change(function(e) {
        var selectedItem = [];
        $('.design_2 select.single-option-selector').each(function() {
          selectedItem.push($(this).val());
        });
        if (selectedItem.length > 0) {
          var current_variant = selectedItem.join(" / ");
        } 
        $('select.product-form__variants option').each(function() {
          e.preventDefault();
          var variant_title = $(this).html().trim();
          if(variant_title.search(current_variant) == 0) {
            var image = $(this).data('variant-image');

            $('.design_2 .product-wrapper-owlslider .product-block .pro_img').each(function() {
              e.preventDefault();
              var img = $(this);
              var slide_img = $(this).data('src');
              if (slide_img == image) {
                img.siblings().removeClass("variant-active").removeClass("active");
                img.toggleClass("variant-active");
                $('html, body').animate({
                  scrollTop: $(img).offset().top
                }, 2000 );
              }
            });
          }
        });
      }); 
    },
    initProductMoreview: function() {

      e('body .home-slider .type_slide .slides').slick({
        slidesToShow: 1,
        autoplay:false,
        speed: 800,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite:false
      }); 
      e('body .home-slider .type_fade .slides').slick({
        fade: true,
        slidesToShow: 1,
        speed: 800,
        autoplay:false,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite:false
      });

      e('.design_1 .product-wrapper-owlslider .product-single__thumbs.horizontal_bottom , .design_3 .product-wrapper-owlslider .product-single__thumbs.horizontal_bottom').slick({
        autoplay: !1,
        autoplaySpeed: 1500,
        arrows: !0,
        prevArrow: '<button type="button btn" class="slick-prev"><i class="mdi mdi-chevron-left"></i></button>',
        nextArrow: '<button type="button btn" class="slick-next"><i class="mdi mdi-chevron-right"></i></button>',
        centerMode: !1,
        infinite: !1,
        slidesToShow: window.number_of_thumb,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },{
          breakpoint: 380,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }]
      });
      e('body.rtl .design_1 .product-wrapper-owlslider .thumbnails-wrapper .product-single__thumbs.horizontal_bottom,body.rtl .design_3 .product-wrapper-owlslider .thumbnails-wrapper .product-single__thumbs.horizontal_bottom').slick({
        autoplay: !1,
        autoplaySpeed: 1500,
        arrows: !0,
        rtl: !0,
        prevArrow: '<button type="button btn" class="slick-prev"><i class="mdi mdi-chevron-left"></i></button>',
        nextArrow: '<button type="button btn" class="slick-next"><i class="mdi mdi-chevron-right"></i></button>',
        centerMode: !1,
        slidesToShow: window.number_of_thumb,
        slidesToScroll: 1,
        infinite: !1,
        responsive: [{
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },{
          breakpoint: 380,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }]
      });
      e('.design_1 .product-wrapper-owlslider .product-single__thumbs.vertical_left,.design_1 .product-wrapper-owlslider .product-single__thumbs.vertical_right').slick({
        autoplay: !1,
        autoplaySpeed: 1500,
        arrows: !0,
        prevArrow: '<button type="button btn" class="slick-prev"><i class="mdi mdi-chevron-left"></i></button>',
        nextArrow: '<button type="button btn" class="slick-next"><i class="mdi mdi-chevron-right"></i></button>',
        centerMode: !0,
        vertical: !0,
        slidesToShow: window.number_of_thumb,
        slidesToScroll: 1,
        infinite: !1,
        responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 481,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }]
      })
    },
    showModal: function(n) {
      e(n).fadeIn(500);
      t.KidsTimeout = setTimeout(function() {
        e(n).fadeOut(500)
      }, 5e3)
    },
    showModalCart: function(n) {
      e(n).fadeIn(500)
    },
    checkItemsInDropdownCart: function() {
      if (e("#slidedown-cart .mini-products-list").children().length > 0) {
        e("#slidedown-cart .no-items").hide();
        e("#slidedown-cart .has-items").show()
      } else {
        e("#slidedown-cart .has-items").hide();
        e("#slidedown-cart .no-items").show()
      }
    },
    initModal: function() {
      e(".continue-shopping").click(function() {
        clearTimeout(t.KidsTimeout);
        e('.ajax-success-modal.cart-popup-wrapper').removeClass('open');
        e(".ajax-success-modal").fadeOut(500);
      });
      e(".close-modal,.modal .overlay").click(function() {
        clearTimeout(t.KidsTimeout);
        e('.ajax-success-modal.cart-popup-wrapper').removeClass('open');
        e(".ajax-success-modal").fadeOut(500);

        e(".ajax-error-modal").fadeOut(500);
        jQuery('body').removeClass('cart-open');
      })
    },
    initDropDownCart: function() {
      e(".site-header .site-header_cart_link").on('click', function(event) {
        jQuery(this).toggleClass('active'); 
        jQuery('.page-wrapper').removeClass('ttsearch-fixed');
        e('.ttsearch_button').removeClass('active');
        jQuery('.site-header__search:not(.search-full) .serach_icon').removeClass('active');        
        if(jQuery( window ).width() < 992) {   
          jQuery( ".header_1 .search_wrapper,.header_2 .search_wrapper" ).slideUp( "fast" );
        }
        e(".myaccount  .dropdown-toggle").removeClass("open");
        e(".myaccount  .customer_account").slideUp("fast");
        jQuery('body').removeClass('search_toggle');
        jQuery('body').removeClass('account-toggle');
        jQuery( ".header_language .disclosure-list" ).slideUp( "fast" );   
        jQuery( ".currencies.flag-dropdown-menu" ).slideUp( "fast" ); 
        jQuery('.currency_wrapper').removeClass('active');
        jQuery('.disclosure__toggle').removeClass('active');
      })
      e(".site-header_cart_link").on('click',function(event) {
        event.preventDefault();
        e(this).toggleClass("active");
        e('#slidedown-cart').toggleClass("active");
        e('.fixed-cart-wrap').toggleClass("active");
        e('body').toggleClass('cart_toggle')
      })
      e(".fixed-cart-wrap ,.cart-close").on('click',function(event) {
        e('#slidedown-cart,.site-header_cart_link').removeClass("active");
        e('.fixed-cart-wrap').removeClass("active"); 
        e('body').removeClass('cart_toggle')
      }); 
      e("#slidedown-cart").on('click',function(event) {
        event.stopPropagation();
      }); 
      t.checkItemsInDropdownCart();
      e("#slidedown-cart .no-items a").click(function() {
        e("#slidedown-cart").slideUp("fast")
      });
      e("#slidedown-cart .btn-remove").click(function(n) {
        n.preventDefault();
        var r = e(this).parents(".item").attr("id");
        r = r.match(/\d+/g);
        Shopify.removeItem(r, function(e) {
          t.doUpdateDropdownCart(e)
        })
      })
      e("#Sticky-slidedown-cart .no-items a").click(function() {
        e("#Sticky-slidedown-cart").slideUp("fast")
      });
      e("#Sticky-slidedown-cart .btn-remove").click(function(n) {
        n.preventDefault();
        var r = e(this).parents(".item").attr("id");
        r = r.match(/\d+/g);
        Shopify.removeItem(r, function(e) {
          t.doUpdateDropdownCart(e)
        })
      })
    },
    closeDropdownCart: function() {
      if (e(".site-header:not(.header_2) #Sticky-slidedown-cart").is(":visible")) {
        e(".site-header:not(.header_2) #Sticky-slidedown-cart").slideUp("fast")
      }
    },
    initProductAddToCart: function() {
      jQuery("#AddToCart1").click(function(n){
        n.preventDefault();
        jQuery(".template-product #AddToCart").click();
      });
      if (e("#AddToCart").length > 0) {
        e("#AddToCart").click(function(n) {
          n.preventDefault();
          jQuery('body').addClass('cart-open');
          if (e(this).attr("disabled") != "disabled") {
            var r = e(this).parents(".product-block");
            var i = e(r).data("id");
            console.log(i);
            i = i.match(/\d+/g);
            console.log(i);
            if (!window.ajax_cart) {
              e("form.product-form-" + i).submit()
            } else {
              var r = e(".product-form-" + i + " select[name=id]").val();
              if (!r) {
                r = e(".product-form-" + i + " input[name=id]").val();
                console.log(r);
              }
              var i = e(".product-form-" + i + " input[name=quantity]").val();
              if (!i) {
                i = 1
              }
              if (jQuery('body').hasClass('product_sticky_design_1')) {
                var o = e(".design_1 .product__media #productPhotoImg").attr("src");
              } 
              else if (jQuery('body').hasClass('product_sticky_design_2')) {
                var o = e(".design_2 .product-wrapper-owlslider .product-block .product-single__media-wrapper:first-child .pro_img .product-single__thumb #productPhotoImg").attr("src");
              } 
              else if (jQuery('body').hasClass('product_sticky_design_3')) {
                var o = e(".design_3 .product__media #productPhotoImg").attr("src");
              }
              console.log(o);
              var p = e(".product-single__title").text();
              var amt = e(".product-single__price .price.price--on-sale .sale-price").html();
              var amt1 = e(".product-single__price .price:not(.price--on-sale) .regular-price").html();
              t.doAjaxAddToCart(r, i, o, p, amt, amt1)
            }
          }
          return !1
        })
      }
    },
    initAddToCarts: function() {
      if (e(".add-cart-btns").length > 0) {
        e(".add-cart-btns").click(function(n) {
          n.preventDefault();
          jQuery('body').addClass('cart-open');
          if (e(this).attr("disabled") != "disabled") {
            var r = e(this).parents(".item-row");
            var i = e(r).attr("id");
            i = i.match(/\d+/g);
            if (!window.ajax_cart) {
              e("form.cart-form-" + i).submit()
            } else {
              var s = e(".cart-form-" + i + " select[name=id]").val();
              if (!s) {
                s = e(".cart-form-" + i + " input[name=id]").val()
              }
              var o = e(".cart-form-" + i + " select[name=quantity]").val();
              if (!o) {
                o = 1
              }
              var a = e(r).find(".featured-image").attr("src");
              var p = e(r).find(".grid-link__title").text();
              var amt = e(r).find(".grid-view-item__meta").html();
              t.doAjaxAddToCart(s, o, a, p, amt)
            }
          }
          return !1
        })
      }
    },
    initAddToCart: function() {
      if (e(".add-cart-btn").length > 0) {
        e(".add-cart-btn").click(function(n) {
          n.preventDefault();
          jQuery('body').addClass('cart-open');
          var c = e(this).parents(".contents");
          var d = e(c).data("id");
          if(d){
            d = d;
          }
          var list = e(this).parents(".product-list .product-layouts");
          var list_id =  e(list).data('col');
          if(list_id){
            list_id = list_id;
          }
          var slist = e(this).parents(".product-short-list .product-layouts");
          var slist_id =  e(slist).data('col');
          if(slist_id){
            slist_id = slist_id;
          }
          var grid = e(this).parents(".product-grid.grid-item .product-layouts");
          var grid_id =  e(grid).data('col');
          if(grid_id){
            grid_id = grid_id;
          }
          var specila_pro = e(this).parents(".slider-specialproduct .product-layouts");
          var special_pro_id =  e(specila_pro).data('id');
          if(special_pro_id){
            special_pro_id = special_pro_id;
          }
          if (e(this).attr("disabled") != "disabled") {
            var r = e(this).parents(".item-row");
            var i = e(r).data('col');
            i = i;
            if (!window.ajax_cart) {
              e("form.cart-form-" + i).submit()
            } else {
              var s = e(".cart-form-" + i + " select[name=id]").val();                          
              if (!s) {
                s = e(".cart-form-" + i + " input[name=id]").val();
              }                          
              if(d){
                var o = e("#"+d + ".contents.tab-pane .cart-form-" + i + " input[name=quantity]").val();
              }
              else if(list_id){
                var o = e(".product-list .product-"+ list_id +" .cart-form-" + i + " input[name=quantity]").val();
              }
              else if(slist_id){
                var o = e(".product-short-list .product-"+ slist_id +" .cart-form-" + i + " input[name=quantity]").val();
              }
              else if(grid_id){
                var o = e(".product-grid .product-"+ grid_id +" .cart-form-" + i + " input[name=quantity]").val();
              }
              else if(special_pro_id){
                var o = e(".slider-specialproduct #"+ special_pro_id +" .product-wrapper .cart-form-" + i + " input[name=quantity]").val();
              }
              else {
                var o = e(".product-wrapper .cart-form-" + i + " input[name=quantity]").val();
              }
              if (!o) {
                o = 1;
              }
              var a = e(r).find(".featured-image").attr("src");
              var p = e(r).find(".grid-link__title").text();
              var amt = e(r).find(".grid-view-item__meta").html();  

              t.doAjaxAddToCart(s, o, a, p, amt)
            }
          }
          return false
        })
      }
    },
    showLoading: function() {
      e(".loading-modal").show()
    },
    hideLoading: function() {
      e(".loading-modal").hide()
    },
    doAjaxAddToCart: function(n, r, a, p, amt, amt1) {
      e.ajax({
        type: "post",
        url: "/cart/add.js",
        data: "quantity=" + r + "&id=" + n,
        dataType: "json",
        beforeSend: function() {
          t.showLoading()
        },
        success: function(n) {
          console.log(n);
          t.hideLoading();
          t.showModalCart(".ajax-success-modal");
          e('.ajax-success-modal.cart-popup-wrapper').addClass('open'); 
          e(".ajax-success-modal").find(".ajax-product-image").attr("src", a);
          e(".ajax-success-modal").find(".added-to-wishlist").hide();
          e(".ajax-success-modal").find(".added-to-cart").show();
          e(".ajax-success-modal").find(".ajax-product-title").text(p);
          e(".ajax-success-modal").find(".ajax_price").html(amt);
          e(".ajax-success-modal").find(".ajax_price").html(amt1);
          e(".ajax-success-modal .total_itmes .popup-qty").text(r);  
          t.updateDropdownCart()
        },
        error: function(n, r) {
          t.hideLoading();
          e(".ajax-error-message").text(e.parseJSON(n.responseText).description);
          t.showModalCart(".ajax-error-modal")
        }
      })
    },
    initQuickView: function() {
      var C = jQuery(".quick-view .product-shop .product-item").attr("data-id");          
      jQuery("#product-actions-" + C).find(".actions .add-to-cart-btn").prepend( jQuery("<i class='mdi mdi-plus'></i>"));
      e(".quick-view-text").click(function() {
        //t.showLoading();
        e('.quick-view').addClass('open-in');
        var product = e(this).data("id");
        Shopify.getProduct(product, function(product) {
          console.log(product);
          var quickShopModalBackground = jQuery('.quick-view .quick-shop-modal-bg');

          if(e('.quick-view').hasClass('open-in')){
            quickShopModalBackground.show();
            setTimeout(function() {
              jQuery(".quick-view .quick-shop-modal-bg").hide()
            }, 2000)
          }
          var r = e("#quickview-template").html();
          e(".quick-view").html(r);
          var i = e(".quick-view");
          t.loadQuickViewSlider(product, i);
          var s = product.description;
          s = s.split(" ").splice(0, 40).join(" ") + "...";

          i.find(".product-description").html(s);
          i.find(".price").html(Shopify.formatMoney(product.price, window.money_format));
          i.find(".money").html(Shopify.formatMoney(product.price, window.money_format));
          i.find(".product-item").attr("id", "product-" + product.id);
          i.find(".product-item").attr("data-id", product.id);
          i.find(".content").attr("id", "product-" + product.id).css( 'display', 'block' );
          i.find(".variants").attr("id", "product-actions-" + product.id);
          i.find(".variants select").attr("id", "product-select-" + product.id);
          var s = product.description;
          s = s.split(" ").splice(0, 40).join(" ") + "...";
          i.find(".product-title a").text(product.title);
          i.find(".product-title a").attr("href", product.url);
          if (i.find('.product-inventory span').length > 0) {
            var variant = product.variants[0];
            var inventoryInfo = i.find('.product-inventory span');
            if (variant.available) {
              inventoryInfo.text(window.in_stock);
              inventoryInfo.removeClass("out_of_stock")
              inventoryInfo.addClass("in_stock");
              jQuery(".quick-view .qty-box-set").css( 'display', 'inline-block' );

            } else {
              inventoryInfo.text(window.out_of_stock);
              inventoryInfo.removeClass("in_stock")
              inventoryInfo.addClass("out_of_stock");
              jQuery(".quick-view .qty-box-set").css( 'display', 'none' );
            }
          }
          if (product.compare_at_price > product.price) {
            i.find(".compare-price").html(Shopify.formatMoney(product.compare_at_price_max, window.money_format)).show();
            i.find(".price").addClass("on-sale")
          } else {
            i.find(".compare-price").html("");
            i.find(".price").removeClass("on-sale")
          }
          if (!product.available) {
            i.find("select, input, .total-price, .dec, .inc, .variants label").remove();
            i.find(".add-to-cart-btn").text("Unavailable").addClass("disabled").attr("disabled", "disabled");
            var C = jQuery(".quick-view .product-shop .product-item").attr("data-id");          
            jQuery("#product-actions-" + C).find(".actions .add-to-cart-btn").prepend( jQuery("<i class='mdi mdi-cart-outline'></i>"));
          } else {
            i.find(".total-price .price").html(Shopify.formatMoney(product.price, window.money_format));
            t.createQuickViewVariants(product, i)
          }
          $('.quick-view .qtyplus').on('click', function(e) {
            e.preventDefault();
            var input_val = jQuery(this).parents('.qty-box-set').find('.quantity');
            var currentVal = parseInt(jQuery(this).parents('.qty-box-set').find('.quantity').val());
            if (!isNaN(currentVal)) {
              jQuery(this).parents('.qty-box-set').find('.quantity').val(currentVal + 1)
            } else {
              jQuery(this).parents('.qty-box-set').find('.quantity').val(1)
            }
          });
          $(".quick-view .qtyminus").on('click', function(e) {
            e.preventDefault();
            var input_val = jQuery(this).parents('.qty-box-set').find('.quantity');
            var currentVal = parseInt(jQuery(this).parents('.qty-box-set').find('.quantity').val());
            if (!isNaN(currentVal) && currentVal > 1) {
              jQuery(this).closest('.qty-box-set').find('.quantity').val(currentVal - 1)
            } else {
              jQuery(this).closest('.qty-box-set').find('.quantity').val(1)
            }
          });
          t.initQuickviewAddToCart();
          t.hideLoading();
          //e(".quick-view").fadeIn(500)
        });
        return !1
      });
      e(".quick-view .overlay, .close-window").on("click", function() {
        t.closeQuickViewPopup();
        e('.quick-view').removeClass("open-in");
        e('.quick-view').removeClass("option-loader");
        e(".quick-view .content").removeAttr( "id" ).css( 'display', 'none' );
        return !1
      })
    },
    initQuickviewAddToCart: function() {     
      if (e(".quick-view .add-to-cart-btn").length > 0) {
        e(".quick-view .add-to-cart-btn").click(function(event) {
          event.preventDefault();
          if (e(this).attr("disabled") != "disabled") {
            var r = e(this).parents(".content");
            var q = e(r).attr("id");
            console.log(q);
            q = q.match(/\d+/g);
            if (!window.ajax_cart) {
              e("form#product-actions-" + q ).submit()
            } else {
              var n = e(".quick-view select[name=id]").val();
              if (!n) {
                n = e(".quick-view input[name=id]").val()
              }
              var r = e(".quick-view input[name=quantity]").val();
              if (!r) {
                r = 1
              }
              var p = e('.quick-view .product-title a').html();
              var a = e(".quick-view .more-view-wrapper img").attr("src");                 
              var amt = e(".quick-view .product-price__price").html(); 
              t.doAjaxAddToCart(n, r, a, p, amt);
              t.closeQuickViewPopup();
              e(".quick-view .content").removeAttr( "id" ).css( 'display', 'none' );
              e('.quick-view').removeClass("open-in");
              e('.quick-view').removeClass("option-loader");
            }
          }
          return false
        })
      }     
    },
    updateDropdownCart: function() {
      Shopify.getCart(function(e) {
        t.doUpdateDropdownCart(e)
      })
    },
      doUpdateDropdownCart: function(n) {
      console.log(n);
      var r = '<li class="item" id="cart-item-{ID}"><a href="{URL}" title="{PRODUCT_TITLE}" class="product-image"><img src="{IMAGE}" alt="{PRODUCT_TITLE}"></a><div class="product-details"><p class="product-name"><a href="{URL}">{PRODUCT_TITLE}</a></p><div class="variants">{VARIANT_TITLE}</div><div class="cart-collateral"><span class="price">{PRICE}</span> x {QUANTITY}</div></div><a href="javascript:void(0)" title="Remove This Item" class="btn-remove"><span class="mdi mdi-close"></span></a></li>';
      //e("#CartCount_ .cart-products-count").text(n.item_count);
      e("body:not(.header_style_5) #CartCount_sticky .cart-products-count").text(n.item_count);
      e(".header_style_5 #CartCount_sticky .cart-products-count").html(Shopify.formatMoney(n.total_price, window.money_format));
      e("#minicart_total span.money").html(Shopify.formatMoney(n.total_price, window.money_format));
      e("#slidedown-cart .summary .price").html(Shopify.formatMoney(n.total_price, window.money_format));
      e("#slidedown-cart .mini-products-list").html("");
      e("#Sticky-slidedown-cart .summary .price").html(Shopify.formatMoney(n.total_price, window.money_format));
      e("#Sticky-slidedown-cart .mini-products-list").html("");
      e(".ajax-success-modal").find(".ajax_item_total").html(n.item_count);
      if (n.item_count > 0) {
        for (var i = 0; i < n.items.length; i++) {
          var s = r;
          s = s.replace(/\{ID\}/g, n.items[i].id);
          s = s.replace(/\{URL\}/g, n.items[i].url);
          s = s.replace(/\{PRODUCT_TITLE\}/g, n.items[i].product_title);
          s = s.replace(/\{VARIANT_TITLE\}/g, n.items[i].variant_title);
          s = s.replace(/\{QUANTITY\}/g, n.items[i].quantity);
          s = s.replace(/\{IMAGE\}/g, Shopify.resizeImage(n.items[i].image, "medium"));
          s = s.replace(/\{PRICE\}/g, Shopify.formatMoney(n.items[i].price, window.money_format));
          e("#slidedown-cart .mini-products-list").append(s)
          e("#Sticky-slidedown-cart .mini-products-list").append(s)
        }
        e("#slidedown-cart .btn-remove").click(function(n) {
          n.preventDefault();
          var r = e(this).parents(".item").attr("id");
          r = r.match(/\d+/g);
          Shopify.removeItem(r, function(e) {
            t.doUpdateDropdownCart(e)
          })
        });
        e("#Sticky-slidedown-cart .btn-remove").click(function(n) {
          n.preventDefault();
          var r = e(this).parents(".item").attr("id");
          r = r.match(/\d+/g);
          Shopify.removeItem(r, function(e) {
            t.doUpdateDropdownCart(e)
          })
        });
        if (t.checkNeedToConvertCurrency()) {
          Currency.convertAll(window.shop_currency, jQuery('.currencies li.active .currencies-a').val(), '#slidedown-cart span.money', 'money_format');
          Currency.convertAll(window.shop_currency, jQuery('.currencies li.active .currencies-a').val(), '#Sticky-slidedown-cart span.money', 'money_format');
          Currency.convertAll(window.shop_currency, jQuery('.currencies li.active .currencies-a').val(), 'span.money', 'money_format');
          Currency.convertAll(window.shop_currency, jQuery('.currencies li.active .currencies-a').val(), '#minicart_total span.money', 'money_format')
        }
      }
      t.checkItemsInDropdownCart()
    },
    checkNeedToConvertCurrency: function() {
      return window.show_multiple_currencies && Currency.currentCurrency != shopCurrency
    },
    loadQuickViewSlider: function(product, r) {
      var s = Shopify.resizeImage(product.featured_image, "large");

      r.find(".quickview-featured-image").append('<img class="quick-image" height="auto" width="364" src="' + s + '" title="' + product.title + '"/>');

      if (product.images.length > 1) {
        var o = r.find(".more-view-wrapper ul");
        for (i = 0; i < 4; i++) {
          var u = Shopify.resizeImage(product.images[i], "large");
          var a = Shopify.resizeImage(product.images[i], "medium");
          var f = '<li><a href="javascript:void(0)" data-image="' + u + '"><img height="auto" width="85" src="' + a + '"  /></a></li>';
          o.append(f);
          $('li').first().find('a').addClass("active");
        }
        //o.css('max-height', '130px');
        if ($("body.rtl").length > 0) {
          if (o.hasClass("quickview-more-views-owlslider")) {
            t.initQuickViewMoreviewRtl(o)
          } else {
            t.initQuickViewMoreviewRtl(o)
          }
        } else {
          if (o.hasClass("quickview-more-views-owlslider")) {
            t.initQuickViewMoreview(o)
          } else {
            t.initQuickViewMoreview(o)
          }
        }
        o.find("a").click(function() {          
          var t = r.find(".quickview-featured-image img");
          var product = r.find(".quickview-featured-image div");
          if (t.attr("src") != e(this).attr("data-image")) {
            t.attr("src", e(this).attr("data-image"));
            product.show();
            e("a").removeClass('active');
            e(this).addClass('active');
            t.load(function(t) {
              product.hide();
              e(this).unbind("load");                        
              product.hide()
            })
          }
        });
        (function() {
          $("a").removeClass('active');
        });
      } else {
        r.find(".more-view-wrapper").remove();
        $("a").removeClass('active');
      }
      e(".quick-view .overlay, .close-window").on("click", function() {
        t.closeQuickViewPopup();
        e('.quick-view').removeClass("open-in");
        e('.quick-view').removeClass("option-loader");
        e(".quick-view .content").removeAttr( "id" ).css( 'display', 'none' );
        return false
      });
    },
    closeEmailModalWindow: function() {
      if (e("#email-modal").length > 0 && e("#email-modal").is(":visible")) {
        e("#email-modal .modal-window").fadeOut(600, function() {
          e("#email-modal .modal-overlay").fadeOut(600, function() {
            e("#email-modal").hide();
            e.cookie("emailSubcribeModal", "closed", {
              expires: 1,
              path: "/"
            })
          })
        })
      }
    },
    initQuickViewMoreview: function(m) {
      if (m) {
        m.owlCarousel({
          nav: !0,
          items: 3,
          loop: !1,
          rtl: !1,
          responsive: {
            0: {
              items: 2
            },
            600: {
              items: 2
            },
            768: {
              items: 3
            },
            992: {
              items: 2
            },
            1200: {
              items: 3
            }
          },
          dots: !1
        })
        setTimeout(function() {
          $(m).css("visibility", "visible")
        }, 500)
      }
    },
    initQuickViewMoreviewRtl: function(m) {
      if (m) {
        m.owlCarousel({
          nav: !0,
          items: 3,
          loop: !1,
          rtl: !0,
          responsive: {
            0: {
              items: 2
            },
            600: {
              items: 2
            },
            768: {
              items: 3
            },
            992: {
              items: 2
            },
            1200: {
              items: 3
            }
          },
          dots: !1
        })
        setTimeout(function() {
          $(m).css("visibility", "visible")
        }, 500)
      }
    },
    convertToSlug: function(e) {
      return e.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
    },
    selectCallbackQuickview : function(variant, selector) {
      var productItem=jQuery('.quick-view .product-item'),
          addToCart=productItem.find('.add-to-cart-btn'),
          productPrice=productItem.find('.price'),
          comparePrice=productItem.find('.compare-price'),
          totalPrice=productItem.find('.total-price span'),
          inventory=productItem.find('.product-inventory'),
          inventory_item=productItem.find('.product-inventory span');

      if (variant && variant.featured_image) {
        var originalImage = jQuery(".quick-image");
        var newImage = variant.featured_image;
        var element = originalImage[0];
        Shopify.Image.switchImage(newImage, element, function (newImageSizedSrc, newImage, element) {
          var $el = $(element);
          $el.attr('src', newImageSizedSrc);
        });        
      }

      if(variant) {
        if(variant.available) {
          addToCart.text('Add to Cart').removeClass('disabled').removeAttr('disabled');
          inventory.css("display", "block");
        }
        else {
          addToCart.text('Sold Out').val('Sold Out').addClass('disabled').attr('disabled', 'disabled');
          inventory.css("display", "none");
          var C = jQuery(".quick-view .product-shop .product-item").attr("data-id");
          jQuery("#product-actions-" + C).find(".actions .add-to-cart-btn").prepend( jQuery("<i class='mdi mdi-cart-outline'></i>")); 
        }
        productPrice.html(Shopify.formatMoney(variant.price, theme.moneyFormat));
        if(variant.compare_at_price>variant.price) {
          comparePrice.html(Shopify.formatMoney(variant.compare_at_price, theme.moneyFormat)).show();
          Currency.convertAll(window.shop_currency, jQuery('.currencies li.active .currencies-a').val(), 'span.money', 'money_format');
          productPrice.addClass('on-sale');
        }
        else {
          comparePrice.hide();
          productPrice.removeClass('on-sale');
        }
        var inventoryInfo=productItem.find('.product-inventory span');
        if(variant.available) {
          inventoryInfo.text(window.in_stock);
          inventoryInfo.removeClass("out_of_stock");
          inventoryInfo.addClass("in_stock");
          jQuery(".qty-box-set").css('display', 'inline-block');
          var C = jQuery(".quick-view .product-shop .product-item").attr("data-id");
          jQuery("#product-actions-" + C).find(".actions .add-to-cart-btn").prepend( jQuery("<i class='mdi mdi-cart-outline'></i>"));  
        }
        else {
          inventoryInfo.text(window.out_of_stock);
          inventoryInfo.removeClass("in_stock");
          inventoryInfo.addClass("out_of_stock");
          jQuery(".qty-box-set").css( 'display', 'none' );
        }
        if(variant&&variant.featured_image) {
          var newImage=Shopify.resizeImage(variant.featured_image.src, 'small');
          newImage=newImage.replace(/https?: /, '');
          jQuery('.quick-view .quickview-more-views img').each(function() {
            var grandSize=jQuery(this).attr('src');
            if(grandSize==newImage) {
              jQuery(this).parent().trigger('click');
              return !1
            }
          })
        }
      }
      else {
        addToCart.text('Unavailable').addClass('disabled').attr('disabled', 'disabled');
        inventory.css("display", "none");
        var C = jQuery(".quick-view .product-shop .product-item").attr("data-id");
        jQuery("#product-actions-" + C).find(".actions .add-to-cart-btn").prepend( jQuery("<i class='mdi mdi-cart-outline'></i>")); 
      }
      Currency.convertAll(window.shop_currency, jQuery('.currencies li.active .currencies-a').val(), 'span.money', 'money_format');
    },
    createQuickViewVariants: function(product,r) {
      var self = this;
      if (product.variants.length >= 1) {
        for (var i = 0; i < product.variants.length; i++) {
          var variant = product.variants[i];
          var option = '<option value="' + variant.id + '">' + variant.title + "</option>";
          r.find("form.variants > select").append(option)
        }
        new Shopify.OptionSelectors("product-select-" + product.id, {
          product: product,
          onVariantSelected: self.selectCallbackQuickview,
          enableHistoryState: true
        });
        var options = "";

        for (var i = 0; i < product.options.length; i++) {
          options += '<div class="swatch clearfix" data-option-index="' + i + '">';          
          var is_color = false;
          if (/Color|Colour/i.test(product.options[i].name)) {
            is_color = true;
          }
          var optionValues = new Array();
          for (var j = 0; j < product.variants.length; j++) {
            var variant = product.variants[j];
            var value = variant.options[i];
            var valueHandle = t.convertToSlug(value);
            var forText = 'swatch-' + i + '_' + valueHandle;
            if (optionValues.indexOf(value) < 0) {
              //not yet inserted
              options += '<div data-value="' + value + '" class=" ' + (is_color ? "color" : "") + valueHandle + (variant.available ? ' available ' : ' soldout ') + '">';


              options += '<input id="' + forText + '" type="radio" name="option-' + i + '" value="' + value + '" ' + (j == 0 ? ' checked ' : '') + (variant.available ? '' : ' disabled') + ' />';

              if (is_color) {

                options += '<label class="link_color" for="' + forText + '" style="background-color: ' + valueHandle + ';"></label>';



              } else {

                options += '<label class="variant_other" for="' + forText + '">' + value + '</label>';

              }
              options += '</div>';
              if (variant.available) {
                $('.quickview-product .swatch[data-option-index="' + i + '"] .' + valueHandle).removeClass('soldout').addClass('available').find(':radio').removeAttr('disabled');
              }
              optionValues.push(value);
            }
          }
          options += '</div>';
        }
        r.find('form.variants > select').after(options);
        r.find('.swatch :radio').change(function() {
          var optionIndex = $(this).closest('.swatch').attr('data-option-index');
          var optionValue = $(this).val();
          $(this)
          .closest('form')
          .find('.single-option-selector')
          .eq(optionIndex)
          .val(optionValue)
          .trigger('change');
        });

        if (product.available && product.options.size > 1) {
          Shopify.optionsMap = {};
          Shopify.linkOptionSelectors(product);
        }

      } else {
        r.find('form.variants > select').remove();
        var variant_field = '<input type="hidden" name="id" value="' + product.variants[0].id + '">';
        r.find('form.variants').append(variant_field);
      }
    },
    closeQuickViewPopup: function() {
      //e(".quick-view").fadeOut(500)
    },
    initSidebar: function() {
      if (e(".collection_sidebar").length > 0) {
          t.sidebarParams();
        t.sidebarMapEvents();
        t.sidebarMapClear();
        t.sidebarMapClearAll();
        t.initSortby();
        t.sidebarMapPaging()
      }
    },
    
    sidebarMapView: function() {
      e(".view-mode a.active").removeClass("active");
      e(this).addClass("active");
      jQuery('.products-grid-view  > .product-list .product-thumb').attr('class', 'product-thumb col-xs-5 col-sm-5 col-md-3');
      jQuery('.products-grid-view > .product-list .product-description').attr('class', 'product-description col-xs-7 col-sm-7 col-md-9');
      jQuery('.products-grid-view > div.grid-item').each(function() {
        var countt = jQuery(this).find('.grid-item.product-grid .product-wrapper .product-thumb div.col-sm-12');
        jQuery(this).find('.grid-item.product-grid .product-wrapper .product-description .flip-countdown.simple-countdown').appendTo(countt)
      });
      jQuery('.product-short-list .product-wrapper .product-description .spr-badges').addClass('grid-item-meta');
      jQuery('.products-grid-view > .product-grid .product-thumb').attr('class', 'thumbs product-thumb col-xs-12 padding_0');
      jQuery('.products-grid-view > .product-grid .product-description').attr('class', 'product-description col-xs-12');
      jQuery('.products-grid-view > div.grid-item').addClass('product-grid');

      jQuery('#list-view').on('click',function() {
        jQuery('.products-grid-view > div.grid-item').removeClass('product-short-list');	
        jQuery('.products-grid-view > div.grid-item').removeClass('product-grid');
        jQuery('.products-grid-view > div.grid-item').addClass('product-list');
        jQuery('#grid-view').removeClass('active');
        jQuery('#short-list-view').removeClass('active');
        jQuery('#list-view').addClass('active');
        jQuery('.products-grid-view > .product-list .product-thumb').attr('class', 'product-thumb col-xs-5 col-sm-5 col-md-3');
        jQuery('.products-grid-view > .product-list .product-description').attr('class', 'product-description col-xs-7 col-sm-7 col-md-9');
        jQuery('.products-grid-view > div.product-list').each(function(){ 	
          var prod_ven_unwrap= jQuery(this).find('.product-wrapper .product-description .product-description-wrap .short-title');
          jQuery(prod_ven_unwrap).children().unwrap();
        });

        jQuery('.products-grid-view > div.grid-item').each(function(){                      
          var thumb = jQuery(this).find('.product-description-wrap .product-desc');
          jQuery(this).find('.grid-view-item__meta').insertAfter(thumb);
          var prod_desc = jQuery(this).find('.product-description .product-description-wrap');
          jQuery(this).find('.btn_wrapper').appendTo(prod_desc);                     
          var thumb = jQuery(this).find('.grid-view-item__title');
          jQuery(this).find('.spr-badges').insertAfter(thumb);
          var prod_desc2 = jQuery(this).find('.product-description .spr-badges');
          jQuery(this).find('.color-size').insertAfter(prod_desc2);
          var btn_cart = jQuery(this).find('.product-wrapper .product-description');
          jQuery(this).find('.cart-qty').appendTo(btn_cart)
          var btn = jQuery(this).find('.product-description');
          jQuery(this).find('.btn_wrapper').appendTo(btn)  
        });

        jQuery('.products-grid-view > div.grid-item.style1').each(function(){                     
          var btn_cart = jQuery(this).find('.product-wrapper .product-description .btn_wrapper');
          jQuery(this).find('.cart-qty').prependTo(btn_cart)
        });  
        jQuery('.products-grid-view > div.grid-item.style2').each(function(){                     
          var btn_cart = jQuery(this).find('.product-wrapper .product-description .btn_wrapper');
          jQuery(this).find('.add_tocart').prependTo(btn_cart)
        }); 

        jQuery('.products-grid-view > div.product-list').each(function() {
          var prod_ven_unwrap = jQuery(this).find('.product-wrapper .product-description .short-title');
          jQuery(prod_ven_unwrap).children().unwrap()
        });

        localStorage.setItem('display', 'list');
        var paging = e(".filter-show  button span").text();
        Shopify.queryParams.view = paging;
      });

      jQuery('#short-list-view').on('click', function() {
        jQuery('.products-grid-view > div.grid-item ').removeClass('product-grid');
        jQuery('.products-grid-view > div.grid-item ').removeClass('product-list');
        jQuery('.products-grid-view > div.grid-item ').addClass('product-short-list');
        jQuery('#grid-view').removeClass('active');
        jQuery('#list-view').removeClass('active');
        jQuery('#short-list-view').addClass('active');
        jQuery('.products-grid-view > .product-short-list .product-thumb').attr('class', 'product-thumb col-xs-4 col-sm-3 col-md-2');
        jQuery('.products-grid-view > .product-short-list .product-description').attr('class', 'product-description col-xs-8 col-sm-9 col-md-10');

        jQuery('.product-wrapper .product-description .spr-badges,.product-wrapper .product-description .grid-view-item__vendor').addClass('grid-item-meta');
        jQuery('.product-wrapper .product-description .grid-view-item__title').addClass('grid-item-meta');
        jQuery('.products-grid-view > div.product-short-list').each(function() {
          var prod_ven = jQuery(this).find('.product-wrapper .product-description > .grid-item-meta');
          jQuery(prod_ven).wrapAll('<div class="short-title col-xs-6 col-sm-5"></div>')
          var prod_ven = jQuery(this).find('.product-wrapper .product-description .product-content > .grid-item-meta');
          jQuery(prod_ven).wrapAll('<div class="short-title col-xs-6 col-sm-5"></div>')
        });
        jQuery('.products-grid-view > div.grid-item').each(function() {
          var prod_desc2 = jQuery(this).find('.product-description .short-title');
          jQuery(this).find('.color-size').appendTo(prod_desc2);
          var thumb = jQuery(this).find('.grid-view-item__title');
          jQuery(this).find('.spr-badges').insertAfter(thumb);
          var btn1 = jQuery(this).find('.product-wrapper .product-description');
          jQuery(this).find('.btn_wrapper').appendTo(btn1)  
          var btn_cart = jQuery(this).find('.product-wrapper .product-description .btn_wrapper');
          jQuery(this).find('.cart-qty').prependTo(btn_cart)
        });

        jQuery('.products-grid-view > div.grid-item.style2').each(function(){                     
          var btn_cart = jQuery(this).find('.product-wrapper .product-description .cart-qty');
          jQuery(this).find('.add_tocart').appendTo(btn_cart)
        });  

        localStorage.setItem('display', 'short-list');
        var paging = e(".filter-show  button span").text();
        Shopify.queryParams.view = paging
      });

      jQuery('#grid-view').on('click', function() {
        jQuery('#list-view').removeClass('active');
        jQuery('#short-list-view').removeClass('active');
        jQuery('#grid-view').addClass('active');
        jQuery('.products-grid-view > div.grid-item ').removeClass('product-list');
        jQuery('.products-grid-view > div.grid-item ').removeClass('product-short-list');
        jQuery('.products-grid-view > div.grid-item ').addClass('product-grid');
        jQuery('.products-grid-view > .product-grid .product-thumb').attr('class', 'product-thumb col-xs-12 padding_0');
        jQuery('.products-grid-view > .product-grid .product-description').attr('class', 'product-description col-xs-12');
        localStorage.setItem('display', 'grid');
        jQuery('.products-grid-view > div.grid-item').each(function() {
          var countt = jQuery(this).find('.product-thumb .fade_img');
          jQuery(this).find('.product-description .flip-countdown.simple-countdown').appendTo(countt)
        });
        jQuery('.products-grid-view > div.product-grid').each(function() {
          var prod_ven_unwrap = jQuery(this).find('.product-wrapper .product-description .short-title');
          jQuery(prod_ven_unwrap).children().unwrap()
        });             

        jQuery('.products-grid-view > div.grid-item').each(function(){ 
          var btn = jQuery(this).find('.product-wrapper .product-thumb');
          jQuery(this).find('.btn_wrapper').appendTo(btn) 
          var btn_cart = jQuery(this).find('.product-wrapper .product-description');
          jQuery(this).find('.cart-qty').appendTo(btn_cart)
        });

        jQuery('.products-grid-view > div.grid-item').each(function() {
          var prod_countdown = jQuery(this).find('.product-thumb div.col-xs-12');
          jQuery(this).find('.product-wrapper .flip-countdown.simple-countdown').appendTo(prod_countdown)
        });

        jQuery('.products-grid-view > div.grid-item.style2').each(function(){                     
          var btn_cart = jQuery(this).find('.product-wrapper .product-description .cart-qty');
          jQuery(this).find('.add_tocart').appendTo(btn_cart)
        });  
        var paging = e(".filter-show  button span").text();
        Shopify.queryParams.view = paging
      });
      if (jQuery(window).width() < 992) {
        jQuery(".sidebar .widget > h4").addClass("toggle");
        jQuery(".sidebar .widget ").children(':nth-child(2)').css('display', 'none');
        jQuery(".sidebar .widget.active").children(':nth-child(2)').css('display', 'block');
        jQuery(".sidebar .widget > h4.toggle").unbind("click");
        jQuery(".sidebar .widget > h4.toggle").on('click', function() {
          jQuery(this).parent().toggleClass('active').children(':nth-child(2)').slideToggle("fast")
        })
      }
      if (localStorage.getItem('display') == 'grid') {
        jQuery('#grid-view').trigger('click')
      } else if (localStorage.getItem('display') == 'list') {
        jQuery('#list-view').trigger('click')
      } else if (localStorage.getItem('display') == 'short-list') {
        jQuery('#short-list-view').trigger('click')
      } else {
        jQuery('#grid-view').trigger('click')
      }
      countDownIni('.flip-countdown')
    },
     

    sidebarMapShow: function() {
      e(".filter-show a").click(function(n) {
        if (!e(this).parent().hasClass("active")) {
          var thisPaging = e(this).attr('href');
          Shopify.queryParams.view = thisPaging;
          t.sidebarAjaxClick();
          e(".filter-show .btn span").text(thisPaging);
          e(".filter-show li.active").removeClass("active");
          e(this).parent().addClass("active")
        }
        n.preventDefault()
      })
    },
    initSortby: function() {
      if (Shopify.queryParams.sort_by) {
        var sortby = Shopify.queryParams.sort_by;
        var sortbyText = e(".filter-sortby a[href='" + sortby + "']").text();
        e(".filter-sortby  button span").text(sortbyText);
        e(".filter-sortby li.active").removeClass("active");
        e(".filter-sortby a[href='" + sortby + "']").parent().addClass("active")
      }
    },
    sidebarMapPaging: function() {
      e(".pagination-custom a").click(function(n) {
        var page = e(this).attr("href").match(/page=\d+/g);
        if (page) {
          Shopify.queryParams.page = parseInt(page[0].match(/\d+/g));
          if (Shopify.queryParams.page) {
            var newurl = t.sidebarCreateUrl();
            t.isSidebarAjaxClick = !0;
            History.pushState({
              param: Shopify.queryParams
            }, newurl, newurl);
            t.sidebarGetContent(newurl);
            e('body,html').animate({
              scrollTop: 500
            }, 600)
          }
        }
        $.ajax({
          type: 'get',
          url: newurl,
          beforeSend: function() {
            t.showLoading()
          },
          success: function(data) {
            var products = $(data).find(".col-main .products-grid-view");
            if (products.length) {
              var len = (products.children().length);
              var loaded = $('.loadcount').html();
              var loa = parseInt(len);
              $('.loadcount').html(loa);
              $('.pag-product').html(loa)
            }
          }
        });
        n.preventDefault()
      })
    },
    sidebarMapTagEvents: function() {
      if (jQuery(window).width() < 992) {
        jQuery(".collection_right .sidebar .widget > h4,.collection_left .sidebar .widget > h4,.blog-section .sidebar .widget > h4").addClass("toggle");
        jQuery(".collection_right .sidebar .widget,.collection_left .sidebar .widget,.blog-section .sidebar .widget").children(':nth-child(2)').css('display', 'none');
        jQuery(".collection_right .sidebar .widget.active,.collection_left .sidebar .widget.active,.blog-section .sidebar .widget.active").children(':nth-child(2)').css('display', 'block');
        jQuery(".collection_right .sidebar .widget > h4.toggle,.collection_left .sidebar .widget > h4.toggle,.blog-section .sidebar .widget > h4.toggle").unbind("click");
        jQuery(".collection_right .sidebar .widget > h4.toggle,.collection_left .sidebar .widget > h4.toggle,.blog-section .sidebar .widget > h4.toggle").on('click', function() {
          jQuery(this).parent().toggleClass('active').children(':nth-child(2)').slideToggle("fast")
        })
      }
      if (jQuery(window).width() < 992) {
        jQuery(".collection_right .sidebar-block .widget > h4,.collection_left .sidebar-block .widget > h4").addClass("toggle");
        jQuery(".collection_right .sidebar-block .widget,.collection_left .sidebar-block .widget ").children(':nth-child(2)').css('display', 'none');
        jQuery(".collection_right .sidebar-block .widget.active,.collection_left .sidebar-block .widget.active").children(':nth-child(2)').css('display', 'block');
        jQuery(".collection_right .sidebar-block .widget > h4.toggle,.collection_left .sidebar-block .widget > h4.toggle").unbind("click");
        jQuery(".collection_right .sidebar-block .widget > h4.toggle,.collection_left .sidebar-block .widget > h4.toggle").on('click', function() {
          jQuery(this).parent().toggleClass('active').children(':nth-child(2)').slideToggle("fast")
        })
      }
      e('.sidebar-tag a:not(".clear"), .sidebar-tag label').click(function(n) {
        e(this).addClass('active');
        var currentTags = [];
        if (Shopify.queryParams.constraint) {
          currentTags = Shopify.queryParams.constraint.split('+')
        }
        if (!window.enable_sidebar_multiple_choice && !e(this).prev().is(":checked")) {
          var otherTag = e(this).parents('.sidebar-tag').find("input:checked");
          if (otherTag.length > 0) {
            var tagName = otherTag.val();
            if (tagName) {
              var tagPos = currentTags.indexOf(tagName);
              if (tagPos >= 0) {
                currentTags.splice(tagPos, 1)
              }
            }
          }
        }
        var tagName = e(this).prev().val();
        if (tagName) {
          var tagPos = currentTags.indexOf(tagName);
          if (tagPos >= 0) {
            currentTags.splice(tagPos, 1)
          } else {
            currentTags.push(tagName)
          }
        }
        if (currentTags.length) {
          Shopify.queryParams.constraint = currentTags.join('+')
        } else {
          delete Shopify.queryParams.constraint
        }
        t.sidebarAjaxClick();
        n.preventDefault()
      })
    },
    sidebarInitToggle: function() {
      if (e(".sidebar-tag").length > 0) {
        e(".sidebar-tag .widget span").click(function() {
          var $title = e(this).parents('.widget');
          if ($title.hasClass('click')) {
            $title.removeClass('click')
          } else {
            $title.addClass('click')
          }
          e(this).parents(".sidebar-tag").find(".widget-content").slideToggle()
        })
      }
    },
    sidebarMapClearAll: function() {
      e('.refined-widgets a.clear-all').click(function(n) {
        delete Shopify.queryParams.constraint;
        delete Shopify.queryParams.q;
        t.sidebarAjaxClick();
        n.preventDefault()
      })
    },
    sidebarMapClear: function() {
      e(".sidebar-tag").each(function() {
        var sidebarTag = e(this);
        if (sidebarTag.find("input:checked").length > 0) {
          sidebarTag.find(".clear").show().click(function(n) {
            var currentTags = [];
            if (Shopify.queryParams.constraint) {
              currentTags = Shopify.queryParams.constraint.split('+')
            }
            sidebarTag.find("input:checked").each(function() {
              var selectedTag = e(this);
              var tagName = selectedTag.val();
              if (tagName) {
                var tagPos = currentTags.indexOf(tagName);
                if (tagPos >= 0) {
                  currentTags.splice(tagPos, 1)
                }
              }
            });
            if (currentTags.length) {
              Shopify.queryParams.constraint = currentTags.join('+')
            } else {
              delete Shopify.queryParams.constraint
            }
            t.sidebarAjaxClick();
            n.preventDefault()
          })
        }
      })
    },
    sidebarMapEvents: function() {
     t.sidebarMapTagEvents();
      
      t.sidebarMapView();
      
      t.sidebarMapShow()
    },
    reActivateSidebar: function() {
      e(".sidebar-tag .active").removeClass("active");
      e(".sidebar-tag input:checked").attr("checked", !1);
      if (Shopify.queryParams.view) {
        e(".view-mode .active").removeClass("active");
        var view = Shopify.queryParams.view;
        if (view.indexOf("list") >= 0) {
          e(".view-mode .list").addClass("active");
          view = view.replace("list", "")
        } else {
          e(".view-mode .grid").addClass("active")
        }
        e(".filter-show  button span").text(view);
        e(".filter-show li.active").removeClass("active");
        e(".filter-show a[href='" + view + "']").parent().addClass("active")
      }
      t.initSortby()
    },
    sidebarMapData: function(data) {
      var currentList = e(".col-main .products-grid-view");
      var productList = e(data).find(".col-main .products-grid-view");
      currentList.replaceWith(productList);
      if (t.checkNeedToConvertCurrency()) {
        Currency.convertAll(window.shop_currency, jQuery('.currencies li.active .currencies-a').val(), 'span.money', 'money_format')
      }
      e(".refined-widgets").replaceWith(e(data).find(".refined-widgets"));
      e(".sidebar-block").replaceWith(e(data).find(".sidebar-block"));

      $('.product-layouts .qtyplus').on('click', function(e) {
        e.preventDefault();
        var input_val = jQuery(this).parents('.qty-box-set').find('.quantity');
        var currentVal = parseInt(jQuery(this).parents('.qty-box-set').find('.quantity').val());
        if (!isNaN(currentVal)) {
          jQuery(this).parents('.qty-box-set').find('.quantity').val(currentVal + 1)
        } else {
          jQuery(this).parents('.qty-box-set').find('.quantity').val(1)
        }
      });
      $(".product-layouts .qtyminus").on('click', function(e) {
        e.preventDefault();
        var input_val = jQuery(this).parents('.qty-box-set').find('.quantity');
        var currentVal = parseInt(jQuery(this).parents('.qty-box-set').find('.quantity').val());
        if (!isNaN(currentVal) && currentVal > 1) {
          jQuery(this).closest('.qty-box-set').find('.quantity').val(currentVal - 1)
        } else {
          jQuery(this).closest('.qty-box-set').find('.quantity').val(1)
        }
      });

      countDownIni('.flip-countdown');
      $(".pro_btn.quick-view-wrap > a,.pro_btn.add_tocart form > a").click(function() {
        $(this).addClass("loading");
        setTimeout(function() {
          $(".pro_btn.quick-view-wrap > a,.pro_btn.add_tocart form > a").removeClass("loading")
        }, 2000)
      });
      if (e(".pagination-wrap").length > 0) {
        e(".pagination-wrap").replaceWith(e(data).find(".pagination-wrap"))
      } else {
        e(e(data).find(".pagination-wrap")).insertAfter(".col-main")
      }
      if (localStorage.getItem('display') == 'grid') {
        jQuery('#grid-view').trigger('click')
      } else if (localStorage.getItem('display') == 'list') {
        jQuery('#list-view').trigger('click')
      } else if (localStorage.getItem('display') == 'short-list') {
        jQuery('#short-list-view').trigger('click')
      } else {
        jQuery('#grid-view').trigger('click')
      }
      t.initInfiniteScrolling();
      if ($(".spr-badges").length > 0) {
        return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()
      }
    },
    sidebarCreateUrl: function(baseLink) {
      var newQuery = e.param(Shopify.queryParams).replace(/%2B/g, '+');
      if (baseLink) {
        location.href = baseLink + "?" + newQuery;
        if (newQuery != "")
          return baseLink + "?" + newQuery;
        else return baseLink
          }
      return location.pathname + "?" + newQuery
    },
    sidebarAjaxClick: function(baseLink) {
      delete Shopify.queryParams.page;
      var newurl = t.sidebarCreateUrl(baseLink);
      t.isSidebarAjaxClick = !0;
      History.pushState({
        param: Shopify.queryParams
      }, newurl, newurl);
      t.sidebarGetContent(newurl)
    },
    sidebarGetContent: function(newurl) {
      $.ajax({
        type: 'get',
        url: newurl,
        beforeSend: function() {
          t.showLoading()
        },
        success: function(data) {
          t.sidebarMapData(data);
          t.sidebarMapTagEvents();
          t.sidebarMapClear();
          t.sidebarMapClearAll();
          t.hideLoading();
          t.initQuickView();
          t.initAddToCart();
          t.initAddToCarts();
          t.initWishlist();
          t.sidebarMapPaging()
          countDownIni('.flip-countdown');
          var $container = $(".shop_masonry");
          if ($container.length > 0) {
            $container.imagesLoaded(function() {
              $container.masonry({
                itemSelector: ".ms-item",
                columnWidth: ".ms-item",
                percentPosition: !0
              })
            });
            t.initInfiniteScrolling()
          }
        },
        error: function(xhr, text) {
          t.hideLoading();
          e('.loading-modal').hide();
          e('.ajax-error-message').text($.parseJSON(xhr.responseText).description);
          t.showModal('.ajax-error-modal')
        }
      })
    },
    sidebarParams: function() {
      Shopify.queryParams = {};
      if (location.search.length) {
        for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
          aKeyValue = aCouples[i].split('=');
          if (aKeyValue.length > 1) {
            Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1])
          }
        }
      }
    },
    FacetFiltersForm: function() {
      class FacetFiltersForm extends HTMLElement {
        constructor() {
          super();
          this.onActiveFilterClick = this.onActiveFilterClick.bind(this);
          this.debouncedOnSubmit = debounce((event) => {
            this.onSubmitHandler(event);
          }, 500);

          this.querySelector('form').addEventListener('input', this.debouncedOnSubmit.bind(this));

          const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
          if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);
        }

        static setListeners() {
          const onHistoryChange = (event) => {
            const searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
            if (searchParams === FacetFiltersForm.searchParamsPrev) return;
            FacetFiltersForm.renderPage(searchParams, null, false);
          }
          window.addEventListener('popstate', onHistoryChange);
        }

        static toggleActiveFacets(disable = true) {
          document.querySelectorAll('.js-facet-remove').forEach((element) => {
            element.classList.toggle('disabled', disable);
          });
        }

        static renderPage(searchParams, event, updateURLHash = true) {
          FacetFiltersForm.searchParamsPrev = searchParams;
          const sections = FacetFiltersForm.getSections();
          const countContainer = document.getElementById('ProductCount');
          const countContainerDesktop = document.getElementById('ProductCountDesktop');
          document.getElementById('ProductGridContainer').querySelector('.collection_template').classList.add('loading');
          if (countContainer){
            countContainer.classList.add('loading');
          }    
          if (countContainerDesktop){
            countContainerDesktop.classList.add('loading');
          }

          sections.forEach((section) => {
            const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
            const filterDataUrl = element => element.url === url;

            FacetFiltersForm.filterData.some(filterDataUrl) ?
              FacetFiltersForm.renderSectionFromCache(filterDataUrl, event) :
            FacetFiltersForm.renderSectionFromFetch(url, event);
          });

          if (updateURLHash) FacetFiltersForm.updateURLHash(searchParams);
        }

        static renderSectionFromFetch(url, event) {
          fetch(url)
          .then(response => response.text())
          .then((responseText) => {
            const html = responseText;
            FacetFiltersForm.filterData = [...FacetFiltersForm.filterData, { html, url }];
            FacetFiltersForm.renderFilters(html, event);
            FacetFiltersForm.renderProductGridContainer(html);
            //FacetFiltersForm.renderProductCount(html); 
          t.sidebarMapTagEvents();
          t.sidebarMapClear();
          t.sidebarMapClearAll();
          t.hideLoading();
          t.initQuickView();
          t.initAddToCart();
          t.initAddToCarts();
          t.initWishlist();
            jQuery(".filter-toggle").on("click" , function(e){
              e.preventDefault();
              jQuery(this).toggleClass("active");
              jQuery(".filter-toggle-wrap").slideToggle("is-visible");
            })
            jQuery(".filter-left").on("click" , function(e){
              e.preventDefault();
              jQuery(this).toggleClass("active");
              jQuery(".off-canvas.position-left").addClass("is-open");
              jQuery(".js-off-canvas-overlay.is-overlay-fixed").addClass("is-visible is-closable");
            });
            jQuery(".filter-right").on("click" , function(e){
              e.preventDefault();
              jQuery(this).toggleClass("active");
              jQuery(".off-canvas.position-right").addClass("is-open");
              jQuery(".js-off-canvas-overlay.is-overlay-fixed").addClass("is-visible is-closable");
            });
            jQuery(".off-canvas .sidebar_close").on("click" , function(e){
              e.preventDefault();
              jQuery(".off-canvas.position-left").removeClass("is-open");
              jQuery(".off-canvas.position-right").removeClass("is-open");
              jQuery(".js-off-canvas-overlay.is-overlay-fixed").removeClass("is-visible is-closable");
            });
            jQuery(".is-overlay-fixed").on("click" , function(e){
              e.preventDefault();
              jQuery(".filter-left").trigger('click');
              jQuery(".filter-right").trigger('click');
              jQuery(".off-canvas.position-left").removeClass("is-open");
              jQuery(".off-canvas.position-right").removeClass("is-open");
              jQuery(".js-off-canvas-overlay.is-overlay-fixed").removeClass("is-visible is-closable");
            });       
            $('body:not(.rtl) .category_feature1').owlCarousel({             
              items: 5,
              nav : false,
              dots : true,
              autoplay:false,
              loop:false,
              rtl:false,
              autoplayHoverPause: false,
              lazyLoad: true,
              smartSpeed: 1000,
              autoplayTimeout: 3000,
              responsive: {
                100: {
                  items: 1
                },
                320: {
                  items: 2
                },
                481: {
                  items: 3
                },
                768: {
                  items: 4
                },
                1300: {
                  items: 5
                }
              }
            });
            $('body.rtl .category_feature1').owlCarousel({
              items: 5,
              nav : false,
              dots : true,
              autoplay:false,
              loop:false,
              rtl:false,
              autoplayHoverPause: false,
              lazyLoad: true,
              smartSpeed: 1000,
              autoplayTimeout: 3000,
              responsive: {
                100: {
                  items: 1
                },
                320: {
                  items: 2
                },
                481: {
                  items: 3
                },
                768: {
                  items: 4
                },
                1300: {
                  items: 5
                }
              }
            });
            if ($(".spr-badges").length > 0) {
              return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()
            }
          });
        }
        static renderSectionFromCache(filterDataUrl, event) {
          const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
          FacetFiltersForm.renderFilters(html, event);
          FacetFiltersForm.renderProductGridContainer(html);
          //FacetFiltersForm.renderProductCount(html);
          t.sidebarMapView();
                   t.sidebarMapEvents();
          t.initAddToCart(); 
          t.sidebarMapShow();
          t.initQuickView();
          t.initWishlist();
          jQuery(".filter-toggle").on("click" , function(e){
            e.preventDefault();
            jQuery(this).toggleClass("active");
            jQuery(".filter-toggle-wrap").slideToggle("is-visible");
          })
          jQuery(".filter-left").on("click" , function(e){
            e.preventDefault();
            jQuery(this).toggleClass("active");
            jQuery(".off-canvas.position-left").addClass("is-open");
            jQuery(".js-off-canvas-overlay.is-overlay-fixed").addClass("is-visible is-closable");
          });
          jQuery(".filter-right").on("click" , function(e){
            e.preventDefault();
            jQuery(this).toggleClass("active");
            jQuery(".off-canvas.position-right").addClass("is-open");
            jQuery(".js-off-canvas-overlay.is-overlay-fixed").addClass("is-visible is-closable");
          });
          jQuery(".off-canvas .sidebar_close").on("click" , function(e){
            e.preventDefault();
            jQuery(".off-canvas.position-left").removeClass("is-open");
            jQuery(".off-canvas.position-right").removeClass("is-open");
            jQuery(".js-off-canvas-overlay.is-overlay-fixed").removeClass("is-visible is-closable");
          });
          jQuery(".is-overlay-fixed").on("click" , function(e){
            e.preventDefault();
            jQuery(".filter-left").trigger('click');
            jQuery(".filter-right").trigger('click');
            jQuery(".off-canvas.position-left").removeClass("is-open");
            jQuery(".off-canvas.position-right").removeClass("is-open");
            jQuery(".js-off-canvas-overlay.is-overlay-fixed").removeClass("is-visible is-closable");
          });       
          $('body:not(.rtl) .category_feature1').owlCarousel({             
            items: 5,
            nav : false,
            dots : true,
            autoplay:false,
            loop:false,
            rtl:false,
            autoplayHoverPause: false,
            lazyLoad: true,
            smartSpeed: 1000,
            autoplayTimeout: 3000,
            responsive: {
              100: {
                items: 1
              },
              320: {
                items: 2
              },
              481: {
                items: 3
              },
              768: {
                items: 4
              },
              1300: {
                items: 5
              }
            }
          });
          $('body.rtl .category_feature1').owlCarousel({
            items: 5,
            nav : false,
            dots : true,
            autoplay:false,
            loop:false,
            rtl:false,
            autoplayHoverPause: false,
            lazyLoad: true,
            smartSpeed: 1000,
            autoplayTimeout: 3000,
            responsive: {
              100: {
                items: 1
              },
              320: {
                items: 2
              },
              481: {
                items: 3
              },
              768: {
                items: 4
              },
              1300: {
                items: 5
              }
            }
          });
          if ($(".spr-badges").length > 0) {
            return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()
          }
        }

        static renderProductGridContainer(html) {
          document.getElementById('ProductGridContainer').innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductGridContainer').innerHTML;
        }

        //   static renderProductCount(html) {
        //     const count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML
        //     const container = document.getElementById('ProductCount');
        //     const containerDesktop = document.getElementById('ProductCountDesktop');
        //     container.innerHTML = count;
        //     container.classList.remove('loading');
        //     if (containerDesktop) {
        //       containerDesktop.innerHTML = count;
        //       containerDesktop.classList.remove('loading');
        //     }
        //   }

        static renderFilters(html, event) {
          const parsedHTML = new DOMParser().parseFromString(html, 'text/html');

          const facetDetailsElements =
                parsedHTML.querySelectorAll('#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter');
          const matchesIndex = (element) => { 
            const jsFilter = event ? event.target.closest('.js-filter') : undefined;
            return jsFilter ? element.dataset.index === jsFilter.dataset.index : false; 
          }
          const facetsToRender = Array.from(facetDetailsElements).filter(element => !matchesIndex(element));
          const countsToRender = Array.from(facetDetailsElements).find(matchesIndex);

          facetsToRender.forEach((element) => {
            document.querySelector(`.js-filter[data-index="${element.dataset.index}"]`).innerHTML = element.innerHTML;
          });

          FacetFiltersForm.renderActiveFacets(parsedHTML);
          FacetFiltersForm.renderAdditionalElements(parsedHTML);

          if (countsToRender) FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
        }

        static renderActiveFacets(html) {
          const activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

          activeFacetElementSelectors.forEach((selector) => {
            const activeFacetsElement = html.querySelector(selector);
            if (!activeFacetsElement) return;
            document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
          })

          FacetFiltersForm.toggleActiveFacets(false);
        }

        static renderAdditionalElements(html) {
          const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

          mobileElementSelectors.forEach((selector) => {
            if (!html.querySelector(selector)) return;
            document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
          });

          document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
        }

        static renderCounts(source, target) {
          const targetElement = target.querySelector('.facets__selected');
          const sourceElement = source.querySelector('.facets__selected');

          if (sourceElement && targetElement) {
            target.querySelector('.facets__selected').outerHTML = source.querySelector('.facets__selected').outerHTML;
          }
        }

        static updateURLHash(searchParams) {
          history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
        }

        static getSections() {
          return [
            {
              section: document.getElementById('product-grid').dataset.id,
            }
          ]
        }

        onSubmitHandler(event) {
          event.preventDefault();
          const formData = new FormData(event.target.closest('form'));
          const searchParams = new URLSearchParams(formData).toString();
          FacetFiltersForm.renderPage(searchParams, event);
        }

        onActiveFilterClick(event) {
          event.preventDefault();
          FacetFiltersForm.toggleActiveFacets();
          FacetFiltersForm.renderPage(new URL(event.currentTarget.href).searchParams.toString());
          t.sidebarMapView();
          t.initAddToCart();
        }
      }

      FacetFiltersForm.filterData = [];
      FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
      FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
      customElements.define('facet-filters-form', FacetFiltersForm);
      FacetFiltersForm.setListeners();

      class PriceRange extends HTMLElement {
        constructor() {
          super();
          this.querySelectorAll('input')
          .forEach(element => element.addEventListener('change', this.onRangeChange.bind(this)));

          this.setMinAndMaxValues();
        }

        onRangeChange(event) {
          this.adjustToValidValues(event.currentTarget);
          this.setMinAndMaxValues();
        }

        setMinAndMaxValues() {
          const inputs = this.querySelectorAll('input');
          const minInput = inputs[0];
          const maxInput = inputs[1];
          if (maxInput.value) minInput.setAttribute('max', maxInput.value);
          if (minInput.value) maxInput.setAttribute('min', minInput.value);
          if (minInput.value === '') maxInput.setAttribute('min', 0);
          if (maxInput.value === '') minInput.setAttribute('max', maxInput.getAttribute('max'));
        }

        adjustToValidValues(input) {
          const value = Number(input.value);
          const min = Number(input.getAttribute('min'));
          const max = Number(input.getAttribute('max'));

          if (value < min) input.value = min;
          if (value > max) input.value = max;
        }
      }

      customElements.define('price-range', PriceRange);

      class FacetRemove extends HTMLElement {
        constructor() {
          super();
          this.querySelector('a').addEventListener('click', (event) => {
            event.preventDefault();
            const form = this.closest('facet-filters-form') || document.querySelector('facet-filters-form');
            form.onActiveFilterClick(event);
          });
        }
      }

      customElements.define('facet-remove', FacetRemove);
    },
    initInfiniteScrolling: function() {
      var tt_is_loading = !1
      e(".infinite-scrolling").length > 0 && e(".infinite-scrolling a.next").click(function(i) {
        i.preventDefault(), e(this).hasClass("disabled") || t.doInfiniteScrolling()
      })
    },
    doInfiniteScrolling: function() {
      var currentList = $('.col-main .products-grid-view');
      if (currentList) {
        var showMoreButton = $('.infinite-scrolling a.next').first();
        $.ajax({
          type: 'GET',
          url: showMoreButton.attr("href"),
          beforeSend: function() {
            t.showLoading();
            $('.loading-modal').show();
            tt_is_loading = !0
          },
          success: function(data) {
            t.hideLoading();
            var $container = $(".products-grid-view");
            var products = $(data).find(".col-main .products-grid-view");
            tt_is_loading = !1;
            if ($(data).find('.infinite-scrolling').length > 0) {
              showMoreButton.attr('href', $(data).find('.infinite-scrolling a.next').attr('href'))
            } else {
              showMoreButton.removeClass('next');
              showMoreButton.hide();
              showMoreButton.next().show()
            }
            if (products.length) {
              var len = (products.children().length);
              var loaded = $('.loadcount').html();
              var loa = parseInt(len) + parseInt(loaded);
              $('.loadcount').html(loa);
              $('.pag-product').html(loa);
              jQuery('.products-grid-view > div.product-short-list').each(function() {
                var prod_ven_unwrap = jQuery(this).find('.product-wrapper .product-description .short-title');
                jQuery(prod_ven_unwrap).children().unwrap()
              });
              $(".pro_btn.quick-view-wrap > a,.pro_btn.add_tocart form > a").click(function() {
                $(this).addClass("loading");
                setTimeout(function() {
                  $(".pro_btn.quick-view-wrap > a,.pro_btn.add_tocart form > a").removeClass("loading")
                }, 2000)
              }); 
              

              currentList.append(products.children());
              t.initQuickView();
              t.initAddToCart();
              t.initAddToCarts();
              t.initWishlist();
              $(".pro_btn.quick-view-wrap > a,.pro_btn.add_tocart form > a,.pro_btn.add-to-compare .add-in-compare-js").click(function(){$(this).addClass("loading");setTimeout(function(){$(".pro_btn.quick-view-wrap > a,.pro_btn.add_tocart form > a, .pro_btn.add-to-compare .add-in-compare-js").removeClass("loading")},2000)});
              countDownIni('.flip-countdown');
              if (localStorage.getItem('display') == 'grid') {
                jQuery('#grid-view').trigger('click')
              } else if (localStorage.getItem('display') == 'list') {
                jQuery('#list-view').trigger('click')
              } else if (localStorage.getItem('display') == 'short-list') {
                jQuery('#short-list-view').trigger('click')
              } else {
                jQuery('#grid-view').trigger('click')
              } 
              if (window.show_multiple_currencies && window.shop_currency != jQuery(".currencies li.active .currencies-a").val()) {
                Currency.convertAll(window.shop_currency, jQuery('.currencies li.active .currencies-a').val(), "span.money", "money_format")
              }
              t.initColorSwatchGrid();
              if ($(".spr-badges").length > 0) {
                return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()
              }
            }
          },
          error: function(xhr, text) {
            t.hideLoading();
            $('.loading-modal').hide();
            $('.ajax-error-message').text($.parseJSON(xhr.responseText).description);
            t.showModal('.ajax-error-modal')
          },
          dataType: "html"
        })
      }
    }
  }
  })(jQuery)