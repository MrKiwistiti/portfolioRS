/*
** EPITECH PROJECT, 2025
** Dark Castle Portfolio - JavaScript
** Sven Reichert - Interactive Dark Fantasy Experience
*/

// ===== GLOBAL VARIABLES =====
let isTransitioning = false;
let currentSection = 'entrance';
let ambientSounds = {};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    initializeNavigation();
    initializeScrollEffects();
    initializeInteractiveElements();
    initializeAmbientEffects();
});

// ===== PORTFOLIO INITIALIZATION =====
function initializePortfolio() {
    console.log('🏰 Initializing Dark Castle Portfolio...');
    
    // Set initial section
    updateCurrentSection();
    
    // Initialize smooth scrolling
    initializeSmoothScroll();
    
    // Initialize section observers
    initializeSectionObserver();
    
    // Initialize torch effects
    initializeTorchEffects();
    
    // Initialize particle systems
    initializeParticleEffects();
    
    console.log('✨ Portfolio initialized successfully');
}

// ===== NAVIGATION SYSTEM =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.shadow-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isTransitioning) return;
            
            const targetId = this.getAttribute('data-scroll');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                navigateToSection(targetId);
            }
        });
        
        // Add hover effects
        link.addEventListener('mouseenter', function() {
            createNavHoverEffect(this);
        });
    });
}

function navigateToSection(sectionId) {
    if (isTransitioning || currentSection === sectionId) return;
    
    isTransitioning = true;
    
    // Show transition overlay
    showTransitionOverlay();
    
    // Wait for transition, then scroll
    setTimeout(() => {
        const targetSection = document.getElementById(sectionId);
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        currentSection = sectionId;
        updateNavigationState();
        
        // Hide transition overlay
        setTimeout(() => {
            hideTransitionOverlay();
            isTransitioning = false;
        }, 800);
    }, 300);
}

function updateNavigationState() {
    const navLinks = document.querySelectorAll('.shadow-link');
    
    navLinks.forEach(link => {
        const targetId = link.getAttribute('data-scroll');
        if (targetId === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScroll() {
    // Enhance default smooth scrolling behavior
    const sections = document.querySelectorAll('.castle-section');
    
    sections.forEach(section => {
        section.addEventListener('wheel', function(e) {
            if (Math.abs(e.deltaY) > 50) {
                e.preventDefault();
                
                if (e.deltaY > 0) {
                    scrollToNextSection();
                } else {
                    scrollToPreviousSection();
                }
            }
        }, { passive: false });
    });
}

function scrollToNextSection() {
    const sections = ['entrance', 'depths', 'sanctum', 'archives', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex < sections.length - 1 && !isTransitioning) {
        navigateToSection(sections[currentIndex + 1]);
    }
}

function scrollToPreviousSection() {
    const sections = ['entrance', 'depths', 'sanctum', 'archives', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0 && !isTransitioning) {
        navigateToSection(sections[currentIndex - 1]);
    }
}

// ===== SECTION OBSERVER =====
function initializeSectionObserver() {
    const observerOptions = {
        threshold: 0.6,
        rootMargin: '-50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId !== currentSection) {
                    currentSection = sectionId;
                    updateNavigationState();
                    triggerSectionEffects(sectionId);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.castle-section').forEach(section => {
        observer.observe(section);
    });
}

function updateCurrentSection() {
    const sections = document.querySelectorAll('.castle-section');
    const viewportCenter = window.innerHeight / 2;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            currentSection = section.id;
        }
    });
    
    updateNavigationState();
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleScrollEffects() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Parallax effects for background elements
    updateParallaxEffects(scrollY);
    
    // Update torch lighting based on scroll
    updateTorchLighting(scrollY);
    
    // Update mystical particles
    updateParticleEffects(scrollY);
    
    // Update navigation opacity
    updateNavigationOpacity(scrollY);
}

function updateParallaxEffects(scrollY) {
    const sections = document.querySelectorAll('.castle-section');
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const speed = 0.5 + (index * 0.1);
        
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            const yPos = -(scrollY * speed);
            section.style.transform = `translateY(${yPos}px)`;
        }
    });
}

function updateTorchLighting(scrollY) {
    const torches = document.querySelectorAll('.torch-light');
    
    torches.forEach((torch, index) => {
        const intensity = 0.6 + Math.sin((scrollY + index * 100) * 0.01) * 0.2;
        torch.style.opacity = intensity;
        
        const scale = 1 + Math.sin((scrollY + index * 150) * 0.008) * 0.1;
        torch.style.transform += ` scale(${scale})`;
    });
}

