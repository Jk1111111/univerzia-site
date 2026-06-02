// ==========================================
// UniverziaAi - JavaScript Functionality
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    // ==========================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    // If it's a dropdown, toggle dropdown instead of closing
                    const parent = this.closest('.dropdown');
                    if (parent) {
                        parent.classList.toggle('active');
                        return;
                    }
                    // Otherwise close the menu
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    }

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Apply drop shadow when scrolled past top
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide on scroll down past threshold, show on scroll up
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-110%)'; // slightly more than 100% to ensure box shadow hides as well
        } else {
            // Scrolling up or at the very top - show navbar
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animateElements = document.querySelectorAll('.feature-card, .workshop-card, .testimonial-card, .value-card, .team-member, .impact-card, .course-card, .benefit-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // ==========================================
    // COURSE FILTER FUNCTIONALITY
    // ==========================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const courseCards = document.querySelectorAll('.course-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            courseCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    const cardCategories = card.getAttribute('data-category');
                    if (cardCategories && cardCategories.includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // ==========================================
    // SEARCH FUNCTIONALITY
    // ==========================================
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();

            courseCards.forEach(card => {
                const title = card.querySelector('.course-title').textContent.toLowerCase();
                const description = card.querySelector('.course-description').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }

    // ==========================================
    // CONTACT FORM SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // 1. Immediately prevent default to stop page refresh
            e.preventDefault();

            const scriptURL = 'https://script.google.com/macros/s/AKfycbw2mN_ALetDoOTycW4eDieSnFX5qfX4GsVUmy2rn-fcWVzdexCiJ7T5an02swz9k-skDg/exec';
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            // Use FormData directly
            const data = new FormData(contactForm);

            // 2. Updated Fetch without 'no-cors' to handle redirects better
            fetch(scriptURL, {
                method: 'POST',
                body: data
            })
                .then(response => {
                    console.log('Success!', response);

                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    formSuccess.classList.add('show');

                    // Reset after 5 seconds
                    setTimeout(() => {
                        contactForm.style.display = 'flex';
                        formSuccess.classList.remove('show');
                        contactForm.reset();
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    // Fallback: If Google returns a blocked response but still works
                    // we show the success message anyway
                    contactForm.style.display = 'none';
                    formSuccess.classList.add('show');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
        });
    }

    // ==========================================
    // FAQ ACCORDION
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Close all other FAQs
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherItem.classList.remove('active');
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle current FAQ if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            }
        });
    });

    // ==========================================
    // DYNAMIC COUNTER ANIMATION
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Trigger counter animation when stats are visible
    const statNumbers = document.querySelectorAll('.stat-number, .stat-number-large, .impact-stat');

    const statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));

                if (!isNaN(number)) {
                    entry.target.textContent = '0';
                    animateCounter(entry.target, number);

                    // Re-add suffix if present
                    setTimeout(() => {
                        if (text.includes('K+')) {
                            entry.target.textContent = number + 'K+';
                        } else if (text.includes('+')) {
                            entry.target.textContent = number + '+';
                        } else if (text.includes('%')) {
                            entry.target.textContent = number + '%';
                        } else if (text.includes('₹')) {
                            entry.target.textContent = '₹' + number + 'L';
                        }
                    }, 2000);
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ==========================================
    // PARALLAX EFFECT FOR HERO SHAPES
    // ==========================================
    const shapes = document.querySelectorAll('.shape');

    if (shapes.length > 0) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;

            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // ==========================================
    // BUTTON RIPPLE EFFECT REMOVED
    // ==========================================

    // ==========================================
    // WORKSHOP CARD HOVER ANIMATION REMOVED
    // ==========================================

    // ==========================================
    // GRADIENT CURSOR TRAIL (OPTIONAL EFFECT)
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #F08042, #D96D2E);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 16px rgba(240, 128, 66, 0.3);
        z-index: 999;
    `;

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTop.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1) translateY(-5px)';
        this.style.boxShadow = '0 6px 24px rgba(240, 128, 66, 0.4)';
    });

    backToTop.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 4px 16px rgba(240, 128, 66, 0.3)';
    });

    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    console.log('%c🚀 UniverziaAi - Transform Your Future! ', 'background: linear-gradient(135deg, #FF6B6B, #F08042, #FFD93D); color: white; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%cWebsite built with ❤️ for students', 'color: #F08042; font-size: 12px;');
});

// ==========================================
// PAGE LOAD ANIMATION REMOVED FOR STABILITY
// ==========================================
