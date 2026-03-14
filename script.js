// ========== WAIT FOR DOM TO LOAD COMPLETELY ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== INITIALIZE AOS ==========
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // ========== PARTICLES.JS CONFIGURATION ==========
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#6c5ce7'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6c5ce7',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }

    // ========== CUSTOM CURSOR ==========
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });
    }

    // ========== TYPING ANIMATION ==========
    const dynamicText = document.querySelector('.dynamic-text');
    if (dynamicText) {
        const phrases = [
            'Cybersecurity Enthusiast',
            'Cyber Crime Investigator',
            'OSINT Specialist',
            'Ethical Hacker',
            'Threat Hunter',
            'Security Researcher'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
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

    // ========== BINARY RAIN EFFECT ==========
    function createBinaryRain() {
        const container = document.getElementById('binary-rain');
        if (!container) return;
        
        // Clear existing
        container.innerHTML = '';
        
        const chars = '01';
        const columns = Math.floor(container.offsetWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            const span = document.createElement('span');
            span.style.position = 'absolute';
            span.style.left = i * 20 + 'px';
            span.style.top = Math.random() * 100 + '%';
            span.style.color = '#6c5ce7';
            span.style.fontSize = '14px';
            span.style.fontFamily = 'monospace';
            span.style.opacity = Math.random() * 0.5;
            span.style.animation = `fall ${3 + Math.random() * 5}s linear infinite`;
            span.style.animationDelay = Math.random() * 5 + 's';
            span.textContent = chars[Math.floor(Math.random() * chars.length)];
            container.appendChild(span);
        }
    }

    // Add CSS for binary rain animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);

    createBinaryRain();
    
    window.addEventListener('resize', () => {
        createBinaryRain();
    });

    // ========== NAVBAR TOGGLE ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            const spans = hamburger.querySelectorAll('span');
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

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
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

    // ========== DOWNLOAD RESUME ==========
    const downloadBtn = document.getElementById('download-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const link = document.createElement('a');
            link.href = 'https://drive.google.com/uc?export=download&id=1H9K8JkG7F5D3S2A4Q6W8E9R7T5Y2U4I';
            link.download = 'Nikul_Suthar_Resume.pdf';
            link.click();
            alert('Resume download started!');
        });
    }

    // ========== CERTIFICATES MANUAL SLIDER ==========
    function initCertificateSlider() {
        const sliderTrack = document.getElementById('certsTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const sliderDots = document.getElementById('sliderDots');
        
        if (!sliderTrack || !prevBtn || !nextBtn) {
            console.log('Slider elements not found - using alternative IDs');
            // Try alternative IDs
            const altTrack = document.getElementById('certTrack');
            const altPrev = document.getElementById('prevCert');
            const altNext = document.getElementById('nextCert');
            
            if (altTrack && altPrev && altNext) {
                initSliderWithElements(altTrack, altPrev, altNext, sliderDots);
            }
            return;
        }
        
        initSliderWithElements(sliderTrack, prevBtn, nextBtn, sliderDots);
    }

    function initSliderWithElements(track, prevBtn, nextBtn, dotsContainer) {
        const certItems = document.querySelectorAll('.cert-item, .cert-card');
        if (certItems.length === 0) return;
        
        const totalItems = certItems.length;
        let currentIndex = 0;
        
        function getVisibleCards() {
            if (window.innerWidth > 1024) return 3;
            if (window.innerWidth > 768) return 2;
            return 1;
        }
        
        let visibleCards = getVisibleCards();
        let maxIndex = Math.max(0, totalItems - visibleCards);
        
        // Get card width
        const firstCard = certItems[0];
        const cardWidth = firstCard.offsetWidth;
        const gap = 32; // 2rem gap
        
        function updateSlider() {
            const translateX = -(currentIndex * (cardWidth + gap));
            track.style.transform = `translateX(${translateX}px)`;
            
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;
            
            updateDots();
        }
        
        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            
            for (let i = 0; i <= maxIndex; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateSlider();
                });
                dotsContainer.appendChild(dot);
            }
            updateDots();
        }
        
        function updateDots() {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });
        
        // Touch events
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex < maxIndex) {
                    currentIndex++;
                } else if (diff < 0 && currentIndex > 0) {
                    currentIndex--;
                }
                updateSlider();
            }
        }, { passive: true });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            } else if (e.key === 'ArrowRight') {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateSlider();
                }
            }
        });
        
        // Resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                visibleCards = getVisibleCards();
                maxIndex = Math.max(0, totalItems - visibleCards);
                currentIndex = Math.min(currentIndex, maxIndex);
                createDots();
                updateSlider();
            }, 150);
        });
        
        createDots();
        updateSlider();
    }

    // Initialize certificate slider
    initCertificateSlider();

    // ========== SHOW MORE CERTIFICATES ==========
    const showMoreBtn = document.getElementById('showMoreCerts');
    const moreCerts = document.getElementById('moreCerts');
    
    if (showMoreBtn && moreCerts) {
        let isShowingMore = false;
        
        showMoreBtn.addEventListener('click', () => {
            isShowingMore = !isShowingMore;
            
            if (isShowingMore) {
                moreCerts.classList.remove('hidden');
                showMoreBtn.innerHTML = '<span>Show Less</span><i class="fas fa-chevron-up"></i>';
            } else {
                moreCerts.classList.add('hidden');
                showMoreBtn.innerHTML = '<span>Show More (4 more)</span><i class="fas fa-chevron-down"></i>';
            }
        });
    }

    // ========== CERTIFICATE VIEW BUTTONS ==========
    document.querySelectorAll('.cert-view-btn, .cert-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const certType = btn.getAttribute('data-cert');
            
            const certUrls = {
                'defronix': 'assets/certificates/defronix.pdf',
                'cisco-ethical': 'assets/certificates/cisco-ethical.pdf',
                'cisco': 'assets/certificates/cisco-ethical.pdf',
                'phishing': 'assets/certificates/phishing.pdf',
                'isea': 'assets/certificates/isea.pdf',
                'cisco-intro': 'assets/certificates/cisco-intro.pdf',
                'aig': 'assets/certificates/aig.pdf',
                'deloitte': 'assets/certificates/deloitte.pdf',
                'tata-cyber': 'assets/certificates/tata-cyber.pdf',
                'tata-data': 'assets/certificates/tata-data.pdf',
                'tata': 'assets/certificates/tata-data.pdf',
                'mastercard': 'assets/certificates/mastercard.pdf',
                'tda-interior': 'assets/certificates/tda-interior.pdf',
                'tda-arch': 'assets/certificates/tda-arch.pdf'
            };
            
            const url = certUrls[certType];
            
            if (url && url !== '#') {
                window.open(url, '_blank');
            } else {
                alert('Certificate PDF will be added soon!');
            }
        });
    });

    // ========== CONTACT FORM - WEB3FORMS ==========
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && formMessage && submitBtn) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            formMessage.style.display = 'none';
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    formMessage.className = 'form-message success';
                    formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
                    formMessage.style.display = 'block';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                } else {
                    formMessage.className = 'form-message error';
                    formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + (result.message || 'Something went wrong. Please try again.');
                    formMessage.style.display = 'block';
                }
            } catch (error) {
                formMessage.className = 'form-message error';
                formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send. Please check your internet connection.';
                formMessage.style.display = 'block';
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== PARALLAX EFFECT ==========
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const shield = document.querySelector('.floating-shield');
        if (shield) {
            shield.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    // ========== SCROLL REVEAL ANIMATIONS ==========
    const revealElements = document.querySelectorAll('.skill-tool, .project-card, .cert-item, .cert-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(el);
    });

}); // END OF DOMContentLoaded