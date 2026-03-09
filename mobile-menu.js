// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    body.appendChild(overlay);
    
    // Toggle menu
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    // Menu toggle click
    menuToggle.addEventListener('click', toggleMenu);
    
    // Overlay click to close
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});
