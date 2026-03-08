/*
  Astra Capital e.U. - Custom JavaScript
  Theme Toggle, Enhanced Slider & Custom Interactions
*/

$(function() {
    "use strict";
    
    // ============================================
    // THEME TOGGLE FUNCTIONALITY
    // ============================================
    
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const lightThemeLink = document.getElementById('light-theme');
    
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('astra-theme') || 'dark';
    setTheme(savedTheme);
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('astra-theme', newTheme);
        });
    }
    
    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        
        if (lightThemeLink) {
            if (theme === 'light') {
                lightThemeLink.disabled = false;
            } else {
                lightThemeLink.disabled = true;
            }
        }
        
        // Update body class for additional styling hooks
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add('theme-' + theme);
    }
    
    
    // ============================================
    // AREA INDICATORS CLICK FUNCTIONALITY
    // ============================================
    
    const areaIndicators = document.querySelectorAll('.area-indicator');
    
    areaIndicators.forEach(function(indicator) {
        indicator.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            
            // Trigger swiper to go to this slide
            if (typeof swiper !== 'undefined' && swiper.slideTo) {
                swiper.slideTo(slideIndex);
            }
            
            // Update active state
            areaIndicators.forEach(function(ind) {
                ind.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    
    // ============================================
    // SWIPER SLIDE CHANGE HANDLER
    // ============================================
    
    // Wait for swiper to be initialized
    setTimeout(function() {
        if (typeof swiper !== 'undefined') {
            swiper.on('slideChange', function() {
                const activeIndex = swiper.realIndex;
                
                // Update area indicators
                areaIndicators.forEach(function(indicator, index) {
                    indicator.classList.remove('active');
                    if (index === activeIndex) {
                        indicator.classList.add('active');
                    }
                });
            });
        }
    }, 1000);
    
    
    // ============================================
    // COMING SOON LINK PREVENTION
    // ============================================
    
    const comingSoonLinks = document.querySelectorAll('.coming-soon-link');
    
    comingSoonLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show a subtle notification
            showNotification('Dieser Bereich ist demnächst verfügbar!');
        });
    });
    
    
    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    
    function showNotification(message) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.astra-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'astra-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(-20px);
            background: rgba(255, 38, 74, 0.95);
            color: #fff;
            padding: 15px 30px;
            border-radius: 8px;
            font-family: 'Raleway', sans-serif;
            font-size: 14px;
            font-weight: 500;
            z-index: 99999;
            opacity: 0;
            transition: all 0.4s ease;
            box-shadow: 0 10px 40px rgba(255, 38, 74, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(function() {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(function() {
                notification.remove();
            }, 400);
        }, 3000);
    }
    
    // Make notification function globally available
    window.showAstraNotification = showNotification;
    
    
    // ============================================
    // SMOOTH REVEAL ON LOAD
    // ============================================
    
    $(window).on("load", function() {
        // Add loaded class to body for CSS animations
        setTimeout(function() {
            document.body.classList.add('page-loaded');
        }, 100);
    });
    
    
    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    
    document.addEventListener('keydown', function(e) {
        // Left arrow - previous slide
        if (e.key === 'ArrowLeft') {
            if (typeof swiper !== 'undefined' && swiper.slidePrev) {
                swiper.slidePrev();
            }
        }
        // Right arrow - next slide
        if (e.key === 'ArrowRight') {
            if (typeof swiper !== 'undefined' && swiper.slideNext) {
                swiper.slideNext();
            }
        }
        // T key - toggle theme
        if (e.key === 't' || e.key === 'T') {
            if (themeToggle) {
                themeToggle.click();
            }
        }
    });
    
    
    // ============================================
    // PARALLAX EFFECT ON MOUSE MOVE
    // ============================================
    
    const heroSection = document.querySelector('.hero-fullscreen');
    
    if (heroSection && window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            const bgElements = document.querySelectorAll('.hero-slider-bg');
            bgElements.forEach(function(el) {
                el.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
            });
        });
    }
    
    
    // ============================================
    // PRELOADER ENHANCEMENT
    // ============================================
    
    // Custom preloader timing
    $(window).on("load", function() {
        setTimeout(function() {
            $("#preloader").addClass('fade-out');
            $(".preloader-bg").addClass('fade-out');
        }, 500);
        
        setTimeout(function() {
            $("#preloader").fadeOut(600);
            $(".preloader-bg").fadeOut(600);
        }, 800);
    });
    
    
    // ============================================
    // CONSOLE BRANDING
    // ============================================
    
    console.log('%c Astra Capital e.U. ', 'background: #ff264a; color: white; font-size: 20px; font-weight: bold; padding: 10px 20px;');
    console.log('%c Powered by Astra Development ', 'color: #ff264a; font-size: 12px;');
    
});
