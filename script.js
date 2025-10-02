// Smooth scrolling functions
function scrollToWaitlist() {
    document.getElementById('waitlist').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function scrollToMission() {
    document.getElementById('mission').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function scrollToServices() {
    document.getElementById('services').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('cookie-accept');

    if (!banner || !acceptButton) {
        return;
    }

    let hasConsent = false;

    try {
        hasConsent = localStorage.getItem('cookieConsent') === 'accepted';
    } catch (error) {
        console.warn('Unable to access localStorage for cookie consent.', error);
    }

    if (hasConsent) {
        banner.style.display = 'none';
        return;
    }

    banner.classList.add('cookie-banner--visible');

    acceptButton.addEventListener('click', () => {
        try {
            localStorage.setItem('cookieConsent', 'accepted');
        } catch (error) {
            console.warn('Unable to store cookie consent.', error);
        }

        banner.classList.remove('cookie-banner--visible');
        banner.classList.add('cookie-banner--hidden');

        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    });
}

// Testimonial carousel functionality
let slideIndex = 1;

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.getElementsByClassName('testimonial');
    const dots = document.getElementsByClassName('dot');

    if (slides.length === 0) {
        return;
    }
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    slides[slideIndex - 1].classList.add('active');
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto-advance testimonials
function autoSlide() {
    slideIndex++;
    if (slideIndex > document.getElementsByClassName('testimonial').length) {
        slideIndex = 1;
    }
    showSlide(slideIndex);
}

// Email form submission
function handleEmailSubmit(event) {
    event.preventDefault();
    
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    const submitButton = event.target.querySelector('.email-cta');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Joining...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitButton.textContent = 'Thank You!';
        submitButton.style.background = '#27ae60';
        emailInput.value = '';
        
        // Show success message
    const successMessage = document.createElement('p');
    successMessage.textContent = 'Thanks for subscribing! Check your email for exclusive tips.';
        successMessage.style.color = '#27ae60';
        successMessage.style.marginTop = '15px';
        successMessage.style.fontWeight = '600';
        
        event.target.appendChild(successMessage);
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
            if (successMessage.parentNode) {
                successMessage.parentNode.removeChild(successMessage);
            }
        }, 3000);
        
    }, 1500);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start testimonial auto-advance
    setInterval(autoSlide, 5000); // Change slide every 5 seconds
    
    // Enhanced Intersection Observer for scroll animations with stagger effect
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on element position
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe service cards with stagger
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';
        observer.observe(card);
    });
    
    // Observe mission points
    const missionPoints = document.querySelectorAll('.mission-point');
    missionPoints.forEach((point, index) => {
        point.style.opacity = '0';
        point.style.transform = 'translateX(-30px)';
        observer.observe(point);
    });

    // Observe sections
    const sections = document.querySelectorAll('.pain-point, .mission, .testimonials, .email-capture, .program-highlight');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

    // Observe problem/promise boxes
    const boxes = document.querySelectorAll('.problem-side, .upside-side, .promise-box');
    boxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        observer.observe(box);
    });

    initCookieBanner();
    initParallaxEffects();
    initButtonRipples();
    initPageLoader();
});

// Page loader
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    });
}

// Parallax effects initialization
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for hero background
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.backgroundPositionY = `${rate}px`;
        }

        // Fade effect for mission image
        const missionImage = document.querySelector('.mission-image img');
        if (missionImage) {
            const rect = missionImage.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                const scale = 0.9 + (scrollPercent * 0.1);
                missionImage.style.transform = `scale(${Math.min(scale, 1)})`;
            }
        }
    });
}

// Button ripple effect
function initButtonRipples() {
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .service-cta, .email-cta');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%) scale(0);
                animation: rippleEffect 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }

    .animate-in {
        animation: fadeInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important;
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
    }

    .service-card.animate-in {
        animation: fadeInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important;
    }

    .mission-point.animate-in {
        animation: slideInLeft 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important;
    }

    section.animate-in {
        animation: fadeIn 1s ease forwards !important;
    }
`;
document.head.appendChild(style);