function updateParticleEffects(scrollY) {
    const particles = document.querySelector('.mystical-particles');
    if (particles) {
        const rotation = scrollY * 0.1;
        particles.style.transform = `rotate(${rotation}deg)`;
    }
}

function updateNavigationOpacity(scrollY) {
    const nav = document.querySelector('.shadow-navigation');
    const opacity = Math.min(1, scrollY / 100);
    nav.style.background = `linear-gradient(180deg, rgba(10, 10, 10, ${0.95 * opacity}) 0%, rgba(10, 10, 10, ${0.7 * opacity}) 100%)`;
}

// ===== INTERACTIVE ELEMENTS =====
function initializeInteractiveElements() {
    // Knowledge crystals hover effects
    initializeCrystalEffects();
    
    // Altar stone interactions
    initializeAltarEffects();
    
    // Contact portal interactions
    initializePortalEffects();
    
    // Manuscript interactions
    initializeManuscriptEffects();
}

function initializeCrystalEffects() {
    const crystals = document.querySelectorAll('.knowledge-crystal');
    
    crystals.forEach(crystal => {
        crystal.addEventListener('mouseenter', function() {
            createCrystalGlow(this);
            playResonanceSound();
        });
        
        crystal.addEventListener('mouseleave', function() {
            removeCrystalGlow(this);
        });
        
        crystal.addEventListener('click', function() {
            crystalActivation(this);
        });
    });
}

function createCrystalGlow(crystal) {
    const core = crystal.querySelector('.crystal-core');
    if (core) {
        core.style.animation = 'crystal-pulse 1s ease-in-out infinite alternate';
        core.style.boxShadow = '0 0 50px rgba(204, 102, 0, 0.8)';
    }
}

function removeCrystalGlow(crystal) {
    const core = crystal.querySelector('.crystal-core');
    if (core) {
        core.style.animation = '';
        core.style.boxShadow = '0 0 30px rgba(204, 102, 0, 0.5)';
    }
}

function crystalActivation(crystal) {
    crystal.style.transform = 'translateY(-15px) scale(1.05) rotateY(10deg)';
    
    setTimeout(() => {
        crystal.style.transform = '';
    }, 1000);
    
    createMagicalBurst(crystal);
}

function initializeAltarEffects() {
    const altars = document.querySelectorAll('.altar-stone');
    
    altars.forEach(altar => {
        altar.addEventListener('mouseenter', function() {
            intensifyAltarFlame(this);
        });
        
        altar.addEventListener('mouseleave', function() {
            normalizeAltarFlame(this);
        });
        
        altar.addEventListener('click', function() {
            altarInvocation(this);
        });
    });
}

function intensifyAltarFlame(altar) {
    const flame = altar.querySelector('.altar-flame');
    if (flame) {
        flame.style.boxShadow = '0 0 40px rgba(255, 149, 0, 0.9)';
        flame.style.transform = 'scale(1.2)';
    }
}

function normalizeAltarFlame(altar) {
    const flame = altar.querySelector('.altar-flame');
    if (flame) {
        flame.style.boxShadow = '0 0 25px rgba(255, 149, 0, 0.6)';
        flame.style.transform = 'scale(1)';
    }
}

function altarInvocation(altar) {
    const creationName = altar.querySelector('.creation-name').textContent;
    
    // Create invocation effect
    createInvocationCircle(altar);
    
    // Show project details or redirect
    setTimeout(() => {
        if (creationName.includes('AmaCompare')) {
            window.open('https://github.com/MrKiwistiti/AmacompareV2', '_blank');
        }
    }, 1500);
}

function initializePortalEffects() {
    const portals = document.querySelectorAll('.contact-portal');
    
    portals.forEach(portal => {
        portal.addEventListener('mouseenter', function() {
            activatePortal(this);
        });
        
        portal.addEventListener('mouseleave', function() {
            deactivatePortal(this);
        });
    });
}

function activatePortal(portal) {
    const rune = portal.querySelector('.portal-rune');
    if (rune) {
        rune.style.animation = 'portal-spin 2s linear infinite';
        rune.style.boxShadow = '0 0 25px rgba(204, 102, 0, 0.6)';
    }
}

function deactivatePortal(portal) {
    const rune = portal.querySelector('.portal-rune');
    if (rune) {
        rune.style.animation = '';
        rune.style.boxShadow = '0 0 15px rgba(204, 102, 0, 0.4)';
    }
}

