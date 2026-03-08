/*
  [JS Index]
  
  ---
  
  Template Name: Doex - Creative Portfolio Template
  Author:  ex-nihilo
  Version: 1.3
*/


/*
  1. preloader
  2. navigation
    2.1. navigation icon
	2.2. navigation panels
	2.3. navigation links
	2.4. navigation hover state
  3. owlCarousel
  4. hide on scroll
  5. to top arrow + NAV
  6. magnificPopup
  7. chart skills
  8. page scroll
  9. cursor color
  10. contact form
*/


$(function() {
    "use strict";
	
	
    setTimeout(function() {
        // 1. preloader
        $("#preloader").fadeOut(1200);
        $(".preloader-bg").delay(1000).fadeOut(1200);
    }, 2000);
	
    // 2. navigation
    // 2.1. navigation icon
    $(".navigation-icon").on("click", function() {
        $(this).toggleClass("active");
    });
    // 2.2. navigation panels
    $(".navigation-fire").on("click", function(e) {
        if ($(".panel-from-left, .panel-from-right, .panel-overlay-from-left, .panel-overlay-from-right").hasClass("open")) {
            $(".panel-from-left, .panel-from-right, .panel-overlay-from-left, .panel-overlay-from-right").removeClass("open");
        } else {
            $(".panel-from-left, .panel-from-right, .panel-overlay-from-left, .panel-overlay-from-right").addClass("open");
        }
    });
    // 2.3. navigation links
    $("nav.navigation-menu a").on("click", function(e) {
        $(".navigation-icon").removeClass("active");
        $(".panel-from-left, .panel-from-right, .panel-overlay-from-left, .panel-overlay-from-right").removeClass("open");
    });
    // 2.4. navigation hover state
    hoverMenu();
    imgMenu();
    function hoverMenu() {
        $(".menu li a").on("mouseenter", function() {
            var ref = $(this).data("ref"),
                menuImg = $('.menu-img[data-ref="' + ref + '"]');
            $(".menu li a").removeClass("active");
            $(this).addClass("active");
            $(".menu-img").removeClass("active");
            menuImg.addClass("active");
        });
    }
    function imgMenu() {
        $("[data-bg]").each(function() {
            var bg = $(this).data("bg");
            $(this).css({
                "background-image": 'url(' + bg + ')',
                "background-position": "center center",
                "background-size": "cover"
            });
        });
    }
	
    // 3. owlCarousel
    $("#project").owlCarousel({
        loop: true,
        center: true,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1,
                margin: 30
            },
            768: {
                items: 1,
                margin: 30
            },
            980: {
                items: 2,
                margin: 40
            },
            1240: {
                items: 2,
                margin: 50
            }
        }
    });
    $("#about").owlCarousel({
        loop: true,
        center: false,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1,
                margin: 30
            },
            768: {
                items: 1,
                margin: 30
            },
            980: {
                items: 2,
                margin: 40
            },
            1240: {
                items: 3,
                margin: 50
            }
        }
    });
	
    $(window).on("scroll", function() {
        // 4. hide on scroll
        $(".main-title, .section-header-home, .scroll-line").css("opacity", 1 - $(window).scrollTop() / 500);
		
        // 5. to top arrow + NAV
        if ($(this).scrollTop() > 500) {
            $(".to-top-arrow").addClass("show");
			$(".navigation-icon-wrapper-bg").addClass("show");
			$(".navigation-icon-wrapper").addClass("direction");
        } else {
            $(".to-top-arrow").removeClass("show");
			$(".navigation-icon-wrapper-bg").removeClass("show");
			$(".navigation-icon-wrapper").removeClass("direction");
        }
    });
	
    // 6. magnificPopup
    $(".popup-photo-gallery").each(function() {
        $(this).magnificPopup({
            delegate: "a",
            type: "image",
            gallery: {
                enabled: true
            },
            removalDelay: 100,
            mainClass: "mfp-fade",
            fixedContentPos: false
        });
    });
	
    // 7. chart skills
    $(".chart-appear-skills").appear(function() {
        $(".chart-skills").easyPieChart({
            easing: "easeOutBounce",
            onStep: function(from, to, percent) {
                $(this.el).find(".percent-skills").text(Math.round(percent));
            }
        });
    });
	
    // 8. page scroll
    $(".page-scroll").on("click", function(e) {
        var $anchor = $(this);
        $("html, body").stop().animate({
            scrollTop: $($anchor.attr("href")).offset().top - 0
        }, 1500, 'easeInOutExpo');
        e.preventDefault();
    });
	
    // 9. cursor color
    $(".carousel-item-all, #project, .works-section-gallery-box, .logo, .navigation-icon, li a, .img-project-all").on({
        "mouseenter": function() {
            $(".cursor").removeClass("cursor-color");
        },
        "mouseleave": function() {
            $(".cursor").addClass("cursor-color");
        }
    });
	//
    $(".bg-1, .works-list-content").on({
        "mouseenter": function() {
            $(".cursor").addClass("cursor-color-2");
        },
        "mouseleave": function() {
            $(".cursor").removeClass("cursor-color-2");
        }
    });
	
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