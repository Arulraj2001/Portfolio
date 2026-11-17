/**
 * ARULRAJ S — ULTRA-PREMIER STUDIO INTERACTIONS & MOTION ENGINE
 * Features:
 *  - Ethereal Interactive Ambient Canvas (60fps Particles + Glowing Connections)
 *  - Dynamic Cursor Spotlight & Card Halo Tracking
 *  - Real-time IST Live Clock Pill (Chennai, India)
 *  - Interactive Project Category Filter with Fluid Animations
 *  - Animated Number Counters (Odometer on Scroll)
 *  - Smart Navbar Glass Backdrop Blur on Scroll
 *  - FAQ Accordion with Spring Physics
 *  - WhatsApp Direct Routing Form Engine
 *  - GSAP Stagger ScrollTrigger Reveals
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Real-Time IST Live Clock Pill
       ========================================================================== */
    const liveClockEl = document.getElementById('liveClock');
    function updateISTClock() {
        if (!liveClockEl) return;
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
        liveClockEl.textContent = `Chennai, IN • ${timeString} IST`;
    }
    updateISTClock();
    setInterval(updateISTClock, 1000);


    /* ==========================================================================
       2. Dynamic Cursor Spotlight & Card Halo Tracker
       ========================================================================== */
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 3;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
    }, { passive: true });

    // Per-card local mouse spotlight tracking
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }, { passive: true });
    });


    /* ==========================================================================
       3. Ethereal Interactive Ambient Canvas (Background Particle Mesh)
       ========================================================================== */
    const canvas = document.getElementById('ambient-canvas');
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        }, { passive: true });

        const particleCount = Math.min(Math.floor(window.innerWidth / 35), 45);
        let particles = [];

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
                this.radius = Math.random() * 2.2 + 1;
                this.baseAlpha = Math.random() * 0.4 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce at edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Gentle mouse repulsion
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    const angle = Math.atan2(dy, dx);
                    const force = (140 - dist) / 140;
                    this.x -= Math.cos(angle) * force * 1.5;
                    this.y -= Math.sin(angle) * force * 1.5;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(16, 185, 129, ${this.baseAlpha})`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        let animId;
        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const alpha = (1 - dist / 130) * 0.18;
                        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(animateCanvas);
        }
        animateCanvas();

        // Pause animation when tab is inactive to save battery
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animId);
            } else {
                animateCanvas();
            }
        });
    }


    /* ==========================================================================
       4. Smart Navbar Glass Backdrop on Scroll
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    function handleNavScroll() {
        if (!navbar) return;
        if (window.scrollY > 25) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();


    /* ==========================================================================
       5. Mobile Drawer Menu Navigation
       ========================================================================== */
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (mobileBtn && mobileDrawer) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            mobileBtn.classList.toggle('active');
            mobileDrawer.setAttribute('aria-hidden', !isOpen);
        });

        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                mobileBtn.classList.remove('active');
                mobileDrawer.setAttribute('aria-hidden', 'true');
            });
        });
    }


    /* ==========================================================================
       6. Interactive Project Category Filter
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCardsAll = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCardsAll.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    /* ==========================================================================
       7. Animated Number Counters (Odometer on Scroll)
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    function countUpNumbers() {
        if (counted) return;
        statNumbers.forEach(el => {
            const rawText = el.textContent.trim();
            const hasPlus = rawText.includes('+');
            const targetVal = parseInt(rawText.replace(/[^0-9]/g, ''), 10);

            if (isNaN(targetVal)) return;

            let current = 0;
            const duration = 1600;
            const stepTime = 25;
            const steps = duration / stepTime;
            const increment = targetVal / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= targetVal) {
                    current = targetVal;
                    clearInterval(timer);
                }
                const formatted = Math.floor(current).toLocaleString('en-US');
                el.textContent = `${formatted}${hasPlus ? '+' : ''}`;
            }, stepTime);
        });
        counted = true;
    }

    const statStrip = document.querySelector('.stat-strip');
    if (statStrip && 'IntersectionObserver' in window) {
        const statObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                countUpNumbers();
                statObserver.disconnect();
            }
        }, { threshold: 0.3 });
        statObserver.observe(statStrip);
    } else {
        countUpNumbers();
    }


    /* ==========================================================================
       8. FAQ Accordion Mechanics
       ========================================================================== */
    const accTriggers = document.querySelectorAll('.acc-trigger');
    accTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            const body = trigger.nextElementSibling;

            // Close others for clean accordion feel
            accTriggers.forEach(other => {
                if (other !== trigger) {
                    other.setAttribute('aria-expanded', 'false');
                    const otherBody = other.nextElementSibling;
                    if (otherBody) otherBody.style.maxHeight = null;
                }
            });

            if (isExpanded) {
                trigger.setAttribute('aria-expanded', 'false');
                body.style.maxHeight = null;
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });


    /* ==========================================================================
       9. Project Inquiry Form with WhatsApp Payload Routing
       ========================================================================== */
    const projectForm = document.getElementById('projectForm');
    const formFeedback = document.getElementById('formFeedback');

    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('clientName').value.trim();
            const business = document.getElementById('businessName').value.trim();
            const phone = document.getElementById('contactMethod').value.trim();
            const projectType = document.getElementById('projectType').value;
            const details = document.getElementById('projectDetails').value.trim();

            if (!name || !phone || !projectType) {
                if (formFeedback) {
                    formFeedback.textContent = 'Please fill out all required fields marked with *.';
                    formFeedback.style.color = '#EF4444';
                }
                return;
            }

            const message = `*New Project Brief for Arulraj*%0A%0A` +
                            `*Client Name:* ${encodeURIComponent(name)}%0A` +
                            `*Business / Brand:* ${encodeURIComponent(business || 'N/A')}%0A` +
                            `*Phone / WhatsApp:* ${encodeURIComponent(phone)}%0A` +
                            `*Project Type:* ${encodeURIComponent(projectType)}%0A` +
                            `*Project Details:* ${encodeURIComponent(details || 'Ready to discuss on call')}`;

            if (formFeedback) {
                formFeedback.className = 'form-feedback success';
                formFeedback.textContent = 'Opening WhatsApp with your project brief...';
            }

            setTimeout(() => {
                const whatsappUrl = `https://wa.me/918637474067?text=${message}`;
                window.open(whatsappUrl, '_blank', 'noopener');
                if (formFeedback) {
                    formFeedback.textContent = 'Thank you! If WhatsApp did not open automatically, message me at +91 86374 74067.';
                }
                projectForm.reset();
            }, 450);
        });
    }


    /* ==========================================================================
       10. GSAP Scroll Animations & Fluid Reveal
       ========================================================================== */
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Hero entrance
        gsap.from('.hero-left', {
            opacity: 0,
            y: 32,
            duration: 0.85,
            ease: 'power3.out'
        });

        gsap.from('.hero-visual-card', {
            opacity: 0,
            scale: 0.95,
            duration: 0.95,
            delay: 0.2,
            ease: 'power3.out'
        });

        // Stagger project cards reveal on scroll
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.from('.project-card', {
                scrollTrigger: {
                    trigger: '.bento-projects-grid',
                    start: 'top 82%'
                },
                opacity: 0,
                y: 35,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out'
            });

            gsap.from('.service-box', {
                scrollTrigger: {
                    trigger: '.services-modern-grid',
                    start: 'top 82%'
                },
                opacity: 0,
                y: 35,
                duration: 0.7,
                stagger: 0.08,
                ease: 'power3.out'
            });
        }
    }
});