function initializeManuscriptEffects() {
    const manuscript = document.querySelector('.ancient-manuscript');
    
    if (manuscript) {
        manuscript.addEventListener('mouseenter', function() {
            illuminateManuscript(this);
        });
        
        manuscript.addEventListener('mouseleave', function() {
            dimManuscript(this);
        });
    }
}

function illuminateManuscript(manuscript) {
    manuscript.style.boxShadow = '0 0 30px rgba(204, 102, 0, 0.3)';
    
    const initial = manuscript.querySelector('.manuscript-initial');
    if (initial) {
        initial.style.textShadow = '0 0 20px rgba(255, 170, 0, 0.6)';
    }
}

function dimManuscript(manuscript) {
    manuscript.style.boxShadow = '';
    
    const initial = manuscript.querySelector('.manuscript-initial');
    if (initial) {
        initial.style.textShadow = '0 0 15px rgba(255, 170, 0, 0.4)';
    }
}

// ===== TORCH EFFECTS =====
function initializeTorchEffects() {
    const torches = document.querySelectorAll('.torch-light');
    
    torches.forEach((torch, index) => {
        // Randomize flicker timing
        const delay = Math.random() * 2;
        torch.style.animationDelay = `${delay}s`;
        
        // Add dynamic flicker intensity
        setInterval(() => {
            const intensity = 0.6 + Math.random() * 0.4;
            torch.style.opacity = intensity;
        }, 1000 + Math.random() * 2000);
    });
}

// ===== PARTICLE EFFECTS =====
function initializeParticleEffects() {
    createFloatingEmbers();
    createMysticalOrbs();
}

function createFloatingEmbers() {
    const sections = document.querySelectorAll('.castle-section');
    
    sections.forEach(section => {
        for (let i = 0; i < 5; i++) {
            const ember = document.createElement('div');
            ember.className = 'floating-ember';
            ember.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: #ff9500;
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(255, 149, 0, 0.8);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: ember-float ${10 + Math.random() * 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
                z-index: 5;
            `;
            section.appendChild(ember);
        }
    });
}

function createMysticalOrbs() {
    const container = document.createElement('div');
    container.className = 'mystical-orbs';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 3;
    `;
    
    for (let i = 0; i < 8; i++) {
        const orb = document.createElement('div');
        orb.className = 'mystical-orb';
        orb.style.cssText = `
            position: absolute;
            width: ${5 + Math.random() * 10}px;
            height: ${5 + Math.random() * 10}px;
            background: radial-gradient(circle, rgba(204, 102, 0, 0.6), transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: orb-drift ${20 + Math.random() * 20}s ease-in-out infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(orb);
    }
    
    document.body.appendChild(container);
}

// ===== AMBIENT EFFECTS =====
function initializeAmbientEffects() {
    // Create ambient shadows that respond to cursor
    createCursorShadows();
    
    // Initialize atmospheric sounds (if enabled)
    // initializeAmbientSounds();
    
    // Create periodic lightning flashes
    createAtmosphericLighting();
}

function createCursorShadows() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        updateCursorAmbient(mouseX, mouseY);
    });
}

function updateCursorAmbient(x, y) {
    const ambient = document.querySelector('.ambient-shadows');
    if (ambient) {
        const xPercent = (x / window.innerWidth) * 100;
        const yPercent = (y / window.innerHeight) * 100;
        
        ambient.style.background = `
            radial-gradient(
                circle at ${xPercent}% ${yPercent}%,
                rgba(204, 102, 0, 0.05) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at ${100 - xPercent}% ${100 - yPercent}%,
                rgba(204, 102, 0, 0.03) 0%,
                transparent 50%
            )
        `;
    }
}

function createAtmosphericLighting() {
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            createLightningFlash();
        }
    }, 5000);
}

function createLightningFlash() {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(204, 102, 0, 0.1);
        pointer-events: none;
        z-index: 1000;
        animation: lightning-flash 0.3s ease-out;
    `;
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        document.body.removeChild(flash);
    }, 300);
}

// ===== TRANSITION EFFECTS =====
function showTransitionOverlay() {
    const overlay = document.querySelector('.transition-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        overlay.classList.add('active');
    }
}

function hideTransitionOverlay() {
    const overlay = document.querySelector('.transition-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 600);
    }
}

// ===== SECTION-SPECIFIC EFFECTS =====
function triggerSectionEffects(sectionId) {
    switch (sectionId) {
        case 'entrance':
            triggerEntranceEffects();
            break;
        case 'depths':
            triggerDepthsEffects();
            break;
        case 'sanctum':
            triggerSanctumEffects();
            break;
        case 'archives':
            triggerArchivesEffects();
            break;
        case 'contact':
            triggerContactEffects();
            break;
    }
}

function triggerEntranceEffects() {
    const title = document.querySelector('.dark-title');
    if (title) {
        title.style.animation = 'title-glow 3s ease-in-out infinite alternate';
    }
}

function triggerDepthsEffects() {
    const crystals = document.querySelectorAll('.crystal-core');
    crystals.forEach((crystal, index) => {
        setTimeout(() => {
            crystal.style.animation = 'crystal-pulse 2s ease-in-out infinite alternate';
        }, index * 200);
    });
}

function triggerSanctumEffects() {
    const flames = document.querySelectorAll('.altar-flame');
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.style.animation = 'flame-dance 2s ease-in-out infinite alternate';
        }, index * 300);
    });
}

