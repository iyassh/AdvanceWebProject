document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const currentSlide = document.querySelector('.current');
    const totalSlides = document.querySelector('.total');
    let activeIndex = 0;
    
    // Initialize the slider
    function initSlider() {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Set total slides number
        totalSlides.textContent = slides.length;
        
        // Set first slide as active
        slides[0].classList.add('active');
        
        // Start autoplay
        startAutoplay();
    }

    // Go to specific slide
    function goToSlide(index) {
        // Remove active classes
        slides[activeIndex].classList.remove('active');
        document.querySelectorAll('.dot')[activeIndex].classList.remove('active');
        
        // Update active index
        activeIndex = index;
        
        // Add active classes to new slide
        slides[activeIndex].classList.add('active');
        document.querySelectorAll('.dot')[activeIndex].classList.add('active');
        
        // Update slide position
        sliderTrack.style.transform = `translateX(-${activeIndex * 100}%)`;
        
        // Update fraction counter
        currentSlide.textContent = activeIndex + 1;
    }

    // Autoplay functionality
    let autoplayTimer;
    function startAutoplay() {
        autoplayTimer = setInterval(() => {
            const nextIndex = (activeIndex + 1) % slides.length;
            goToSlide(nextIndex);
        }, 5000); // Change slide every 5 seconds
    }

    // Pause autoplay on hover
    sliderTrack.addEventListener('mouseenter', () => {
        clearInterval(autoplayTimer);
    });

    sliderTrack.addEventListener('mouseleave', () => {
        startAutoplay();
    });

    // Initialize the slider
    initSlider();
});