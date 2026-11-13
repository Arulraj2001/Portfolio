/**
 * ARULRAJ S — STUDIO INTERACTIONS & FORM HANDLING
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Drawer Navigation
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

    // 2. FAQ Accordion Mechanics
    const accTriggers = document.querySelectorAll('.acc-trigger');
    accTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            const body = trigger.nextElementSibling;

            // Close other items
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

    // 3. Project Inquiry Form with WhatsApp Payload Routing
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

            const message = `*New Project Inquiry for Arulraj*%0A%0A` +
                            `*Client Name:* ${encodeURIComponent(name)}%0A` +
                            `*Business / Brand:* ${encodeURIComponent(business || 'N/A')}%0A` +
                            `*Contact Phone:* ${encodeURIComponent(phone)}%0A` +
                            `*Project Type:* ${encodeURIComponent(projectType)}%0A` +
                            `*Details:* ${encodeURIComponent(details || 'Ready to discuss on call')}`;

            if (formFeedback) {
                formFeedback.className = 'form-feedback success';
                formFeedback.textContent = 'Opening WhatsApp with your project details...';
            }

            setTimeout(() => {
                const whatsappUrl = `https://wa.me/918637474067?text=${message}`;
                window.open(whatsappUrl, '_blank', 'noopener');
                if (formFeedback) {
                    formFeedback.textContent = 'Thank you! If WhatsApp did not open automatically, message me at +91 86374 74067.';
                }
                projectForm.reset();
            }, 500);
        });
    }

    // 4. GSAP Scroll Animations (Optional & non-blocking)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('.hero-left', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('.hero-visual-card', {
            opacity: 0,
            scale: 0.96,
            duration: 0.9,
            delay: 0.2,
            ease: 'power3.out'
        });

        const productCards = document.querySelectorAll('.product-item');
        productCards.forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%'
                },
                opacity: 0,
                y: 35,
                duration: 0.7,
                delay: (i % 2) * 0.1,
                ease: 'power3.out'
            });
        });
    }
});