function triggerArchivesEffects() {
    const manuscript = document.querySelector('.manuscript-initial');
    if (manuscript) {
        manuscript.style.animation = 'initial-glow 4s ease-in-out infinite alternate';
    }
}

function triggerContactEffects() {
    const runes = document.querySelectorAll('.rune-circle');
    runes.forEach((rune, index) => {
        rune.style.animation = `rotate-runes ${20 - index * 2}s linear infinite`;
    });
}

// ===== UTILITY FUNCTIONS =====
function createMagicalBurst(element) {
    const burst = document.createElement('div');
    burst.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255, 149, 0, 0.8), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: magical-burst 1s ease-out forwards;
        pointer-events: none;
        z-index: 100;
    `;
    
    element.style.position = 'relative';
    element.appendChild(burst);
    
    setTimeout(() => {
        element.removeChild(burst);
    }, 1000);
}

function createInvocationCircle(element) {
    const circle = document.createElement('div');
    circle.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border: 2px solid rgba(204, 102, 0, 0.8);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: invocation-circle 2s ease-out forwards;
        pointer-events: none;
        z-index: 100;
    `;
    
    element.style.position = 'relative';
    element.appendChild(circle);
    
    setTimeout(() => {
        element.removeChild(circle);
    }, 2000);
}

function createNavHoverEffect(navLink) {
    const spark = document.createElement('div');
    spark.style.cssText = `
        position: absolute;
        top: 50%;
        left: 0;
        width: 4px;
        height: 4px;
        background: #ff9500;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(255, 149, 0, 0.8);
        animation: nav-spark 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 10;
    `;
    
    navLink.style.position = 'relative';
    navLink.appendChild(spark);
    
    setTimeout(() => {
        navLink.removeChild(spark);
    }, 600);
}

// ===== SOUND FUNCTIONS (Optional) =====
function playResonanceSound() {
    // Placeholder for sound effect
    // Can be implemented with Web Audio API or audio elements
}

// ===== PUBLIC FUNCTIONS =====
window.descendIntoDepths = function() {
    navigateToSection('depths');
};

window.openPortal = function(portalType) {
    console.log(`Opening ${portalType} portal...`);
    // Implementation for specific portal actions
};

// ===== CSS ANIMATIONS (Injected dynamically) =====
function injectCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ember-float {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-10vh) translateX(10px);
                opacity: 0;
            }
        }
        
        @keyframes orb-drift {
            0%, 100% {
                transform: translateY(0) translateX(0) scale(1);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-20px) translateX(15px) scale(1.2);
                opacity: 0.7;
            }
        }
        
        @keyframes crystal-pulse {
            0% {
                box-shadow: 0 0 30px rgba(204, 102, 0, 0.5);
            }
            100% {
                box-shadow: 0 0 50px rgba(204, 102, 0, 0.8);
            }
        }
        
        @keyframes magical-burst {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
        
        @keyframes invocation-circle {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
        
        @keyframes nav-spark {
            0% {
                left: 0;
                opacity: 1;
            }
            100% {
                left: 100%;
                opacity: 0;
            }
        }
        
        @keyframes portal-spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        @keyframes lightning-flash {
            0%, 100% {
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
        }
        
        @keyframes initial-glow {
            0% {
                text-shadow: 0 0 15px rgba(255, 170, 0, 0.4);
            }
            100% {
                text-shadow: 0 0 25px rgba(255, 170, 0, 0.8);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations
injectCustomAnimations();
