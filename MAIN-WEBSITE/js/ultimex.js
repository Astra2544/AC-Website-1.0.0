/*
  [JS Index]
  
  ---
  
  Template Name: Ultimex - One Page Portfolio Template
  Author:  ex-nihilo
  Version: 1.2
*/


/*
  1. preloader

  2. lifting control
  3. mobile menu closer
  4. owl carousel
    4.1. owl about carousel
    4.2. owl services carousel
    4.3. owl works carousel
	4.4. owl news carousel
	4.5. owl contact carousel
  5. magnificPopup
    5.1. magnificPopup single
	5.2. magnificPopup gallery
  6. swiper slider
  7. facts counter
  8. chart skills
  9. clone function
    9.1. vertical lines
  10. contact form
*/


$(function() {
    "use strict";
	
	
    $(window).on("load", function() {
        // Preloader wird via CSS gesteuert
        // Preloader wird via CSS gesteuert
        // Preloader wird via CSS gesteuert
    });
	
    // 2. lifting control
    $(".navbar-collapse ul li a").on("click", function(e) {
        e.preventDefault();
        animateSlider(this.hash);
    });
    function animateSlider(hash) {
        if (!$("#containerOT div.open").length) {
            if (hash == "#about") {
                openPopup(hash);
            }
            if (hash == "#services") {
                openPopup(hash);
            }
            if (hash == "#works") {
                openPopup(hash);
            }
            if (hash == "#news") {
                openPopup(hash);
            }
            if (hash == "#contact") {
                openPopup(hash);
            }
        } else {
            if (hash == "#home") {
                openAndClose(hash);
                $("#overlay").fadeOut(600);
            }
            if (hash == "#about") {
                openAndClose(hash);
            }
            if (hash == "#services") {
                openAndClose(hash);
            }
            if (hash == "#works") {
                openAndClose(hash);
            }
            if (hash == "#news") {
                openAndClose(hash);
            }
            if (hash == "#contact") {
                openAndClose(hash);
            }
        }
    }
    function openPopup(hash) {
        $(hash + "-lifting").slideToggle().addClass("open");
        $("#overlay").fadeIn(600);
    }
    function openAndClose(hash) {
        if ($(hash + "-lifting").hasClass("open")) {
            $($(hash + "-lifting")).slideToggle().removeClass();
            $("#overlay").fadeOut(600);
        } else {
            $("#containerOT div.open").slideToggle().removeClass();
            $(hash + "-lifting").slideToggle().addClass("open");
        }
    }
    $("#overlay").on("click", function() {
        $("#containerOT div.open").slideToggle().removeClass();
        $("#overlay").fadeOut(600);
    });
	
    // 3. mobile menu closer
    $(".navbar-collapse ul li a").on("click", function() {
        $(".navbar-toggle:visible").click();
    });
	
    // 4. owl carousel
    // 4.1. owl about carousel
    $("#about-carousel").owlCarousel({
        loop: true,
        center: false,
        items: 1,
        margin: 20,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 4000,
		autoHeight: true,
        smartSpeed: 450,
        nav: true,
        navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"],
        navContainer: '.owl-nav-custom-about',
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    // 4.2. owl services carousel
    $("#services-carousel").owlCarousel({
        loop: true,
        center: false,
        items: 1,
        margin: 20,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 4000,
		autoHeight: true,
        smartSpeed: 450,
        nav: true,
        navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"],
        navContainer: '.owl-nav-custom-services',
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    // 4.3. owl works carousel
    $("#works-carousel").owlCarousel({
        loop: false,
        center: false,
        items: 1,
        margin: 20,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 4000,
		autoHeight: true,
        smartSpeed: 450,
        nav: true,
        navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"],
        navContainer: '.owl-nav-custom-works',
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    // 4.4. owl news carousel
    $("#news-carousel").owlCarousel({
        loop: false,
        center: false,
        items: 1,
        margin: 20,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 4000,
		autoHeight: true,
        smartSpeed: 450,
        nav: true,
        navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"],
        navContainer: '.owl-nav-custom-news',
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    // 4.5. owl contact carousel
    $("#contact-carousel").owlCarousel({
        loop: true,
        center: false,
        items: 1,
        margin: 20,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 4000,
		autoHeight: true,
        smartSpeed: 450,
        nav: true,
        navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"],
        navContainer: '.owl-nav-custom-contact',
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
	
    // 5. magnificPopup
    // 5.1. magnificPopup single
    $(".popup-photo-single").magnificPopup({
        type: "image",
        gallery: {
            enabled: false
        },
        removalDelay: 100,
        mainClass: "mfp-fade"
    });
    // 5.2. magnificPopup gallery
    $(".popup-photo-gallery").each(function() {
        $(this).magnificPopup({
            delegate: "a",
            type: "image",
            gallery: {
                enabled: true
            },
            removalDelay: 100,
            mainClass: "mfp-fade"
            // fixedContentPos: false
        });
    });
	
    // 6. swiper slider
    var swiper = new Swiper(".hero-slider .swiper-container", {
        preloadImages: false,
        loop: true,
        resistance: true,
        resistanceRatio: 0.85,
        parallax: false,
        effect: "slide",
        mousewheel: {
            enable: true
        },
        grabCursor: true,
        centeredSlides: false,
        speed: 1500,
        spaceBetween: 0,
        initialSlide: 0,
        pagination: {
            el: ".swiper-slide-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".slide-next",
            prevEl: ".slide-prev"
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            768: {
                pagination: false
            }
        },
        on: {
            init: function() {
                updateIndicators(this.realIndex);
            },
            slideChange: function() {
                updateIndicators(this.realIndex);
            }
        }
    });
    
    // Function to update area indicators
    function updateIndicators(index) {
        var indicators = document.querySelectorAll('.area-indicator');
        indicators.forEach(function(ind, i) {
            ind.classList.remove('active');
            if (i === index) {
                ind.classList.add('active');
            }
        });
        
        // Update CSS color variables based on current slide
        updateAreaColors(index);
    }
    
    // Function to update area colors dynamically
    function updateAreaColors(index) {
        var root = document.documentElement;
        var colors = [
            { color: '#00d4ff', rgb: '0, 212, 255' },    // Development - Cyan
            { color: '#00ff88', rgb: '0, 255, 136' },    // Ecom - Green
            { color: '#ffaa00', rgb: '255, 170, 0' },    // Consulting - Gold
            { color: '#aa00ff', rgb: '170, 0, 255' }     // Vending - Purple
        ];
        
        var current = colors[index] || colors[0];
        
        root.style.setProperty('--current-area-color', current.color);
        root.style.setProperty('--current-area-color-glow', 'rgba(' + current.rgb + ', 0.5)');
        root.style.setProperty('--current-area-color-dim', 'rgba(' + current.rgb + ', 0.3)');
        root.style.setProperty('--current-area-color-bg', 'rgba(' + current.rgb + ', 0.05)');
    }
    
    // Initialize colors on page load
    updateAreaColors(0);
    
    var imgSwiper = new Swiper(".hero-slider-img .swiper-container", {
        preloadImages: false,
        loop: true,
        resistance: true,
        parallax: true,
        effect: "slide",
        initialSlide: 0,
        mousewheel: {
            enable: true
        }
    });
    swiper.controller.control = imgSwiper;
    imgSwiper.controller.control = swiper;
    
    // Make swiper globally accessible
    window.astraSwiper = swiper;
    
    // Area indicator click handlers
    var indicators = document.querySelectorAll('.area-indicator');
    indicators.forEach(function(indicator, index) {
        indicator.addEventListener('click', function() {
            swiper.slideToLoop(index, 1500);
        });
    });
    var playButton = $(".swiper-slide-controls-play-pause-wrapper");
    function autoEnd() {
        playButton.removeClass("slider-on-off");
        swiper.autoplay.stop();
    }
    function autoStart() {
        playButton.addClass("slider-on-off");
        swiper.autoplay.start();
    }
    playButton.on("click", function() {
        if (playButton.hasClass("slider-on-off")) autoEnd();
        else autoStart();
        return false;
    });
	
    // 7. facts counter
    $(".facts-counter-number").appear(function() {
        var count = $(this);
        count.countTo({
            from: 0,
            to: count.html(),
            speed: 1200,
            refreshInterval: 60
        });
    });
	
    // 8. chart skills
    $(".chart-appear-skills").appear(function() {
        $(".chart-skills").easyPieChart({
            easing: "easeOutBounce",
            onStep: function(from, to, percent) {
                $(this.el).find(".percent-skills").text(Math.round(percent));
            }
        });
    });
	
	// 9. clone function
    $.fn.duplicate = function(count, cloneEvents, callback) {
        var stack = [],
            el;
        while (count--) {
            el = this.clone(cloneEvents);
            callback && callback.call(el);
            stack.push(el.get()[0]);
        }
        return this.pushStack(stack);
    };
    // 9.1. vertical lines
    $("<div class='vertical-lines-wrapper'></div>").appendTo(".vertical-lines");
    $("<div class='vertical-effect'></div>").duplicate(3).appendTo(".vertical-lines-wrapper");
	
    // 10. contact form
    $("form#form").on("submit", function() {
        $("form#form .error").remove();
        var s = !1;
        if ($(".requiredField").each(function() {
                if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error">This field is required</span>'), $(this).addClass(
                    "inputError"), s = !0;
                else if ($(this).hasClass("email")) {
                    var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error">Invalid email address</span>'), $(this).addClass(
                        "inputError"), s = !0);
                }
            }), !s) {
            $("form#form input.submit").fadeOut("normal", function() {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function() {
                $("form#form").slideUp("fast", function() {
                    $(this).before('<div class="success">Your email was sent successfully.</div>');
                });
            });
        }
        return !1;
    });
	
	
});