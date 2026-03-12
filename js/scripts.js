// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn.addEventListener('click', () => {
    // Basic toggle for demo purposes
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        navLinks.style.flexDirection = '';
        navLinks.style.position = '';
        navLinks.style.backgroundColor = '';
        navLinks.style.width = '';
        navLinks.style.padding = '';
        navLinks.style.alignItems = '';
        navLinks.style.gap = '';
        navLinks.style.boxShadow = '';
        navLinks.style.borderTop = '';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.alignItems = 'center';
        navLinks.style.gap = '1.5rem';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'var(--bg-surface)';
        navLinks.style.padding = '2rem 1rem';
        navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.5)';
        navLinks.style.borderTop = '1px solid var(--glass-border)';
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const url = new URL(this.href, window.location.origin);

        // If the path is the same (or we are on / and path is index.html), handle smooth scroll
        const isSamePath = url.pathname === window.location.pathname ||
            (url.pathname.endsWith('index.html') && window.location.pathname.endsWith('/')) ||
            (url.pathname.endsWith('/') && window.location.pathname.endsWith('index.html'));

        if (isSamePath && url.hash) {
            e.preventDefault();

            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }

            const targetElement = document.querySelector(url.hash);
            if (targetElement) {
                // Account for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    });
});

// Staggered Animation on Scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add 'fade-in' class to sections for potential CSS animation hooks in future
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
