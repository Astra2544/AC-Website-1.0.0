/*
  Astra Capital e.U. - Swiper Sync
*/

$(function() {
    "use strict";
    
    var indicators = document.querySelectorAll('.area-indicator');
    
    function updateIndicators(index) {
        indicators.forEach(function(ind, i) {
            ind.classList.remove('active');
            if (i === index) ind.classList.add('active');
        });
    }
    
    function initSwiperSync() {
        var swiperEl = document.querySelector('.hero-slider .swiper-container');
        if (!swiperEl || !swiperEl.swiper) {
            setTimeout(initSwiperSync, 200);
            return;
        }
        
        var swiper = swiperEl.swiper;
        updateIndicators(swiper.realIndex);
        
        swiper.on('slideChange', function() {
            updateIndicators(this.realIndex);
        });
        
        indicators.forEach(function(indicator, index) {
            indicator.addEventListener('click', function() {
                swiper.slideToLoop(index, 1500);
            });
        });
    }
    
    setTimeout(initSwiperSync, 500);
});
