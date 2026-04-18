const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
    header.classList.toggle ("sticky", window.scrollY >0);
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Fix for work card preview images fallback
document.querySelectorAll('.preview-img').forEach(img => {
    img.addEventListener('error', function() {
        if (!this.src.includes('placehold.co')) {
            this.src = 'https://placehold.co/600x400/1e1f2c/4a9beb?text=Live+Preview';
        }
    });
});

// Add works section to scroll reveal (if you're using ScrollReveal)
if (typeof sr !== 'undefined') {
    sr.reveal('.works', { delay: 120, origin: 'bottom' });
} else if (typeof ScrollReveal !== 'undefined') {
    const reveal = ScrollReveal({ distance: '25px', duration: 500, reset: false });
    reveal.reveal('.works', { delay: 120, origin: 'bottom' });
}

const sr = ScrollReveal ({
    distance: '25px',
    duration: 250,
    reset: true
})

sr.reveal('.home-text',{delay:190, origin:'bottom'})

sr.reveal('.about,.services,.portfolio,.contact',{delay:200, origin:'bottom'})
