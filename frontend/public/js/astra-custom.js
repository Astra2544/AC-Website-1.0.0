/*
  Astra Capital e.U. - Custom JavaScript
  Theme Toggle with Wave Animation, Slider Sync & More
*/

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    
    // ============================================
    // PRELOADER
    // ============================================
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.getElementById('preloader').classList.add('loaded');
            document.querySelector('.preloader-bg').classList.add('loaded');
        }, 800);
    });
    
    // ============================================
    // THEME TOGGLE WITH WAVE ANIMATION
    // ============================================
    
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const lightThemeLink = document.getElementById('light-theme');
    
    // Create wave overlay
    createWaveOverlay();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('astra-theme') || 'dark';
    setTheme(savedTheme, false);
    
    // Theme toggle click
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Get click position for wave origin
            const rect = themeToggle.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            // Trigger wave animation
            triggerWaveAnimation(x, y, newTheme);
            
            // Set theme after small delay
            setTimeout(function() {
                setTheme(newTheme, true);
                localStorage.setItem('astra-theme', newTheme);
            }, 400);
        });
    }
    
    function createWaveOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'theme-transition-overlay';
        overlay.innerHTML = '<div class="theme-wave"></div>';
        document.body.appendChild(overlay);
    }
    
    function triggerWaveAnimation(x, y, newTheme) {
        const wave = document.querySelector('.theme-wave');
        if (!wave) return;
        
        // Set wave color based on new theme
        const waveColor = newTheme === 'light' ? '#f5f5f5' : '#000000';
        
        // Calculate size needed to cover screen
        const maxDim = Math.max(window.innerWidth, window.innerHeight);
        const size = maxDim * 2.5;
        
        // Position and style wave
        wave.style.cssText = `
            left: ${x - size/2}px;
            top: ${y - size/2}px;
            width: ${size}px;
            height: ${size}px;
            background: ${waveColor};
        `;
        
        // Remove and re-add class to restart animation
        wave.classList.remove('animate');
        void wave.offsetWidth; // Force reflow
        wave.classList.add('animate');
        
        // Clean up after animation
        setTimeout(function() {
            wave.classList.remove('animate');
        }, 800);
    }
    
    function setTheme(theme, animate) {
        htmlElement.setAttribute('data-theme', theme);
        
        if (lightThemeLink) {
            lightThemeLink.disabled = (theme !== 'light');
        }
        
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add('theme-' + theme);
    }
    
    // ============================================
    // COMING SOON LINKS
    // ============================================
    
    document.querySelectorAll('.coming-soon-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Dieser Bereich ist bald verfügbar!');
        });
    });
    
    // ============================================
    // NOTIFICATION
    // ============================================
    
    function showNotification(message) {
        const existing = document.querySelector('.astra-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = 'astra-notification';
        notification.innerHTML = `
            <span style="color: var(--primary-color);">●</span>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(-20px);
            background: rgba(0, 0, 0, 0.9);
            color: #fff;
            padding: 15px 25px;
            border-radius: 8px;
            font-family: 'Raleway', sans-serif;
            font-size: 13px;
            z-index: 99999;
            opacity: 0;
            transition: all 0.4s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            border: 1px solid rgba(255, 38, 74, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        setTimeout(function() {
            notification.style.opacity = '0';
            setTimeout(function() { notification.remove(); }, 400);
        }, 3000);
    }
    
    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    
    document.addEventListener('keydown', function(e) {
        // T = Toggle Theme
        if (e.key === 't' || e.key === 'T') {
            if (themeToggle) themeToggle.click();
        }
    });
    
    // Console branding
    console.log('%c ASTRA CAPITAL ', 'background: #ff264a; color: white; font-size: 20px; font-weight: bold; padding: 10px 20px;');
});


// ============================================
// SWIPER SYNC (runs after jQuery loads)
// ============================================

$(function() {
    "use strict";
    
    const indicators = document.querySelectorAll('.area-indicator');
    
    function updateIndicators(index) {
        indicators.forEach(function(ind, i) {
            ind.classList.remove('active');
            if (i === index) ind.classList.add('active');
        });
    }
    
    function initSwiperSync() {
        const swiperEl = document.querySelector('.hero-slider .swiper-container');
        if (!swiperEl || !swiperEl.swiper) {
            setTimeout(initSwiperSync, 200);
            return;
        }
        
        const swiper = swiperEl.swiper;
        
        // Initial state
        updateIndicators(swiper.realIndex);
        
        // Sync on slide change
        swiper.on('slideChange', function() {
            updateIndicators(this.realIndex);
        });
        
        // Click handlers
        indicators.forEach(function(indicator, index) {
            indicator.addEventListener('click', function() {
                swiper.slideToLoop(index, 1500);
            });
        });
    }
    
    setTimeout(initSwiperSync, 500);
});
