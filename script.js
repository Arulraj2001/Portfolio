const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", window.scrollY > 0);
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menu) {
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

window.onscroll = () => {
    if (menu) {
        menu.classList.remove('bx-x');
    }
    if (navbar) {
        navbar.classList.remove('active');
    }
};

// ScrollReveal Animations
const sr = ScrollReveal({
    distance: '25px',
    duration: 250,
    reset: true
});

sr.reveal('.home-text', { delay: 190, origin: 'bottom' });
sr.reveal('.about, .inner, .experience, .achievement, .portfolio, .works, .POR, .contact', { delay: 200, origin: 'bottom' });

// Fix for work card preview images fallback
document.querySelectorAll('.preview-img').forEach(img => {
    img.addEventListener('error', function() {
        if (!this.src.includes('placehold.co')) {
            this.src = 'https://placehold.co/600x400/1e1f2c/4a9beb?text=Live+Preview';
        }
    });
});

// Optional: Add smooth hover effect for work cards (ensures consistency)
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Additional hover effects can be added here if needed
        this.style.transition = 'all .40s ease';
    });
});
