/*
  Astra Capital e.U. - Custom JavaScript
  Theme Toggle, Slider Synchronization & Custom Interactions
*/

// Wait for DOM and all scripts to be ready
document.addEventListener('DOMContentLoaded', function() {
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
            lightThemeLink.disabled = (theme !== 'light');
        }
        
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add('theme-' + theme);
    }
    
    
    // ============================================
    // COMING SOON LINK PREVENTION
    // ============================================
    
    const comingSoonLinks = document.querySelectorAll('.coming-soon-link');
    
    comingSoonLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Dieser Bereich ist demnächst verfügbar!');
        });
    });
    
    
    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    
    function showNotification(message) {
        const existingNotification = document.querySelector('.astra-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
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
        
        setTimeout(function() {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(function() {
                notification.remove();
            }, 400);
        }, 3000);
    }
    
    window.showAstraNotification = showNotification;
    
    
    // ============================================
    // CONSOLE BRANDING
    // ============================================
    
    console.log('%c Astra Capital e.U. ', 'background: #ff264a; color: white; font-size: 20px; font-weight: bold; padding: 10px 20px;');
    console.log('%c Powered by Astra Development ', 'color: #ff264a; font-size: 12px;');
});


// ============================================
// SWIPER & AREA INDICATORS SYNCHRONIZATION
// This runs after jQuery and Swiper are ready
// ============================================

$(function() {
    "use strict";
    
    const areaIndicators = document.querySelectorAll('.area-indicator');
    
    // Function to update active indicator
    function updateActiveIndicator(realIndex) {
        areaIndicators.forEach(function(indicator, i) {
            indicator.classList.remove('active');
            if (i === realIndex) {
                indicator.classList.add('active');
            }
        });
    }
    
    // Wait for Swiper to initialize (it's created in ultimex.js)
    function initSwiperSync() {
        // Get the swiper instance from the DOM element
        const swiperEl = document.querySelector('.hero-slider .swiper-container');
        
        if (!swiperEl || !swiperEl.swiper) {
            // Retry if swiper not ready yet
            setTimeout(initSwiperSync, 200);
            return;
        }
        
        const swiper = swiperEl.swiper;
        console.log('Astra: Swiper found, initializing sync...');
        
        // Set initial state
        updateActiveIndicator(swiper.realIndex);
        
        // Listen to all relevant events
        swiper.on('slideChange', function() {
            updateActiveIndicator(this.realIndex);
        });
        
        swiper.on('slideChangeTransitionEnd', function() {
            updateActiveIndicator(this.realIndex);
        });
        
        // Click handlers for area indicators
        areaIndicators.forEach(function(indicator, index) {
            indicator.addEventListener('click', function() {
                // slideToLoop handles the loop mode correctly
                swiper.slideToLoop(index, 1000);
                updateActiveIndicator(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                swiper.slidePrev();
            } else if (e.key === 'ArrowRight') {
                swiper.slideNext();
            } else if (e.key === 't' || e.key === 'T') {
                const toggle = document.getElementById('theme-toggle');
                if (toggle) toggle.click();
            }
        });
        
        console.log('Astra: Swiper sync initialized successfully!');
    }
    
    // Start initialization after a short delay to ensure Swiper is ready
    setTimeout(initSwiperSync, 500);
});
