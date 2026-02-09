// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollToTop();
    initializeAnimations();
    initializeContactForm();
    initializeProcessSection();
    initializePricingAnimations();
    initializeGallerySlideshow();
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

// Pricing card entrance animations
function initializePricingAnimations() {
    var pricingCards = document.querySelectorAll('[data-animate="pricing"]');
    if (pricingCards.length) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        pricingCards.forEach(function(card) { observer.observe(card); });
    }
}

// Gallery slideshow (mobile)
var galleryCurrentIndex = 0;

function initializeGallerySlideshow() {
    var slideshow = document.querySelector('.gallery-slideshow');
    if (!slideshow) return;

    var slides = slideshow.querySelectorAll('.gallery-slide');
    var dotsContainer = slideshow.querySelector('.gallery-dots');
    if (!slides.length || !dotsContainer) return;

    // Create dots
    for (var i = 0; i < slides.length; i++) {
        var dot = document.createElement('button');
        dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Photo ' + (i + 1));
        dot.dataset.index = i;
        dot.addEventListener('click', function() {
            galleryGoTo(parseInt(this.dataset.index));
        });
        dotsContainer.appendChild(dot);
    }
}

function galleryGoTo(index) {
    var slideshow = document.querySelector('.gallery-slideshow');
    if (!slideshow) return;

    var slides = slideshow.querySelectorAll('.gallery-slide');
    var dots = slideshow.querySelectorAll('.gallery-dot');
    if (!slides.length) return;

    // Wrap around
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
    }

    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    galleryCurrentIndex = index;
}

