/* ============================================
   KælderRum — Premium Interactions
   ============================================ */

(function () {
    'use strict';

    // ---------- Intersection Observer: Reveal on Scroll ----------
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Once revealed, stop observing
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
        revealObserver.observe(el);
    });

    // ---------- Sticky Navbar ----------
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // ---------- Smooth Scroll for Nav Links ----------
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();

            // Close mobile menu if open
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');

            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // ---------- Hamburger Menu ----------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });

    // ---------- Hero Typing Effect ----------
    const typingTarget = document.getElementById('typingTarget');
    const phrases = ['Under Dine Fødder.', 'I Hver Eneste Kælder.', 'Over Hele Danmark.'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    // Add cursor element
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    typingTarget.appendChild(cursor);

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        // Re-append cursor after text change
        typingTarget.appendChild(cursor);

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after a short delay
    setTimeout(type, 800);

    // ---------- Counter Animation ----------
    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.hero-stat-number[data-target]');
        counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = Math.round(eased * target);
                counter.textContent = value.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        });
    }

    // ---------- Hero Parallax ----------
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener(
        'scroll',
        () => {
            if (!hero) return;
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                const parallaxVal = scrolled * 0.35;
                const opacityVal = 1 - scrolled / heroHeight;
                heroContent.style.transform = `translateY(${parallaxVal}px)`;
                heroContent.style.opacity = Math.max(opacityVal, 0);
            }
        },
        { passive: true }
    );

    // ---------- Hero Particles ----------
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = 4 + Math.random() * 4 + 's';
            particle.style.opacity = 0.1 + Math.random() * 0.3;
            particle.style.width = 2 + Math.random() * 3 + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    // ---------- How It Works Tabs ----------
    const tabs = document.querySelectorAll('.hiw-tab');
    const tabContents = document.querySelectorAll('.hiw-content');

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            tabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach((content) => {
                content.classList.remove('active');
                if (content.id === 'tab-' + targetTab) {
                    content.classList.add('active');
                    // Re-trigger reveal for items inside
                    content.querySelectorAll('.reveal').forEach((el) => {
                        el.classList.remove('visible');
                        setTimeout(() => el.classList.add('visible'), 50);
                    });
                }
            });
        });
    });

    // ---------- Sign Up Form Validation ----------
    const form = document.getElementById('signupForm');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        const fullNameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const strengthBar = document.querySelector('.strength-bar');

        // Live password strength
        passwordInput.addEventListener('input', () => {
            const val = passwordInput.value;
            clearError(passwordInput, 'passwordError');

            if (val.length === 0) {
                strengthBar.className = 'strength-bar';
                return;
            }

            let score = 0;
            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            if (score <= 1) {
                strengthBar.className = 'strength-bar weak';
            } else if (score <= 2) {
                strengthBar.className = 'strength-bar medium';
            } else {
                strengthBar.className = 'strength-bar strong';
            }
        });

        // Clear errors on input
        fullNameInput.addEventListener('input', () => clearError(fullNameInput, 'fullNameError'));
        emailInput.addEventListener('input', () => clearError(emailInput, 'emailError'));

        function setError(input, errorId, message) {
            input.classList.add('error');
            input.classList.remove('success');
            document.getElementById(errorId).textContent = message;
        }

        function clearError(input, errorId) {
            input.classList.remove('error');
            input.classList.add('success');
            document.getElementById(errorId).textContent = '';
        }

        function setFieldError(errorId, message) {
            document.getElementById(errorId).textContent = message;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            // Full Name
            if (fullNameInput.value.trim().length < 2) {
                setError(fullNameInput, 'fullNameError', 'Indtast venligst dit fulde navn.');
                valid = false;
            }

            // Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                setError(emailInput, 'emailError', 'Indtast venligst en gyldig e-mailadresse.');
                valid = false;
            }

            // Password
            if (passwordInput.value.length < 8) {
                setError(passwordInput, 'passwordError', 'Adgangskoden skal være mindst 8 tegn.');
                valid = false;
            }

            // Account type
            const accountType = form.querySelector('input[name="accountType"]:checked');
            if (!accountType) {
                setFieldError('accountTypeError', 'Vælg venligst en kontotype.');
                valid = false;
            } else {
                document.getElementById('accountTypeError').textContent = '';
            }

            if (!valid) return;

            // Simulate submission
            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                form.style.display = 'none';
                formSuccess.classList.add('show');
            }, 1500);
        });
    }

    // ---------- Active Nav Link Highlight ----------
    const sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        const scrollY = window.pageYOffset + 120;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach((a) => {
                    a.classList.remove('active-link');
                    if (a.getAttribute('href') === '#' + sectionId) {
                        a.classList.add('active-link');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
})();
