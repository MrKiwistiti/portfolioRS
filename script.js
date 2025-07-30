/*
** EPITECH PROJECT, 2025
** kinder [WSL: Ubuntu-22.04]
** File description:
** script
*/

// Variables globales pour la présentation
let currentSlideIndex = 1;
const totalSlides = 5;

// Fonction pour afficher une slide spécifique
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator-dot');
    
    // Ajuster l'index si nécessaire
    if (n > totalSlides) currentSlideIndex = 1;
    if (n < 1) currentSlideIndex = totalSlides;
    
    // Masquer toutes les slides et désactiver tous les indicateurs
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Afficher la slide active et activer l'indicateur correspondant
    document.getElementById(`slide${currentSlideIndex}`).classList.add('active');
    indicators[currentSlideIndex - 1].classList.add('active');
    
    // Mettre à jour l'état des boutons de navigation
    document.getElementById('prevBtn').disabled = currentSlideIndex === 1;
    document.getElementById('nextBtn').disabled = currentSlideIndex === totalSlides;
}

// Navigation vers la slide suivante
function nextSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

// Navigation vers la slide précédente
function previousSlide() {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
}

// Aller directement à une slide spécifique
function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
}

// Configuration du smooth scrolling et de la navigation active
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling pour les liens de navigation
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = 100; // Hauteur du header fixe
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mettre en surbrillance le lien actif dans la navigation lors du scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
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

    // Initialiser la présentation
    showSlide(currentSlideIndex);

    // Animation des éléments flottants au survol
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'float 2s ease-in-out infinite';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = 'float 8s ease-in-out infinite';
        });
    });

    // Animation d'apparition progressive des cartes
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les cartes de compétences et projets
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => observer.observe(card));

    // Effet de parallaxe léger sur le hero
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Menu mobile (préparation pour future implémentation)
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-button';
        menuButton.innerHTML = '☰';
        menuButton.style.display = 'none';
        
        // Ajouter le bouton au nav seulement sur mobile
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
            nav.appendChild(menuButton);
        }
    };

    // Gestion du redimensionnement de la fenêtre
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                document.querySelector('.mobile-menu-button')?.remove();
            } else {
                createMobileMenu();
            }
        }, 250);
    });

    // Vérifier la taille initiale de la fenêtre
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
});

// Auto-avancement des slides (optionnel - toutes les 30 secondes)
setInterval(() => {
    if (currentSlideIndex < totalSlides) {
        nextSlide();
    } else {
        currentSlideIndex = 0;
        nextSlide();
    }
}, 30000);

// Fonction pour copier l'email au clic
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        // Créer une notification temporaire
        const notification = document.createElement('div');
        notification.textContent = 'Email copié !';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer la notification après 3 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    });
}

// Ajouter des animations CSS dynamiques si nécessaire
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideOut {
        to {
            transform: translateX(100px);
            opacity: 0;
        }
    }
    
    .mobile-menu-button {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #e91e63;
        cursor: pointer;
        z-index: 1001;
    }
`;
document.head.appendChild(style);

// Fonction pour gérer le lazy loading des images (si nécessaire dans le futur)
function lazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));
}

// Exporter les fonctions globales pour être utilisées dans le HTML
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.currentSlide = currentSlide;
window.copyEmail = copyEmail;
