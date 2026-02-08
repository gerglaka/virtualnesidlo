// Global variables
let slideIndex = 1;

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    initializeScrollToTop();
    initializeAnimations();
    initializeContactForm();
    initializeProcessSection();
});

// Slideshow functionality
function initializeSlideshow() {
    showSlides(slideIndex);
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName('slide');
    const indicators = document.getElementsByClassName('indicator');
    
    if (!slides.length) return; // Exit if no slides exist
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove('active');
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (indicators[slideIndex - 1]) {
        indicators[slideIndex - 1].classList.add('active');
    }
}

// Auto-advance slideshow
function autoSlideshow() {
    slideIndex++;
    showSlides(slideIndex);
    setTimeout(autoSlideshow, 5000); // Change slide every 5 seconds
}

// Start auto slideshow after page load
window.addEventListener('load', function() {
    setTimeout(autoSlideshow, 5000);
});

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    
    if (!scrollButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.exclusive-card, .section-title, .why-choose-content');
    animateElements.forEach(el => observer.observe(el));
}

// ===== PROCESS SECTION - JS-Pinned Scroll Timeline =====
function initializeProcessSection() {
    var wrapper = document.querySelector('.process-wrapper');
    var section = document.querySelector('.process-section');
    var board = document.getElementById('processBoard');
    var svg = document.getElementById('processSvg');
    var bg = section ? section.querySelector('.process-bg') : null;

    if (!wrapper || !section || !board || !svg) return;

    var steps = Array.from(board.querySelectorAll('.process-step'))
        .sort(function(a, b) { return parseInt(a.dataset.step) - parseInt(b.dataset.step); });

    function isMobile() { return window.innerWidth <= 768; }

    var arrows = [];

    // Pin/unpin section with JS (bulletproof, no overflow issues)
    function pinSection() {
        if (isMobile()) {
            section.style.position = '';
            section.style.top = '';
            section.style.left = '';
            section.style.width = '';
            return;
        }

        var wRect = wrapper.getBoundingClientRect();
        var vh = window.innerHeight;

        if (wRect.top <= 0 && wRect.bottom > vh) {
            // Pinned
            section.style.position = 'fixed';
            section.style.top = '0';
            section.style.left = '0';
            section.style.width = '100%';
        } else if (wRect.bottom <= vh) {
            // Past — anchor to bottom of wrapper
            section.style.position = 'absolute';
            section.style.top = (wrapper.clientHeight - vh) + 'px';
            section.style.left = '0';
            section.style.width = '100%';
        } else {
            // Before — normal flow
            section.style.position = 'relative';
            section.style.top = '0';
            section.style.left = '';
            section.style.width = '';
        }
    }

    // Draw individual bent arrows between consecutive steps
    function drawArrows() {
        arrows = [];

        if (isMobile()) {
            svg.innerHTML = '';
            return;
        }

        var boardRect = board.getBoundingClientRect();
        var points = steps.map(function(step) {
            var rect = step.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2 - boardRect.left,
                y: rect.top + rect.height / 2 - boardRect.top
            };
        });

        svg.setAttribute('viewBox', '0 0 ' + boardRect.width + ' ' + boardRect.height);

        var svgContent = '';

        for (var i = 0; i < points.length - 1; i++) {
            var a = points[i];
            var b = points[i + 1];
            var midX = (a.x + b.x) / 2;

            // Cubic bezier S-curve between steps
            var d = 'M ' + a.x + ' ' + a.y +
                    ' C ' + midX + ' ' + a.y + ', ' + midX + ' ' + b.y + ', ' + b.x + ' ' + b.y;

            // Grey background arrow
            svgContent += '<path d="' + d + '" fill="none" stroke="#ddd" stroke-width="3" stroke-linecap="round"/>';
            // Green animated arrow
            svgContent += '<path class="arrow-fg" data-arrow="' + i + '" d="' + d + '" fill="none" stroke="#308003" stroke-width="3" stroke-linecap="round"/>';
        }

        svg.innerHTML = svgContent;

        // Measure and prep each green arrow for dash animation
        var fgPaths = svg.querySelectorAll('.arrow-fg');
        for (var j = 0; j < fgPaths.length; j++) {
            var len = fgPaths[j].getTotalLength();
            fgPaths[j].style.strokeDasharray = len;
            fgPaths[j].style.strokeDashoffset = len;
            arrows.push({ el: fgPaths[j], len: len });
        }
    }

    // Main scroll handler
    function onScroll() {
        pinSection();

        if (isMobile()) return;

        var wRect = wrapper.getBoundingClientRect();
        var scrollDist = wrapper.clientHeight - window.innerHeight;
        if (scrollDist <= 0) return;

        var progress = Math.max(0, Math.min(1, -wRect.top / scrollDist));

        // Animate each arrow independently
        var segCount = steps.length - 1; // 6 arrows for 7 steps
        for (var i = 0; i < arrows.length; i++) {
            var arrowStart = i / segCount;
            var arrowEnd = (i + 1) / segCount;
            var arrowProgress;

            if (progress <= arrowStart) {
                arrowProgress = 0;
            } else if (progress >= arrowEnd) {
                arrowProgress = 1;
            } else {
                arrowProgress = (progress - arrowStart) / (arrowEnd - arrowStart);
            }

            arrows[i].el.style.strokeDashoffset = arrows[i].len * (1 - arrowProgress);
        }

        // Activate steps
        for (var s = 0; s < steps.length; s++) {
            var threshold = s / segCount;
            if (progress >= threshold - 0.01) {
                steps[s].classList.add('active');
            } else {
                steps[s].classList.remove('active');
            }
        }

        // Move background pattern
        if (bg) {
            bg.style.transform = 'translateX(' + (-progress * 300) + 'px)';
        }
    }

    // Mobile: IntersectionObserver for step activation
    var mobileObserver = null;
    function initMobile() {
        if (mobileObserver) {
            mobileObserver.disconnect();
            mobileObserver = null;
        }
        if (!isMobile()) return;

        mobileObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.3 });

        steps.forEach(function(step) { mobileObserver.observe(step); });
    }

    // Init: wait two frames for layout to settle
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            drawArrows();
            onScroll();
        });
    });

    window.addEventListener('scroll', onScroll, { passive: true });

    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset section position before redrawing
            section.style.position = 'relative';
            section.style.top = '0';
            section.style.left = '';
            section.style.width = '';

            requestAnimationFrame(function() {
                drawArrows();
                onScroll();
                initMobile();
            });
        }, 250);
    });

    initMobile();
}

