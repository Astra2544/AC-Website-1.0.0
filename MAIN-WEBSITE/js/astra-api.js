/**
 * Astra Capital e.U. - API Integration
 * Handles contact form and newsletter submissions
 */

(function() {
    'use strict';
    
    // API Base URL (relative for same-origin requests via nginx proxy)
    const API_BASE = '/api';
    
    /**
     * Send contact form data to backend
     */
    async function submitContactForm(formData, areaName) {
        try {
            const response = await fetch(`${API_BASE}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject || 'Kontaktanfrage',
                    message: formData.message,
                    area: areaName || 'general'
                })
            });
            
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('[Astra API] Contact form error:', error);
            return {
                success: false,
                message: 'Verbindungsfehler. Bitte versuchen Sie es später erneut.'
            };
        }
    }
    
    /**
     * Subscribe to newsletter
     */
    async function subscribeNewsletter(email, name) {
        try {
            const response = await fetch(`${API_BASE}/newsletter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name })
            });
            
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('[Astra API] Newsletter error:', error);
            return {
                success: false,
                message: 'Verbindungsfehler. Bitte versuchen Sie es später erneut.'
            };
        }
    }
    
    /**
     * Show toast notification
     */
    function showToast(message, type = 'success') {
        // Remove existing toasts
        const existingToast = document.querySelector('.astra-toast');
        if (existingToast) existingToast.remove();
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `astra-toast astra-toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                ${type === 'success' 
                    ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
                    : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
                }
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">&times;</button>
        `;
        
        document.body.appendChild(toast);
        
        // Show animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });
        
        // Auto hide after 5s
        setTimeout(() => {
            if (document.body.contains(toast)) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }
    
    /**
     * Initialize contact form
     */
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        // Detect area from body class
        const bodyClass = document.body.className;
        let areaName = 'general';
        if (bodyClass.includes('area-development')) areaName = 'development';
        else if (bodyClass.includes('area-ecom')) areaName = 'ecom';
        else if (bodyClass.includes('area-consulting')) areaName = 'consulting';
        else if (bodyClass.includes('area-vending')) areaName = 'vending';
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="btn-loading"></span> Wird gesendet...';
            submitBtn.disabled = true;
            
            const formData = {
                name: form.querySelector('[data-testid="input-name"]')?.value || form.querySelector('input[placeholder*="Name"]')?.value,
                email: form.querySelector('[data-testid="input-email"]')?.value || form.querySelector('input[type="email"]')?.value,
                subject: form.querySelector('[data-testid="input-subject"]')?.value || form.querySelector('input[placeholder*="Betreff"]')?.value,
                message: form.querySelector('[data-testid="input-message"]')?.value || form.querySelector('textarea')?.value
            };
            
            const result = await submitContactForm(formData, areaName);
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            if (result.success) {
                showToast(result.message, 'success');
                form.reset();
            } else {
                showToast(result.message, 'error');
            }
        });
    }
    
    /**
     * Initialize newsletter form
     */
    function initNewsletterForm() {
        const newsletterForms = document.querySelectorAll('.footer-newsletter');
        
        newsletterForms.forEach(form => {
            const input = form.querySelector('input[type="email"]');
            const button = form.querySelector('button');
            
            if (!input || !button) return;
            
            button.addEventListener('click', async () => {
                const email = input.value.trim();
                
                if (!email || !email.includes('@')) {
                    showToast('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
                    return;
                }
                
                const originalText = button.innerHTML;
                button.innerHTML = '...';
                button.disabled = true;
                
                const result = await subscribeNewsletter(email);
                
                button.innerHTML = originalText;
                button.disabled = false;
                
                if (result.success) {
                    showToast(result.message, 'success');
                    input.value = '';
                } else {
                    showToast(result.message, 'error');
                }
            });
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initContactForm();
            initNewsletterForm();
        });
    } else {
        initContactForm();
        initNewsletterForm();
    }
    
    // Expose functions globally
    window.AstraAPI = {
        submitContactForm,
        subscribeNewsletter,
        showToast
    };
    
})();
