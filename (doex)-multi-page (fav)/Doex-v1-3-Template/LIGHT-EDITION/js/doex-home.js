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
  3. swiper slider
  4. cursor color
*/


$(function () {
    "use strict";


    setTimeout(function () {
		// 1. preloader
        $("#preloader").fadeOut(1200);
        $(".preloader-bg").delay(1000).fadeOut(1200);
    }, 2000);

    // 2. navigation
    // 2.1. navigation icon
    $(".navigation-icon").on("click", function () {
        $(this).toggleClass("active");
    });
    // 2.2. navigation panels
    $(".navigation-fire").on("click", function (e) {
        if ($(".panel-from-left, .panel-from-right, .panel-overlay-from-left, .panel-overlay-from-right").hasClass("open")) {
            $(".panel-from-left, .panel-from-right, .panel-overlay-from-left, .panel-overlay-from-right").removeClass("open");
        } else {
            $(".panel-from-left, .panel-from-right, .panel-overlay-from-left, .panel-overlay-from-right").addClass("open");
        }
    });
    // 2.3. navigation links
    $("nav.navigation-menu a").on("click", function (e) {
        $(".navigation-icon").removeClass("active");
        $(".panel-from-left, .panel-from-right, .panel-overlay-from-left, .panel-overlay-from-right").removeClass("open");
    });

    // 2.4. navigation hover state
    hoverMenu();
    imgMenu();
    function hoverMenu() {
        $(".menu li a").on("mouseenter", function () {
            var ref = $(this).data("ref"),
                menuImg = $('.menu-img[data-ref="' + ref + '"]');
            $(".menu li a").removeClass("active");
            $(this).addClass("active");
            $(".menu-img").removeClass("active");
            menuImg.addClass("active");
        });
    }
    function imgMenu() {
        $("[data-bg]").each(function () {
            var bg = $(this).data("bg");
            $(this).css({
                "background-image": 'url(' + bg + ')',
                "background-position": "center center",
                "background-size": "cover"
            });
        });
    }

    // 3. swiper slider
    var swiper = new Swiper(".swiper-container-wrapper .swiper-container", {
        autoplay: false,
		loop: true,
        speed: 1200,
        grabCursor: true,
        mousewheel: {
            enable: true
        },
        keyboard: true,
        simulateTouch: true,
        parallax: true,
        effect: "slide",
		pagination: {
            el: ".swiper-slide-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".slide-next",
            prevEl: ".slide-prev"
        }
    });
	
	// 4. cursor color
    $(".logo, .navigation-icon, li a, .button-the-light").on({
        "mouseenter": function() {
            $(".cursor").removeClass("cursor-color");
        },
        "mouseleave": function() {
            $(".cursor").addClass("cursor-color");
        }
    });


});