// Contact form functionality
function initializeContactForm() {
    const hasCompanyCheckbox = document.getElementById('hasCompany');
    const companyFields = document.getElementById('companyFields');
    const contactForm = document.getElementById('contactForm');

    // Company checkbox toggle
    if (hasCompanyCheckbox && companyFields) {
        hasCompanyCheckbox.addEventListener('change', function() {
            if (this.checked) {
                companyFields.classList.add('show');
            } else {
                companyFields.classList.remove('show');
                // Clear company fields when unchecked
                const companyName = document.getElementById('companyName');
                const ico = document.getElementById('ico');
                if (companyName) companyName.value = '';
                if (ico) ico.value = '';
            }
        });
    }

        // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showAlert(
                    window.I18n ? window.I18n.t('alerts.fillRequired') : 'Prosím vyplňte všetky povinné polia označené *',
                    'error'
                );
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showAlert(
                    window.I18n ? window.I18n.t('alerts.invalidEmail') : 'Prosím zadajte platnú emailovú adresu',
                    'error'
                );
                return;
            }

            // Show success message
            showAlert(
                window.I18n ? window.I18n.t('alerts.thankYou') : 'Ďakujeme za vašu správu! Kontaktujeme vás čoskoro.',
                'success'
            );

            // Reset form
            this.reset();
            if (companyFields) {
                companyFields.classList.remove('show');
            }

            console.log('Form data:', data); // For debugging
        });
    }
}

