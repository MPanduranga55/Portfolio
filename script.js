// ===== GLOBAL VARIABLES =====
let isLoading = true;
const scrollThreshold = 100;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== WINDOW LOAD =====
window.addEventListener('load', function() {
    hideLoader();
});

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    initializeThemeToggle();
    initializeAOS();
    initializeNavigation();
    initializeTypingAnimation();
    initializeSkillsAnimation();
    initializeCounterAnimation();
    initializeContactForm();
    initializeScrollToTop();
    initializeSmoothScrolling();
    initializeScrollIndicator();
}

// ===== THEME TOGGLE FUNCTIONALITY =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    if (!themeToggle || !themeIcon) return;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add smooth transition effect
        document.documentElement.style.transition = 'all 0.3s ease';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Remove transition after change
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (!themeIcon) return;
    
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// ===== LOADER FUNCTIONS =====
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
            isLoading = false;
        }, 500);
    }
}

// ===== AOS INITIALIZATION =====
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// ===== NAVIGATION FUNCTIONS =====
function initializeNavigation() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Handle scroll effects
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });
    
    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
}

function handleNavLinkClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== TYPING ANIMATION =====
function initializeTypingAnimation() {
    const roles = [
        'Full Stack Developer',
        'AI/ML Enthusiast',
        'Problem Solver',
        'Tech Explorer'
    ];
    
    const typingElement = document.getElementById('typingRole');
    if (!typingElement) return;
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next role
        }
        
        setTimeout(typeRole, typingSpeed);
    }
    
    // Start typing animation after a short delay
    setTimeout(typeRole, 1000);
}

// ===== SKILLS ANIMATION =====
function initializeSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
}

function animateProgressBars() {
    // Skills section now uses brand-style cards without progress bars
    // This function can be used for other animations if needed
    const skillBrands = document.querySelectorAll('.skill-brand');
    
    skillBrands.forEach((brand, index) => {
        setTimeout(() => {
            brand.style.opacity = '1';
            brand.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== COUNTER ANIMATION =====
function initializeCounterAnimation() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add input validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidation);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.btn-submit');
    const formMessage = document.getElementById('form-message');
    
    // Validate form
    if (!validateForm(this)) {
        showFormMessage('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
    }, 2000);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput.call(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateInput() {
    const value = this.value.trim();
    const type = this.type;
    let isValid = true;
    
    // Remove existing validation classes
    this.classList.remove('is-valid', 'is-invalid');
    
    // Check if required field is empty
    if (this.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Validate email
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    // Add validation classes
    this.classList.add(isValid ? 'is-valid' : 'is-invalid');
    
    return isValid;
}

function clearValidation() {
    this.classList.remove('is-valid', 'is-invalid');
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ===== SCROLL TO TOP =====
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL INDICATOR =====
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

const optimizedResizeHandler = debounce(() => {
    // Handle any resize-related updates
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250);

window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('resize', optimizedResizeHandler);

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function createIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

// ===== PROJECT CARD ANIMATIONS =====
function initializeProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = createIntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize project animations when DOM is ready
document.addEventListener('DOMContentLoaded', initializeProjectAnimations);

// ===== EASTER EGG =====
let konami = [];
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konami.push(e.keyCode);
    konami.splice(-konamiCode.length - 1, konami.length - konamiCode.length);
    
    if (konami.join('').indexOf(konamiCode.join('')) >= 0) {
        // Easter egg activated!
        document.body.style.transform = 'rotate(360deg)';
        document.body.style.transition = 'transform 2s ease';
        
        setTimeout(() => {
            document.body.style.transform = '';
            alert('🎉 Konami Code activated! You found the secret!');
        }, 2000);
    }
});

// ===== CONSOLE MESSAGE =====
console.log(`
🚀 Welcome to M.Panduranga's Portfolio!
====================================
👨‍💻 Built with modern web technologies
🎨 Designed with attention to detail
💡 Open to collaboration and opportunities

Feel free to explore the code and reach out!
`);
