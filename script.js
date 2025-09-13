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

// Testimonial carousel functionality
let slideIndex = 1;

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.getElementsByClassName('testimonial');
    const dots = document.getElementsByClassName('dot');
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
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
        successMessage.textContent = 'Welcome to the waitlist! Check your email for exclusive tips.';
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

// Service booking functionality
function handleServiceBooking(serviceName, price) {
    alert(`Booking ${serviceName} service for ${price}. This would redirect to a booking/payment page.`);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up service booking buttons
    const serviceButtons = document.querySelectorAll('.service-cta');
    serviceButtons.forEach((button, index) => {
        const serviceCard = button.closest('.service-card');
        const serviceName = serviceCard.querySelector('h3').textContent;
        const servicePrice = serviceCard.querySelector('.service-price').textContent;
        
        button.addEventListener('click', () => {
            handleServiceBooking(serviceName, servicePrice);
        });
    });
    
    // Start testimonial auto-advance
    setInterval(autoSlide, 5000); // Change slide every 5 seconds
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .mission-point, .testimonial');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
        });
    });
});

// Handle navigation and scroll effects
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});
