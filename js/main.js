/**
 * MAIN.JS
 * Main initialization and utility functions
 */

(function() {
    'use strict';

    // ========================================
    // DOM Ready Check
    // ========================================
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal');

        if (revealElements.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        revealElements.forEach(function(element) {
            revealObserver.observe(element);
        });
    }

    // ========================================
    // Lazy Load Images
    // ========================================
    function initLazyLoad() {
        const lazyImages = document.querySelectorAll('img[data-src]');

        if (lazyImages.length === 0) return;

        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // ========================================
    // Add Placeholder Images (for development)
    // ========================================
    function initPlaceholderImages() {
        const images = document.querySelectorAll('img:not([src])');

        images.forEach(function(img) {
            const width = img.offsetWidth || 400;
            const height = img.offsetHeight || 300;
            const altText = img.alt || 'Placeholder';

            // Use a placeholder service (picsum.photos for random images)
            img.src = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
            img.alt = altText;
        });
    }

    // ========================================
    // External Links - Open in New Tab
    // ========================================
    function initExternalLinks() {
        const links = document.querySelectorAll('a[href^="http"]');

        links.forEach(function(link) {
            const currentDomain = window.location.hostname;
            const linkDomain = new URL(link.href).hostname;

            if (linkDomain !== currentDomain) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    // ========================================
    // Copy to Clipboard Utility
    // ========================================
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return Promise.resolve();
        }
    }

    // ========================================
    // Debounce Utility
    // ========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ========================================
    // Throttle Utility
    // ========================================
    function throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ========================================
    // Get Cookie
    // ========================================
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // ========================================
    // Set Cookie
    // ========================================
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value || ''}${expires}; path=/`;
    }

    // ========================================
    // Initialize All
    // ========================================
    function init() {
        console.log('Physio Therapy Website Initialized');

        // Initialize features
        initScrollReveal();
        initLazyLoad();
        initPlaceholderImages();
        initExternalLinks();

        // Add loaded class to body
        document.body.classList.add('loaded');
    }

    // ========================================
    // Run on DOM Ready
    // ========================================
    ready(init);

    // ========================================
    // Expose Utilities Globally
    // ========================================
    window.PhysioTherapy = {
        copyToClipboard: copyToClipboard,
        debounce: debounce,
        throttle: throttle,
        getCookie: getCookie,
        setCookie: setCookie
    };

})();
