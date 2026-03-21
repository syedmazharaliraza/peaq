/**
 * CAROUSEL.JS
 * Testimonial carousel with auto-play, manual navigation, and touch support
 */

(function() {
    'use strict';

    // ========================================
    // Carousel Class
    // ========================================
    class Carousel {
        constructor(element) {
            this.carousel = element;
            this.track = this.carousel.querySelector('.testimonials-carousel__track');
            this.slides = Array.from(this.track.children);
            this.prevButton = this.carousel.querySelector('.carousel__nav--prev');
            this.nextButton = this.carousel.querySelector('.carousel__nav--next');
            this.dotsContainer = document.getElementById('carouselDots');

            this.currentIndex = 0;
            this.autoPlayInterval = null;
            this.autoPlayDelay = 5000;
            this.isTransitioning = false;

            // Touch/swipe support
            this.touchStartX = 0;
            this.touchEndX = 0;

            this.init();
        }

        init() {
            // Create dots
            this.createDots();

            // Set initial position
            this.updateCarousel(0);

            // Event listeners
            if (this.prevButton) {
                this.prevButton.addEventListener('click', () => this.prev());
            }

            if (this.nextButton) {
                this.nextButton.addEventListener('click', () => this.next());
            }

            // Dot click handlers
            const dots = this.dotsContainer.querySelectorAll('.carousel__dot');
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });

            // Touch/swipe support
            this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

            // Pause auto-play on hover
            this.carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
            this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

            // Start auto-play
            this.startAutoPlay();

            // Responsive handling
            window.addEventListener('resize', () => this.handleResize());
        }

        createDots() {
            if (!this.dotsContainer) return;

            this.dotsContainer.innerHTML = '';

            this.slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('carousel__dot');
                if (index === 0) {
                    dot.classList.add('active');
                }
                this.dotsContainer.appendChild(dot);
            });
        }

        updateCarousel(index, smooth = true) {
            if (this.isTransitioning) return;

            this.currentIndex = index;

            // Calculate transform based on screen size
            const slideWidth = this.getSlideWidth();
            const offset = -this.currentIndex * slideWidth;

            // Apply transform
            if (smooth) {
                this.track.style.transition = 'transform 0.5s ease';
            } else {
                this.track.style.transition = 'none';
            }

            this.track.style.transform = `translateX(${offset}px)`;

            // Update dots
            this.updateDots();

            // Prevent rapid clicking
            if (smooth) {
                this.isTransitioning = true;
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 500);
            }
        }

        updateDots() {
            if (!this.dotsContainer) return;

            const dots = this.dotsContainer.querySelectorAll('.carousel__dot');
            dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        getSlideWidth() {
            const containerWidth = this.carousel.offsetWidth;
            const windowWidth = window.innerWidth;

            // Calculate slides per view based on screen size
            let slidesPerView = 3;

            if (windowWidth <= 768) {
                slidesPerView = 1;
            } else if (windowWidth <= 1024) {
                slidesPerView = 2;
            }

            return containerWidth / slidesPerView;
        }

        getSlidesPerView() {
            const windowWidth = window.innerWidth;

            if (windowWidth <= 768) {
                return 1;
            } else if (windowWidth <= 1024) {
                return 2;
            }
            return 3;
        }

        getMaxIndex() {
            const slidesPerView = this.getSlidesPerView();
            return Math.max(0, this.slides.length - slidesPerView);
        }

        next() {
            const maxIndex = this.getMaxIndex();
            const nextIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
            this.updateCarousel(nextIndex);
        }

        prev() {
            const maxIndex = this.getMaxIndex();
            const prevIndex = this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1;
            this.updateCarousel(prevIndex);
        }

        goToSlide(index) {
            const maxIndex = this.getMaxIndex();
            const targetIndex = Math.min(index, maxIndex);
            this.updateCarousel(targetIndex);
        }

        startAutoPlay() {
            this.pauseAutoPlay();
            this.autoPlayInterval = setInterval(() => {
                this.next();
            }, this.autoPlayDelay);
        }

        pauseAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }

        handleTouchStart(e) {
            this.touchStartX = e.changedTouches[0].screenX;
        }

        handleTouchEnd(e) {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }

        handleSwipe() {
            const swipeThreshold = 50;
            const diff = this.touchStartX - this.touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next
                    this.next();
                } else {
                    // Swipe right - prev
                    this.prev();
                }
            }
        }

        handleResize() {
            // Update carousel position on resize
            this.updateCarousel(this.currentIndex, false);
        }
    }

    // ========================================
    // Initialize Carousel
    // ========================================
    const carouselElement = document.getElementById('testimonialsCarousel');

    if (carouselElement) {
        new Carousel(carouselElement);
    }

})();
