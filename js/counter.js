/**
 * COUNTER.JS
 * Animated counters using Intersection Observer API
 * Triggers counter animation when element scrolls into view
 */

(function() {
    'use strict';

    // ========================================
    // Counter Animation Function
    // ========================================
    function animateCounter(element, target, duration = 2000) {
        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out cubic)
            const easeOutCubic = function(t) {
                return 1 - Math.pow(1 - t, 3);
            };

            const currentValue = Math.floor(startValue + (target - startValue) * easeOutCubic(progress));
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ========================================
    // Initialize Counters with Intersection Observer
    // ========================================
    const counters = document.querySelectorAll('.counter');

    if (counters.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const counterObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));

                    if (!isNaN(target) && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        animateCounter(counter, target, 2000);

                        // Unobserve after animation
                        observer.unobserve(counter);
                    }
                }
            });
        }, observerOptions);

        // Observe all counters
        counters.forEach(function(counter) {
            counterObserver.observe(counter);
        });
    }

    // ========================================
    // Fallback for browsers without Intersection Observer
    // ========================================
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported. Using fallback for counters.');

        // Simple scroll-based fallback
        let counterAnimated = false;

        window.addEventListener('scroll', function() {
            if (!counterAnimated && counters.length > 0) {
                const firstCounter = counters[0];
                const rect = firstCounter.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;

                if (rect.top <= windowHeight * 0.75) {
                    counterAnimated = true;

                    counters.forEach(function(counter) {
                        const target = parseInt(counter.getAttribute('data-target'));
                        if (!isNaN(target)) {
                            animateCounter(counter, target, 2000);
                        }
                    });
                }
            }
        });
    }

})();
