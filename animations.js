// Scroll Animation Observer
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupCounterAnimation();
        this.setupParallax();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Trigger counter animation for stats
                    if (entry.target.classList.contains('stat-item')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, options);

        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Observe feature cards
        document.querySelectorAll('.feature-card').forEach(el => {
            observer.observe(el);
        });

        // Observe stat items
        document.querySelectorAll('.stat-item').forEach(el => {
            observer.observe(el);
        });

        // Observe content sections
        document.querySelectorAll('.content-section').forEach(el => {
            observer.observe(el);
        });

        // Observe section headers
        document.querySelectorAll('.section-header').forEach(el => {
            observer.observe(el);
        });
    }

    setupCounterAnimation() {
        // This will be triggered by intersection observer
    }

    animateCounter(element) {
        if (element.classList.contains('counted')) return;
        element.classList.add('counted');
        element.classList.add('counting');

        const numberElement = element.querySelector('.stat-number');
        if (!numberElement) return;

        const target = numberElement.textContent;
        const isPercentage = target.includes('%');
        const hasPlus = target.includes('+');
        const hasSlash = target.includes('/');
        
        // Special handling for 24/7
        if (target === '24/7') {
            element.classList.remove('counting');
            return; // Don't animate 24/7, keep it as is
        }
        
        // Extract number
        let targetNumber = parseInt(target.replace(/[^0-9]/g, ''));
        
        if (isNaN(targetNumber)) return;

        let current = 0;
        const increment = targetNumber / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                current = targetNumber;
                clearInterval(counter);
                element.classList.remove('counting');
            }

            let displayValue = Math.floor(current);
            
            if (hasSlash) {
                numberElement.textContent = displayValue + '/7';
            } else if (hasPlus) {
                numberElement.textContent = displayValue.toLocaleString() + '+';
            } else if (isPercentage) {
                numberElement.textContent = displayValue + '%';
            } else {
                numberElement.textContent = displayValue.toLocaleString();
            }
        }, stepTime);
    }

    setupParallax() {
        // Simple parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
            
            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add loading animation to forms
function setupFormAnimations() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.style.cssText = `
                        background: linear-gradient(135deg, #34a853 0%, #4caf50 100%);
                        color: white;
                        padding: 16px 24px;
                        border-radius: 8px;
                        margin-top: 16px;
                        text-align: center;
                        animation: fadeInUp 0.5s ease-out;
                    `;
                    successMsg.textContent = 'Thank you! We will get back to you soon.';
                    
                    this.appendChild(successMsg);
                    this.reset();
                    
                    setTimeout(() => {
                        successMsg.style.animation = 'fadeInUp 0.5s ease-out reverse';
                        setTimeout(() => successMsg.remove(), 500);
                    }, 3000);
                }, 2000);
            }
        });
    });
}

// Add hover effect to cards
function setupCardHoverEffects() {
    document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add ripple effect to buttons
function setupButtonRipple() {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    setupSmoothScroll();
    setupFormAnimations();
    setupCardHoverEffects();
    setupButtonRipple();
    
    // Add animate-on-scroll class to sections
    document.querySelectorAll('.section-header, .content-section').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
