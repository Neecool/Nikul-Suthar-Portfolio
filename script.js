// ========== MODERN PORTFOLIO JAVASCRIPT ==========
document.addEventListener('DOMContentLoaded', function () {

    // ========== HIDE LOADER ==========
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    }

    // ========== CUSTOM CURSOR (Desktop Only) ==========
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // ========== TYPING ANIMATION ==========
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const phrases = [
            'Cybersecurity Enthusiast',
            'OSINT Specialist',
            'Ethical Hacker',
            'Threat Hunter',
            'Security Researcher'
        ];
        let phraseIndex = 0, charIndex = 0, isDeleting = false;

        function typeEffect() {
            const current = phrases[phraseIndex];
            if (isDeleting) {
                typingText.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }
            if (!isDeleting && charIndex === current.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, 500);
            } else {
                setTimeout(typeEffect, isDeleting ? 50 : 100);
            }
        }
        typeEffect();
    }

    // ========== MOBILE MENU ==========
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ========== ACTIVE NAVIGATION ==========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.clientHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ========== COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                if (!isNaN(target) && !el.hasAttribute('data-counted')) {
                    el.setAttribute('data-counted', 'true');
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            el.textContent = target;
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(current);
                        }
                    }, 20);
                }
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(stat => counterObserver.observe(stat));

    // ========== CERTIFICATE SLIDER ==========
    const certTrack = document.getElementById('certTrack');
    const certPrev = document.getElementById('certPrev');
    const certNext = document.getElementById('certNext');
    const certDots = document.getElementById('certDots');

    if (certTrack && certPrev && certNext) {
        const cards = document.querySelectorAll('.cert-card');
        let currentIndex = 0;

        function getVisible() {
            if (window.innerWidth < 480) return 1;
            if (window.innerWidth < 768) return 2;
            return 3;
        }

        function updateSlider() {
            const visible = getVisible();
            const max = Math.max(0, cards.length - visible);
            if (currentIndex > max) currentIndex = max;
            const width = cards[0]?.offsetWidth + 24;
            certTrack.style.transform = `translateX(-${currentIndex * width}px)`;
            if (certPrev) certPrev.disabled = currentIndex === 0;
            if (certNext) certNext.disabled = currentIndex >= max;
            updateDots(max);
        }

        function updateDots(max) {
            if (!certDots) return;
            certDots.innerHTML = '';
            for (let i = 0; i <= max; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => { currentIndex = i; updateSlider(); });
                certDots.appendChild(dot);
            }
        }

        certPrev.addEventListener('click', () => {
            if (currentIndex > 0) { currentIndex--; updateSlider(); }
        });
        certNext.addEventListener('click', () => {
            const max = Math.max(0, cards.length - getVisible());
            if (currentIndex < max) { currentIndex++; updateSlider(); }
        });

        window.addEventListener('resize', () => setTimeout(updateSlider, 150));
        updateSlider();
    }

    // ========== CERTIFICATE VIEW BUTTONS ==========
    document.querySelectorAll('.cert-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const certId = btn.getAttribute('data-cert');
            const pdfUrl = `assets/${certId}.pdf`;

            window.open(pdfUrl, '_blank');
        });
    });

    // ========== DOWNLOAD RESUME ==========
    const downloadBtn = document.getElementById('downloadResume');
    const downloadCv = document.getElementById('downloadCv');

    const downloadHandler = () => {
        alert('Resume download started!');
        const link = document.createElement('a');
        link.href = 'assets/resume/Nikul_Suthar_Resume.pdf';
        link.download = 'Nikul_Suthar_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    if (downloadBtn) downloadBtn.addEventListener('click', downloadHandler);
    if (downloadCv) downloadCv.addEventListener('click', downloadHandler);

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const original = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            if (formMessage) formMessage.style.display = 'none';

            const data = new FormData(contactForm);
            const obj = Object.fromEntries(data);

            try {
                const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(obj)
                });
                const result = await res.json();
                if (result.success) {
                    if (formMessage) {
                        formMessage.className = 'form-message success';
                        formMessage.innerHTML = '✓ Message sent successfully!';
                        formMessage.style.display = 'block';
                    }
                    contactForm.reset();
                    setTimeout(() => { if (formMessage) formMessage.style.display = 'none'; }, 5000);
                } else {
                    throw new Error();
                }
            } catch (error) {
                if (formMessage) {
                    formMessage.className = 'form-message error';
                    formMessage.innerHTML = '✗ Failed to send. Please try again.';
                    formMessage.style.display = 'block';
                }
                setTimeout(() => { if (formMessage) formMessage.style.display = 'none'; }, 5000);
            } finally {
                btn.innerHTML = original;
                btn.disabled = false;
            }
        });
    }

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ========== SCROLL REVEAL ANIMATIONS ==========
    const revealElements = document.querySelectorAll('.skill-category, .project-card, .cert-card, .timeline-item');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(el);
    });

    // ========== PARALLAX EFFECT ==========
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    console.log('Portfolio loaded successfully!');
});