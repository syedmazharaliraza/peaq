/**
 * ACCORDION.JS
 * FAQ accordion with smooth expand/collapse animations
 */

(function() {
    'use strict';

    // ========================================
    // Accordion Class
    // ========================================
    class Accordion {
        constructor(element) {
            this.accordion = element;
            this.items = Array.from(this.accordion.querySelectorAll('.faq-item'));
            this.allowMultiple = false; // Set to true to allow multiple items open at once

            this.init();
        }

        init() {
            this.items.forEach((item, index) => {
                const header = item.querySelector('.faq-item__header');
                const content = item.querySelector('.faq-item__content');

                if (header && content) {
                    // Set initial ARIA attributes
                    const buttonId = `faq-header-${index}`;
                    const contentId = `faq-content-${index}`;

                    header.setAttribute('id', buttonId);
                    header.setAttribute('aria-controls', contentId);
                    content.setAttribute('id', contentId);
                    content.setAttribute('role', 'region');
                    content.setAttribute('aria-labelledby', buttonId);

                    // Add click event
                    header.addEventListener('click', () => this.toggle(item));

                    // Keyboard navigation
                    header.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            this.toggle(item);
                        }
                    });
                }
            });
        }

        toggle(item) {
            const header = item.querySelector('.faq-item__header');
            const content = item.querySelector('.faq-item__content');
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                this.close(item);
            } else {
                // Close other items if allowMultiple is false
                if (!this.allowMultiple) {
                    this.items.forEach((otherItem) => {
                        if (otherItem !== item) {
                            this.close(otherItem);
                        }
                    });
                }

                this.open(item);
            }
        }

        open(item) {
            const header = item.querySelector('.faq-item__header');
            const content = item.querySelector('.faq-item__content');

            if (!header || !content) return;

            // Set ARIA attribute
            header.setAttribute('aria-expanded', 'true');

            // Calculate content height
            const contentHeight = content.scrollHeight;

            // Apply max-height for smooth transition
            content.style.maxHeight = contentHeight + 'px';

            // Add active class to item
            item.classList.add('active');
        }

        close(item) {
            const header = item.querySelector('.faq-item__header');
            const content = item.querySelector('.faq-item__content');

            if (!header || !content) return;

            // Set ARIA attribute
            header.setAttribute('aria-expanded', 'false');

            // Reset max-height for smooth transition
            content.style.maxHeight = '0';

            // Remove active class from item
            item.classList.remove('active');
        }

        openAll() {
            this.items.forEach((item) => this.open(item));
        }

        closeAll() {
            this.items.forEach((item) => this.close(item));
        }
    }

    // ========================================
    // Initialize Accordion
    // ========================================
    const accordionElement = document.getElementById('faqAccordion');

    if (accordionElement) {
        const accordion = new Accordion(accordionElement);

        // Optional: Expose accordion instance globally for debugging/control
        window.faqAccordion = accordion;
    }

    // ========================================
    // Handle Window Resize (recalculate heights)
    // ========================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalculate heights for open items
            const openItems = document.querySelectorAll('.faq-item.active');
            openItems.forEach(function(item) {
                const content = item.querySelector('.faq-item__content');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }, 250);
    });

})();
