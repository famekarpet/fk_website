(function($) {

    "use strict";

    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation-holder");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $(".navigation-holder .close-navbar");
        var navLinks = $("#navbar > ul > li > a:not(.dropdown-toggle)");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;
        })

        navLinks.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;
        })
    }

    toggleMobileNavigation();

    //Dropdown Menu
    $(document).ready(function() {
        $('.site-header .navbar-nav li.dropdown').hover(function () {
                $('.site-header .navbar-nav ul.dropdown-menu').css("display", "block");
            },
            function() {
                $('.site-header .navbar-nav ul.dropdown-menu').css("display", "none");
            },
        );


    });

    //ACTIVE CURRENT MENU WHILE SCROLLING
    // function for active menuitem
    function activeMenuItem($links) {
        var top = $(window).scrollTop(),
            windowHeight = $(window).height(),
            documentHeight = $(document).height(),
            cur_pos = top + 2,
            sections = $("section"),
            nav = $links,
            nav_height = nav.outerHeight(),
            home = nav.find(" > ul > li:first"),
            contact = nav.find(" > ul > li:last");


        sections.each(function() {
            var top = $(this).offset().top - nav_height - 40,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("> ul > li > a").parent().removeClass("current-menu-item");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("current-menu-item");
            } else if (cur_pos === 2) {
                nav.find("> ul > li > a").parent().removeClass("current-menu-item");
                home.addClass("current-menu-item");
            } else if($(window).scrollTop() + windowHeight > documentHeight - 400) {
                nav.find("> ul > li > a").parent().removeClass("current-menu-item");
                contact.addClass("current-menu-item");
            }
        });
    }


    // smooth-scrolling
    function smoothScrolling($links, $topGap) {
        var links = $links;
        var topGap = $topGap;

        links.on("click", function() {
            //console.log("asdf");
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top - topGap
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }



    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var parallaxSpeed = $(this).data("speed");
                var doParallax = -(resize / parallaxSpeed);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });

                if ( window.innerWidth < 768) {
                    $(this).css({
                        backgroundPosition: "center center"
                    });
                }
            });
        }
    }

    bgParallax();


    function onViewAnimation($section, $targetElem, $animationClass) {
        var section = $section,
            targetElem = $targetElem,
            animationClass = $animationClass;

        if (section.length) {
            section.appear();
            $(document.body).on('appear', 'section', function() {
                var current_item = $(this).find(targetElem);
                if (!current_item.hasClass($animationClass)) {
                    current_item.addClass($animationClass);
                }
            });

            $(document.body).on('disappear', 'section', function() {
                var current_item = $(this).find(targetElem);
                if (current_item.hasClass(animationClass)) {
                    current_item.removeClass(animationClass);
                }
            });
        }
    }



    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function() {
                var $this = $(this);
                var img = $this.find(".slider-bg").attr("src");

                $this.css({
                    backgroundImage: "url("+ img +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }


    //Setting hero slider
    function heroSlider() {
        if ($(".hero-slider").length) {
            $(".hero-slider").slick({
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" class="slick-next">Next</button>',
                dots: true,
                fade: true,
                cssEase: 'linear'
            });
        }
    }


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    $(window).load(function() {
        $('.galaxy .preloader').fadeOut();
        $('.galaxy .preloader').delay(150).fadeOut('slow');

        //Active heor slider
        heroSlider();

        if ($(".hero-s1").length) {
            $(".hero-s1 .hero-phone").addClass("hero-phone-animation");
        }

        // product landing hero watch animation
        if ($(".hero-watch").length) {
            $(".hero-watch").addClass("hero-watch-animation");
        }
    });

    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    $(window).load(function() {
        if ($(".galaxy .video-play").length) {
            $('.video-play').magnificPopup({
                type: 'iframe'
            });
        }
    });

    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
                enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }


    /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".sortable-gallery .sorting-filters").length) {
            var $container = $('.sorting-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".sorting-filters li a").on("click", function() {
                $('.sorting-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery();


    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid =  $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    masonryGridSetting();


    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.header-style-1 .navigation').length) {
        cloneNavForSticyMenu($('.header-style-1 .navigation'), "sticky");
    }

    // clone home style 2 navigation for sticky menu
    if ($('.header-style-2 .navigation').length) {
        cloneNavForSticyMenu($('.header-style-2 .navigation'), "sticky");
    }

    // clone home style 3 navigation for sticky menu
    if ($('.header-style-3 .navigation').length) {
        cloneNavForSticyMenu($('.header-style-3 .navigation'), "sticky");
    }

    // Function for sticky menu
    function stickIt($stickyClass, $toggleClass) {

        if ($(window).scrollTop() >= 300) {
            var orgElement = $(".original");
            var coordsOrgElement = orgElement.offset();
            var leftOrgElement = coordsOrgElement.left;
            var widthOrgElement = orgElement.css("width");

            $stickyClass.addClass($toggleClass);

            $stickyClass.css({
                "width": widthOrgElement
            }).show();

            $(".original").css({
                "visibility": "hidden"
            });

        } else {

            $(".original").css({
                "visibility": "visible"
            });

            $stickyClass.removeClass($toggleClass);
        }
    }


    /*------------------------------------------
        = FUN FACT COUNT
    -------------------------------------------*/
    if ($(".galaxy .start-count").length) {
        $('.galaxy .counter').appear();
        $(document.body).on('appear', '.counter', function(e) {
            var $this = $(this),
                countTo = $this.attr('data-count');

            $({ countNum: $this.text()}).animate({
                countNum: countTo
            }, {
                duration: 3000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }


    /*------------------------------------------
        = app screenshot slider
    -------------------------------------------*/
    if ($(".app-screenshot-slider").length) {
        $(".app-screenshot-slider").owlCarousel({
            loop:true,
            margin:50,
            items: 1,
            smartSpeed: 700,
            autoplay: false,
            nav: false,
        });
        $('.app-screenshot-slider .owl-nav').addClass('d-none');
    }


    /*------------------------------------------
        = APP LANDING PRICING TAB SWITCHER
    -------------------------------------------*/
    if ($(".switcher-wrapper").length) {
        var switcher = $(".switcher-wrapper .switch");
        var pricingTab = $(".pricing-tab");
        var tablist = $(".switcher-wrapper .tablist");


        switcher.on("click", function() {
            var $this = $(this);
            $this.find(".slider").toggleClass("slide-off");
            pricingTab.children(".app-pricing-grids").toggleClass("active-grids");
            tablist.children("span").toggleClass("active");
        })
    }


    /*------------------------------------------
        = APP LANDING TESTIMONIALS SLIDER
    -------------------------------------------*/
    if ($(".app-landing-testimonials-slider").length) {
        $(".app-landing-testimonials-slider").owlCarousel({
            //autoplay:true,
            mouseDrag: false,
            margin: 30,
            smartSpeed:300,
            loop:true,
            nav: true,
            navText: [ '<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>' ],
            responsive: {
                0 : {
                    items: 1
                },

                992 : {
                    items: 2
                }
            }
        });
    }


    /*-------------------------------------------------------------
        = POPUP GOOGLE MAP FOR APP LANDING PAGE CONTACT SECTION
    -------------------------------------------------------------*/
    $(window).load(function() {
        if ($(".galaxy .map-link").length) {
            $('.map-link').magnificPopup({
                type: 'iframe'
            });
        }
    });


    /*------------------------------------------
        = AGENCY PAGE PROJECTS SLIDER
    -------------------------------------------*/
    if ($(".agnecy-projects-slider").length) {
        $(".agnecy-projects-slider").owlCarousel({
            mouseDrag: false,
            margin: 25,
            smartSpeed:300,
            loop:true,
            center: true,
            nav: true,
            navText: [ '<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>' ],
            responsive: {
                0 : {
                    items: 1
                },

                500 : {
                    items: 2,
                    center: false
                },

                768 : {
                    items: 3
                },

                1500 : {
                    items: 3
                },

                1700 : {
                    items: 5
                }
            }
        });
    }


    /*------------------------------------------
        = AGENCY BLOG SLIDER
    -------------------------------------------*/
    if ($(".agency-blog-slider").length) {
        $(".agency-blog-slider").owlCarousel({
            mouseDrag: false,
            margin: 25,
            smartSpeed:300,
            loop:true,
            nav: true,
            navText: [ '<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>' ],
            responsive: {
                0 : {
                    items: 1
                },

                600 : {
                    items: 2,
                    center: false
                },

                992 : {
                    items: 3
                }
            }
        });
    }


    /*------------------------------------------
        = AGENCY TESTIMONIALS SLIDER
    -------------------------------------------*/
    if ($(".agency-testimonial-slider").length) {
        $(".agency-testimonial-slider").owlCarousel({
            items: 1,
            mouseDrag: false,
            smartSpeed:300,
            loop:true,
            nav: true,
            navText: [ '<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>' ],

        });
    }


    /*------------------------------------------
        = SIDE MENU
    -------------------------------------------*/
    function toggleAgencyHomeSideMenu() {
        if ($(".home-with-side-menu").length) {
            var sideMenu = $("nav.original .side-menu .side-menu-inner");
            var navBar = $("nav.original .navigation-holder");
            var sideMenuOpenBtn = $(".side-menu .side-menu-open-btn");
            var sideMenuCloseBtn = $(".side-menu .side-menu-close-btn");

            $(document.body).append(sideMenu);


            navBar.clone().insertAfter(sideMenu.find(".logo"));

            sideMenuOpenBtn.on("click", function(e) {
                sideMenu.toggleClass("toggle-side-menu");
                return false;
            })

            sideMenuCloseBtn.on("click", function(e) {
                sideMenu.toggleClass("toggle-side-menu");
                return false;
            })
        }
    }


    /*-----------------------------------------------------
        =  CV  HOME PAGE PORTFOLIO MOUSE HOVER EFFECT
    ------------------------------------------------------*/
    if ($(".cv-portfolio-grids .box-inner").length) {
        $(".cv-portfolio-grids .box-inner").on("mousemove", function(e) {
            var parentOffset = $(this).parent().offset();
            var relX = e.pageX - parentOffset.left;
            var relY = e.pageY - parentOffset.top;

            $('.cv-portfolio .box-inner i').css({'top': relY});
            $('.cv-portfolio .box-inner i').css({'left': relX});
        })
    }


    /*------------------------------------------
        = HOME CV BOTTOM MENU STICKY
    -------------------------------------------*/
    function homeCvBottomMenuSticky() {
        if ($(".menu-after-slider").length) {

            var pageWrapper = $(".galaxy .page-wrapper");
            var bottomMenu = $(".menu-after-slider");
            var stickyBottomMenu = bottomMenu.offset().top;

            $(window).on("scroll", function() {
                if ($(window).scrollTop() > stickyBottomMenu && window.innerWidth > 991) {
                    bottomMenu.addClass('home-cv-sticky');
                    pageWrapper.css({
                        'padding-top': bottomMenu.innerHeight() + 'px'
                    })
                } else {
                    bottomMenu.removeClass('home-cv-sticky');
                    pageWrapper.css({
                        'padding-top': 0
                    })
                }
            })
        }
    }

    homeCvBottomMenuSticky();


    /*------------------------------------------
        = PRODUCT LANDING CTA EFFECT
    -------------------------------------------*/
    function productLandingCtaAnimation() {
        var section = $(".product-landing-cta");
        var nextSection = section.next();
        var top = section.offset().top;

        if ($(window).scrollTop() >= top && $(window).innerWidth() > 992) {
            section.addClass("active-cta-text");
        }
        else {
            section.removeClass("active-cta-text");
        }
    }


    /*------------------------------------------
        = RSVP FORM SUBMISSION
    -------------------------------------------*/
    if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: "required",

                topic: {
                    required: true
                }
            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email",
                topic: "Select your consult topic",
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                            $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                            $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });

                return false; // required to block normal submit since you used ajax
            }
        });
    }



    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
    $(window).load(function() {

        sliderBgSetting();

        toggleMobileNavigation();

        smoothScrolling($(".navigation-holder > ul > li > a"), 80);

        masonryGridSetting();

        sortingGallery();

        // App landing page funfact mobile animation
        onViewAnimation($(".mobile-holder"), $(".mobile-holder img"), "mobile-holder-img-animation");

        // App landing page hero slider mobile animation
        onViewAnimation($(".hero-s1"), $(".hero-s1 .hero-phone"), "hero-phone-animation");

        // App landing page how app works mobile animation
        onViewAnimation($(".how-app-works"), $(".how-app-works .app-mobile"), "how-appworks-phone-animation");

        // App landing page FAQ tab animation
        onViewAnimation($(".app-landing-faq"), $(".app-landing-faq .app-faq-tab"), "app-faq-tab-animation");

        // product landing hero watch animation
        onViewAnimation($(".hero-watch"), $(".hero-watch"), "hero-watch-animation");

        // product landing services watch animation
        onViewAnimation($(".services-watch"), $(".services-watch"), "services-watch-animation");

        // product landing faq watch animation
        onViewAnimation($(".faq-watch"), $(".faq-watch"), "faq-watch-animation");


        // side menu
        toggleAgencyHomeSideMenu();

        if ($(".side-menu-inner")) {
            smoothScrolling($(".side-menu-inner .navigation-holder > ul > li > a"), 80);
        }

    });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).scroll(function() {

        bgParallax();

        if ($(".header-style-1").length) {
            stickIt($(".sticky"), "sticky-on");
        }

        if ($(".header-style-2").length) {
            stickIt($(".sticky"), "sticky-on");
        }

        activeMenuItem($(".navigation-holder"));

        if ($(".product-landing-cta").length) {
            productLandingCtaAnimation();
        }

    });


    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).resize(function() {

        if ($(".header-style-1").length) {
            stickIt($(".sticky"), "sticky-on");
        }

        if ($(".header-style-2").length) {
            stickIt($(".sticky"), "sticky-on");
        }

        homeCvBottomMenuSticky();

    });

    /*------------------------------------------
       = ANIMATED SVG ICON
   -------------------------------------------*/
    if ($(".app-landing-home").length) {
        new Vivus('app-features-icon', {duration: 400});
        new Vivus('app-features-icon2', {duration: 400});
        new Vivus('app-features-icon3', {duration: 400});
        new Vivus('app-features-icon4', {duration: 400});
        new Vivus('app-features-icon5', {duration: 400});
        new Vivus('app-features-icon6', {duration: 400});
        new Vivus('app-documentation-icon', {duration: 200});
        new Vivus('app-documentation-icon2', {duration: 200});
        new Vivus('how-app-works-icon', {duration: 400});
        new Vivus('how-app-works-icon2', {duration: 400});
        new Vivus('how-app-works-icon3', {duration: 400});
        new Vivus('how-app-works-icon4', {duration: 400});
    }

    if ($(".home-agency").length) {
        new Vivus('agency-sevices-icon', {duration: 200});
        new Vivus('agency-sevices-icon2', {duration: 200});
        new Vivus('agency-sevices-icon3', {duration: 200});
    }

    if ($(".home-cv").length) {
        new Vivus('agency-sevices-icon', {duration: 200});
        new Vivus('agency-sevices-icon2', {duration: 200});
        new Vivus('agency-sevices-icon3', {duration: 200});
    }

    if ($(".product-landing-home").length) {
        new Vivus('p-landing-services-icon', {duration: 200});
        new Vivus('p-landing-services-icon-2', {duration: 200});
        new Vivus('p-landing-services-icon-3', {duration: 200});
    }



})(window.jQuery);