// Alert system
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert custom-alert-${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="margin-left: 15px; background: none; border: none; color: inherit; font-size: 1.2rem; cursor: pointer;">&times;</button>
    `;

    // Style the alert
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    // Set background color based on type
    const colors = {
        success: '#308003',
        error: '#dc3545',
        info: '#17a2b8'
    };
    alert.style.backgroundColor = colors[type] || colors.info;

    // Add to page
    document.body.appendChild(alert);

    // Animate in
    setTimeout(() => {
        alert.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (alert.parentElement) {
                    alert.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Footer legal links functionality
function showCookiePolicy() {
    showAlert(window.I18n ? window.I18n.t('alerts.cookieInfo') : 'Informácie o cookies budú dostupné čoskoro.', 'info');
}

function showPrivacyPolicy() {
    showAlert(window.I18n ? window.I18n.t('alerts.privacyInfo') : 'Zásady ochrany údajov budú dostupné čoskoro.', 'info');
}

function showTerms() {
    showAlert(window.I18n ? window.I18n.t('alerts.termsInfo') : 'Obchodné podmienky budú dostupné čoskoro.', 'info');
}

// Mobile menu functionality
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('mobile-open');
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-link')) {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.remove('mobile-open');
        }
    }
});

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization - defer non-critical functions
window.addEventListener('load', function() {
    initializeLazyLoading();
});

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('Non-critical error:', e.message);
});

// Keyboard navigation for slideshow
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch/swipe support for mobile slideshow
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    const threshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next slide
        } else {
            changeSlide(-1); // Swipe right - previous slide
        }
    }
}

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Prevent form double submission
function preventDoubleSubmit() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                setTimeout(() => {
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    });
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    preventDoubleSubmit();
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (navLinks) {
        navLinks.classList.toggle('mobile-open');
    }
    
    if (toggle) {
        toggle.classList.toggle('active');
    }
}

// Close mobile menu when clicking on links
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-link')) {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.remove('mobile-open');
        }
    }
});

// Handle close button click in mobile menu
document.addEventListener('click', function(e) {
    const navLinks = document.getElementById('navLinks');
    
    // Close menu when clicking the X button
    if (e.target === navLinks && e.offsetX > navLinks.offsetWidth - 65 && e.offsetY < 65) {
        navLinks.classList.remove('mobile-open');
    }
    
    // Close menu when clicking nav links
    if (e.target.matches('.nav-link') || e.target.matches('.cta-button')) {
        if (navLinks) {
            navLinks.classList.remove('mobile-open');
        }
    }
});

// ===== SERVICES PAGE FUNCTIONALITY =====

// FAQ Toggle Functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const allFaqItems = document.querySelectorAll('.faq-item');
    
    // Close all other FAQ items
    allFaqItems.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
}

// Services page billing toggle functionality
function initializeServicesBillingToggle() {
    const toggle = document.getElementById('billingToggle');
    const discountBadge = document.getElementById('discountBadge');
    const monthlyLabel = document.querySelector('.monthly-label');
    const yearlyLabel = document.querySelector('.yearly-label');
    
    // Only run if we're on the services page
    if (!toggle) return;
    
    const prices = {
        bratislava: document.getElementById('price-bratislava'),
        komarno: document.getElementById('price-komarno'),
        rimavska: document.getElementById('price-rimavska')
    };
    
    const periods = {
        bratislava: document.getElementById('period-bratislava'),
        komarno: document.getElementById('period-komarno'),
        rimavska: document.getElementById('period-rimavska')
    };

    let isYearly = false;

    toggle.addEventListener('click', function() {
        isYearly = !isYearly;

        if (isYearly) {
            toggle.classList.add('active');
            if (discountBadge) discountBadge.classList.add('show');
            if (monthlyLabel) monthlyLabel.classList.remove('active');
            if (yearlyLabel) yearlyLabel.classList.add('active');

            // Update prices (25€ * 12 * 0.9 = 270€)
            Object.values(prices).forEach(price => {
                if (price) price.textContent = '270€';
            });

            // Update periods using i18n
            Object.values(periods).forEach(period => {
                if (period) {
                    period.textContent = window.I18n ? window.I18n.t('servicesPage.periodYearly') : '+ DPH / rok';
                }
            });

        } else {
            toggle.classList.remove('active');
            if (discountBadge) discountBadge.classList.remove('show');
            if (monthlyLabel) monthlyLabel.classList.add('active');
            if (yearlyLabel) yearlyLabel.classList.remove('active');

            // Update prices back to monthly
            Object.values(prices).forEach(price => {
                if (price) price.textContent = '25€';
            });

            // Update periods back to monthly using i18n
            Object.values(periods).forEach(period => {
                if (period) {
                    period.textContent = window.I18n ? window.I18n.t('servicesPage.periodMonthly') : '+ DPH / mesiac';
                }
            });
        }
    });
}

// Initialize services page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeServicesBillingToggle();
    
    // Add smooth scroll behavior for FAQ items
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            setTimeout(() => {
                this.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 300);
        });
    });
});