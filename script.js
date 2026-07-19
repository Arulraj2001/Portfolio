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
sr.reveal('.about, .inner, .services, .experience, .works, .process, .contact', { delay: 200, origin: 'bottom' });

// Fix for work card preview images fallback
function initImageFallback() {
    document.querySelectorAll('.preview-img').forEach(img => {
        img.addEventListener('error', function() {
            if (!this.src.includes('placehold.co')) {
                this.src = 'https://placehold.co/600x400/1e1f2c/4a9beb?text=Live+Demo';
            }
        });
    });
}

initImageFallback();

// Optional: Add smooth hover effect for work cards
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all .40s ease';
    });
});

// Headless CMS - Load data from data.json dynamically
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Update stats metrics
            if (data.stats) {
                const studentProjectsEl = document.getElementById('stat-student-projects');
                const brandWebsitesEl = document.getElementById('stat-brand-websites');
                if (studentProjectsEl) studentProjectsEl.textContent = data.stats.studentProjects;
                if (brandWebsitesEl) brandWebsitesEl.textContent = data.stats.brandWebsites;
            }
            
            // Render project items
            const projectsContainer = document.getElementById('projects-container');
            if (projectsContainer && data.projects) {
                projectsContainer.innerHTML = data.projects.map(project => {
                    const techTags = project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
                    return `
                        <a href="${project.link}" class="work-card" target="_blank" rel="noopener noreferrer">
                            <div class="preview-container">
                                <img src="${project.previewImg}" alt="${project.title}" class="preview-img" onerror="this.src='https://placehold.co/600x400/1e1f2c/4a9beb?text=Live+Demo'">
                                <div class="overlay">
                                    <span class="overlay-text">View Live Demo →</span>
                                </div>
                            </div>
                            <div class="work-info">
                                <h3 class="work-title">${project.title}</h3>
                                <div class="tech-stack">
                                    ${techTags}
                                </div>
                            </div>
                        </a>
                    `;
                }).join('');
                initImageFallback();
            }
        })
        .catch(err => {
            console.warn('Could not load data.json, using static HTML fallback:', err);
        });
});