function galleryNav(direction) {
    galleryGoTo(galleryCurrentIndex + direction);
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

            // Subtle background arrow
            svgContent += '<path d="' + d + '" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="3" stroke-linecap="round"/>';
            // Green animated arrow
            svgContent += '<path class="arrow-fg" data-arrow="' + i + '" d="' + d + '" fill="none" stroke="#4CAF50" stroke-width="3" stroke-linecap="round"/>';
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
            bg.style.transform = 'translateX(' + (progress * 600) + 'px)';
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
    const formStartTime = Date.now();
    const submitHistoryKey = 'contact-submit-history';
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');

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

    function getI18nMessage(key, fallback) {
        if (window.I18n && typeof window.I18n.t === 'function') {
            const value = window.I18n.t(key);
            if (value !== key) return value;
        }
        return fallback;
    }

    function setFieldError(input, errorEl, message) {
        if (!input || !errorEl) return;
        if (message) {
            input.classList.add('is-invalid');
            errorEl.textContent = message;
        } else {
            input.classList.remove('is-invalid');
            errorEl.textContent = '';
        }
    }

    function validateName() {
        if (!nameInput) return true;
        const value = nameInput.value.trim();
        if (!value) {
            setFieldError(nameInput, nameError, getI18nMessage('alerts.fillRequired', 'Prosím vyplňte všetky povinné polia označené *'));
            return false;
        }
        const nameRegex = /^[A-Za-zÀ-ž\s'.-]{2,}$/;
        if (!nameRegex.test(value)) {
            setFieldError(nameInput, nameError, getI18nMessage('alerts.invalidName', 'Meno môže obsahovať len písmená'));
            return false;
        }
        setFieldError(nameInput, nameError, '');
        return true;
    }

    function validateEmail() {
        if (!emailInput) return true;
        const value = emailInput.value.trim();
        if (!value) {
            setFieldError(emailInput, emailError, getI18nMessage('alerts.fillRequired', 'Prosím vyplňte všetky povinné polia označené *'));
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setFieldError(emailInput, emailError, getI18nMessage('alerts.invalidEmail', 'Prosím zadajte platnú emailovú adresu'));
            return false;
        }
        setFieldError(emailInput, emailError, '');
        return true;
    }

    function validatePhone() {
        if (!phoneInput) return true;
        const value = phoneInput.value.trim();
        if (!value) {
            setFieldError(phoneInput, phoneError, '');
            return true;
        }
        const phoneRegex = /^\+?[0-9\s]+$/;
        const digitsCount = value.replace(/\D/g, '').length;
        if (!phoneRegex.test(value) || digitsCount < 6) {
            setFieldError(phoneInput, phoneError, getI18nMessage('alerts.invalidPhone', 'Telefón môže obsahovať len čísla a +'));
            return false;
        }
        setFieldError(phoneInput, phoneError, '');
        return true;
    }

    function validateMessage() {
        if (!messageInput) return true;
        const value = messageInput.value.trim();
        if (!value) {
            setFieldError(messageInput, messageError, getI18nMessage('alerts.fillRequired', 'Prosím vyplňte všetky povinné polia označené *'));
            return false;
        }
        setFieldError(messageInput, messageError, '');
        return true;
    }

    function validateAll() {
        const v1 = validateName();
        const v2 = validateEmail();
        const v3 = validatePhone();
        const v4 = validateMessage();
        return v1 && v2 && v3 && v4;
    }

    function attachLiveValidation(input, validator) {
        if (!input) return;
        input.addEventListener('input', validator);
        input.addEventListener('blur', validator);
    }

    attachLiveValidation(nameInput, validateName);
    attachLiveValidation(emailInput, validateEmail);
    attachLiveValidation(phoneInput, validatePhone);
    attachLiveValidation(messageInput, validateMessage);

    window.addEventListener('languageChanged', () => {
        validateAll();
    });

    function canSubmitNow() {
        const now = Date.now();

        // Require a short dwell time to reduce bot submissions
        if (now - formStartTime < 3000) {
            showAlert(
                getI18nMessage('alerts.tooFast', 'Prosím chvíľu počkajte a skúste to znova.'),
                'error'
            );
            return false;
        }

        try {
            const historyRaw = localStorage.getItem(submitHistoryKey);
            const history = historyRaw ? JSON.parse(historyRaw) : [];
            const tenMinutesAgo = now - 10 * 60 * 1000;
            const recent = history.filter(ts => ts >= tenMinutesAgo);

            if (recent.length >= 2) {
                showAlert(
                    getI18nMessage('alerts.tooMany', 'Dosiahli ste limit odoslaní. Skúste to neskôr.'),
                    'error'
                );
                return false;
            }
        } catch (e) {
            // If localStorage fails, allow submit
        }

        return true;
    }

    function recordSubmit() {
        const now = Date.now();
        try {
            const historyRaw = localStorage.getItem(submitHistoryKey);
            const history = historyRaw ? JSON.parse(historyRaw) : [];
            history.push(now);
            const tenMinutesAgo = now - 10 * 60 * 1000;
            const trimmed = history.filter(ts => ts >= tenMinutesAgo);
            localStorage.setItem(submitHistoryKey, JSON.stringify(trimmed));
        } catch (e) {
            // ignore
        }
    }

    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const nameValue = document.getElementById('name')?.value?.trim() || '';
            const emailValue = document.getElementById('email')?.value?.trim() || '';
            const phoneValue = document.getElementById('phone')?.value?.trim() || '';
            const messageValue = document.getElementById('message')?.value?.trim() || '';
            const companyNameValue = document.getElementById('companyName')?.value?.trim() || '';
            const icoValue = document.getElementById('ico')?.value?.trim() || '';
            const honeypotValue = document.getElementById('website')?.value || '';

            // Honeypot check (silent fail)
            if (honeypotValue) {
                return;
            }

            if (!validateAll()) {
                showAlert(
                    getI18nMessage('alerts.fillRequired', 'Prosím vyplňte všetky povinné polia označené *'),
                    'error'
                );
                return;
            }

            if (!canSubmitNow()) {
                return;
            }

            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.classList.add('is-loading');
                submitButton.dataset.originalText = submitButton.dataset.originalText || submitButton.textContent;
                submitButton.textContent = getI18nMessage('alerts.sending', 'Odosielanie správy...');
            }

            showAlert(
                getI18nMessage('alerts.sending', 'Odosielanie správy...'),
                'info'
            );

            const payload = new URLSearchParams();
            payload.append('name', nameValue);
            payload.append('email', emailValue);
            if (phoneValue) payload.append('phone', phoneValue);
            payload.append('message', messageValue);
            if (companyNameValue) payload.append('companyName', companyNameValue);
            if (icoValue) payload.append('ico', icoValue);

            try {
                await fetch(this.action, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: payload.toString()
                });

                recordSubmit();

                // Show success message
                showAlert(
                    getI18nMessage('alerts.thankYou', 'Ďakujeme za vašu správu! Kontaktujeme vás čoskoro.'),
                    'success'
                );
            } catch (error) {
                showAlert(
                    getI18nMessage('alerts.submitError', 'Odoslanie sa nepodarilo. Skúste to prosím neskôr.'),
                    'error'
                );
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.classList.remove('is-loading');
                    submitButton.textContent = submitButton.dataset.originalText || submitButton.textContent;
                }
                return;
            }

            // Reset form
            this.reset();
            if (companyFields) {
                companyFields.classList.remove('show');
            }

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.classList.remove('is-loading');
                submitButton.textContent = submitButton.dataset.originalText || submitButton.textContent;
            }
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
