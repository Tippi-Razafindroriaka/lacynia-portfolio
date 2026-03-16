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

// Back to Top Button (si présent dans le HTML)
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// CONFIGURATION EMAILJS
// ============================================
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'TBj6Hq7J5YRrsTkcs',
    SERVICE_ID: 'service_gxgbi1g',
    TEMPLATE_ID: 'template_3s2fxv6' // Créez un template avec les champs: from_name, phone, message
};

// Initialiser EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
})();

// Contact Form Submission avec EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const originalBtnText = submitBtn.innerHTML;
    
    // Désactiver le bouton et afficher un message de chargement
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Envoi en cours...';
    formMessage.innerHTML = '';
    
    // Vérifier que EmailJS est configuré
    if (EMAILJS_CONFIG.PUBLIC_KEY === 'VOTRE_PUBLIC_KEY' || EMAILJS_CONFIG.TEMPLATE_ID === 'VOTRE_TEMPLATE_ID') {
        formMessage.innerHTML = '<div class=\"alert alert-warning\"><i class=\"bi bi-exclamation-triangle\"></i> Erreur de configuration: Veuillez configurer EmailJS dans script.js</div>';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        return;
    }
    
    // Préparer les données du formulaire
    const templateParams = {
        from_name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Envoyer l'email via EmailJS
    emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
    )
    .then(function(response) {
        console.log('Email envoyé avec succès!', response.status, response.text);
        
        // Afficher un message de succès
        formMessage.innerHTML = '<div class=\"alert alert-success\"><i class=\"bi bi-check-circle\"></i> <strong>Message envoyé avec succès!</strong> Je vous répondrai dans les plus brefs délais.</div>';
        
        // Réinitialiser le formulaire
        document.getElementById('contactForm').reset();
        
        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        
        // Faire défiler vers le message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    })
    .catch(function(error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        
        // Afficher un message d'erreur
        formMessage.innerHTML = '<div class=\"alert alert-danger\"><i class=\"bi bi-x-circle\"></i> <strong>Erreur!</strong> Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer ou me contacter directement sur Instagram.</div>';
        
        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    });
});

// ============================================
// RESTE DU CODE
// ============================================

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
