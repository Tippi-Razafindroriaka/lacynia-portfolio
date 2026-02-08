// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    }
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create Instagram message
    const instagramMessage = `Bonjour Cynthia,\n\nJe m'appelle ${name}.\nEmail: ${email}\n\nMessage: ${message}`;
    
    // Redirect to Instagram (opens Instagram app or web)
    // Note: Instagram doesn't support pre-filled messages via URL, so we'll open the profile
    window.open('https://www.instagram.com/lacyniar', '_blank');
    
    // Show confirmation alert
    alert('Vous allez être redirigé vers Instagram. N\'oubliez pas d\'envoyer votre message à @lacyniar !');
    
    // Reset form
    this.reset();
});

// Animation on Scroll (Simple Fade In)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card, .service-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Console Welcome Message
console.log('%c👋 Bienvenue sur le portfolio de Lacynia!', 'font-size: 20px; color: #6B7E52; font-weight: bold;');
console.log('%cDéveloppé avec ❤️ pour Cynthia Reydellet', 'font-size: 14px; color: #6C757D;');
