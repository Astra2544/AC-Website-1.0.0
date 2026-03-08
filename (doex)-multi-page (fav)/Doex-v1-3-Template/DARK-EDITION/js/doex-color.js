/*
  [JS Index]
  
  ---
  
  Template Name: Doex - Creative Portfolio Template
  Author:  ex-nihilo
  Version: 1.3
*/


/*
  1. extras
*/


$(function() {
    "use strict";
	
	
    $(window).on("scroll", function() {
		
        // 1. extras
        if ($(this).scrollTop() > 500) {
			$(".line").removeClass("line-color").addClass("line-color-2");
			$(".cursor").removeClass("cursor-color-3").addClass("cursor-color");
			$(".navigation-menu").removeClass("navigation-menu-color");
        } else {
			$(".line").addClass("line-color").removeClass("line-color-2");
			$(".cursor").addClass("cursor-color-3").removeClass("cursor-color");
			$(".navigation-menu").addClass("navigation-menu-color");
        }
    });
	
	
});