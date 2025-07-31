/*
** EPITECH PROJECT, 2025
** kinder [WSL: Ubuntu-22.04]
** File description:
** script
*/

// Variables globales
let currentSpellIndex = 1;
const totalSpells = 4;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Créer des particules de feu
    createFireParticles();
    
    // Animation de parallaxe au scroll
    initParallaxEffect();
    
    // Navigation smooth scroll
    initSmoothScrolling();
    
    // Effets hover sur les cartes d'armes
    initWeaponCards();
    
    // Animation des quêtes
    initQuestScrolls();
    
    // Initialiser le grimoire
    showSpell(currentSpellIndex);
    
    // Effet de typing pour les textes
    initTypingEffect();
    
    // Sons visuels ambiants
    initAmbientEffects();
    
    // Observer pour les animations au scroll
    initScrollAnimations();
    
    // Effet de lueur sur les éléments magiques
    initMagicGlow();
});

// Créer des particules de feu flottantes
function createFireParticles() {
    const container = document.getElementById('fireParticles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'fire-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        container.appendChild(particle);
    }
}

// Effet de parallaxe
function initParallaxEffect() {
    const elementsToParallax = [
        { selector: '.dragon-1', speed: 0.5 },
        { selector: '.dragon-2', speed: 0.3 },
        { selector: '.magic-orbs', speed: 0.7 },
        { selector: '.fog-img-first', speed: 0.2 },
        { selector: '.fog-img-second', speed: 0.4 }
    ];
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        elementsToParallax.forEach(item => {
            const element = document.querySelector(item.selector);
            if (element) {
                const yPos = -(scrolled * item.speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
        
        // Effet sur le hero
        const hero = document.querySelector('.castle-hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });
}

// Navigation smooth scroll améliorée
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Effet de portail magique
                showMagicPortal(() => {
                    const headerHeight = 100;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                });
            }
        });
    });
}

// Effet de portail magique
function showMagicPortal(callback) {
    const portal = document.getElementById('magicPortal');
    portal.classList.add('active');
    
    setTimeout(() => {
        if (callback) callback();
        portal.classList.remove('active');
    }, 1000);
}

// Ouvrir la porte du château
function openGate() {
    const portcullis = document.querySelector('.portcullis');
    portcullis.style.top = '-100%';
    
    // Scroll vers la section suivante après l'animation
    setTimeout(() => {
        document.getElementById('chronicles').scrollIntoView({ behavior: 'smooth' });
    }, 1500);
    
    // Effet sonore visuel
    createSparkles(event.clientX, event.clientY);
}

// Envoyer un corbeau
function summonRaven() {
    const raven = document.getElementById('flyingRaven');
    const button = event.target;
    const rect = button.getBoundingClientRect();
    
    raven.style.left = rect.left + 'px';
    raven.style.top = rect.top + 'px';
    raven.classList.add('active');
    
    setTimeout(() => {
        raven.classList.remove('active');
        // Scroll vers la section contact
        document.getElementById('ravens').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// Créer des étincelles magiques
function createSparkles(x, y) {
    const sparkleCount = 15;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.backgroundColor = '#d4af37';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        
        const angle = (Math.PI * 2 * i) / sparkleCount;
        const velocity = Math.random() * 50 + 50;
        const lifetime = Math.random() * 1000 + 500;
        
        document.body.appendChild(sparkle);
        
        let opacity = 1;
        let currentX = 0;
        let currentY = 0;
        
        const animate = () => {
            currentX += Math.cos(angle) * velocity * 0.02;
            currentY += Math.sin(angle) * velocity * 0.02;
            opacity -= 0.02;
            
            sparkle.style.transform = `translate(${currentX}px, ${currentY}px)`;
            sparkle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                sparkle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Initialiser les cartes d'armes
function initWeaponCards() {
    const cards = document.querySelectorAll('.weapon-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const element = this.dataset.element;
            createElementalEffect(this, element);
        });
        
        card.addEventListener('click', function() {
            this.classList.toggle('active');
            createSparkles(event.clientX, event.clientY);
        });
    });
}

// Créer des effets élémentaires
function createElementalEffect(card, element) {
    const effects = {
        fire: { color: '#ff6b35', symbol: '🔥' },
        ice: { color: '#87ceeb', symbol: '❄️' },
        lightning: { color: '#ffff00', symbol: '⚡' },
        earth: { color: '#8b4513', symbol: '🌍' }
    };
    
    const effect = effects[element];
    if (!effect) return;
    
    const particle = document.createElement('div');
    particle.textContent = effect.symbol;
    particle.style.position = 'absolute';
    particle.style.fontSize = '2rem';
    particle.style.color = effect.color;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '50%';
    particle.style.transform = 'translate(-50%, -50%)';
    particle.style.pointerEvents = 'none';
    particle.style.animation = 'float-up 2s ease-out forwards';
    
    card.appendChild(particle);
    
    setTimeout(() => particle.remove(), 2000);
}

// Animation des parchemins de quêtes
function initQuestScrolls() {
    const scrolls = document.querySelectorAll('.quest-scroll');
    
    scrolls.forEach(scroll => {
        scroll.addEventListener('mouseenter', function() {
            const rarity = this.dataset.rarity;
            addRarityEffect(this, rarity);
        });
    });
}

// Ajouter des effets de rareté
function addRarityEffect(element, rarity) {
    const effects = {
        legendary: { color: '#d4af37', particles: 20 },
        epic: { color: '#9b59b6', particles: 15 },
        rare: { color: '#3498db', particles: 10 }
    };
    
    const effect = effects[rarity];
    if (!effect) return;
    
    for (let i = 0; i < effect.particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = effect.color;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `twinkle ${Math.random() * 2 + 1}s ease-in-out infinite`;
        
        element.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
    }
}

// Navigation dans le grimoire
function showSpell(n) {
    const spells = document.querySelectorAll('.spell-page');
    const dots = document.querySelectorAll('.page-dot');
    
    if (n > totalSpells) currentSpellIndex = 1;
    if (n < 1) currentSpellIndex = totalSpells;
    
    spells.forEach(spell => spell.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    document.getElementById(`spell${currentSpellIndex}`).classList.add('active');
    dots[currentSpellIndex - 1].classList.add('active');
    
    // Effet magique lors du changement de page
    createMagicBurst();
}

function nextSpell() {
    currentSpellIndex++;
    showSpell(currentSpellIndex);
}

function previousSpell() {
    currentSpellIndex--;
    showSpell(currentSpellIndex);
}

function currentSpell(n) {
    currentSpellIndex = n;
    showSpell(currentSpellIndex);
}

// Créer un éclat magique
function createMagicBurst() {
    const book = document.querySelector('.spell-book');
    const burst = document.createElement('div');
    burst.style.position = 'absolute';
    burst.style.top = '50%';
    burst.style.left = '50%';
    burst.style.transform = 'translate(-50%, -50%)';
    burst.style.width = '100px';
    burst.style.height = '100px';
    burst.style.borderRadius = '50%';
    burst.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent)';
    burst.style.animation = 'burst 0.5s ease-out forwards';
    
    book.appendChild(burst);
    setTimeout(() => burst.remove(), 500);
}

// Effet de typing
function initTypingEffect() {
    const elements = document.querySelectorAll('.chronicle-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                typeText(entry.target);
                entry.target.classList.add('typed');
            }
        });
    });
    
    elements.forEach(el => observer.observe(el));
}

function typeText(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.visibility = 'visible';
    
    let index = 0;
    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 30);
        }
    };
    
    type();
}

// Effets ambiants
function initAmbientEffects() {
    // Mouvement aléatoire des lucioles
    setInterval(() => {
        const fireflies = document.querySelectorAll('.firefly');
        fireflies.forEach(firefly => {
            if (Math.random() > 0.8) {
                firefly.style.left = Math.random() * 100 + '%';
                firefly.style.top = Math.random() * 100 + '%';
            }
        });
    }, 5000);
    
    // Effet de respiration sur les orbes magiques
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        orb.addEventListener('mouseover', function() {
            this.style.animation = 'orb-pulse 1s ease-in-out infinite';
        });
        
        orb.addEventListener('mouseout', function() {
            this.style.animation = `orb-float 10s ease-in-out infinite`;
            this.style.animationDelay = `${index * 2.5}s`;
        });
    });
}

// Animations au scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.castle-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
                
                // Animer les enfants avec un délai
                const children = entry.target.querySelectorAll('.weapon-card, .quest-scroll, .language-shield');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animation = 'fadeInUp 0.5s ease-out forwards';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Effet de lueur magique sur hover
function initMagicGlow() {
    document.addEventListener('mousemove', (e) => {
        const glowElements = document.querySelectorAll('.medieval-btn, .weapon-card, .quest-scroll');
        
        glowElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                element.style.setProperty('--mouse-x', `${x}px`);
                element.style.setProperty('--mouse-y', `${y}px`);
            }
        });
    });
}

// Ajouter des animations CSS dynamiques
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px);
        }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
    
    @keyframes burst {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
    
    @keyframes orb-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
    
    .medieval-btn::after,
    .weapon-card::after,
    .quest-scroll::after {
        content: '';
        position: absolute;
        top: var(--mouse-y);
        left: var(--mouse-x);
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.3), transparent);
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .medieval-btn:hover::after,
    .weapon-card:hover::after,
    .quest-scroll:hover::after {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Auto-changement des sorts toutes les 20 secondes
setInterval(() => {
    if (currentSpellIndex < totalSpells) {
        nextSpell();
    } else {
        currentSpellIndex = 0;
        nextSpell();
    }
}, 20000);

// Effet sonore au clic (visuel)
document.addEventListener('click', function(e) {
    if (e.target.closest('.medieval-btn, .weapon-card, .quest-scroll, .rune-btn')) {
        createSparkles(e.clientX, e.clientY);
    }
});

// Easter egg : Konami code pour effet spécial
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateDragonMode();
    }
});

function activateDragonMode() {
    document.body.style.animation = 'dragon-mode 3s ease-in-out';
    
    // Créer plusieurs dragons
    for (let i = 0; i < 5; i++) {
        const dragon = document.createElement('div');
        dragon.className = 'dragon dragon-special';
        dragon.style.fontSize = '100px';
        dragon.textContent = '🐲';
        dragon.style.position = 'fixed';
        dragon.style.top = Math.random() * 100 + '%';
        dragon.style.left = '-100px';
        dragon.style.zIndex = '9999';
        dragon.style.animation = `dragon-fly-special ${Math.random() * 3 + 2}s linear`;
        
        document.body.appendChild(dragon);
        
        setTimeout(() => dragon.remove(), 5000);
    }
    
    // Message secret
    const message = document.createElement('div');
    message.textContent = 'Dragon Mode Activé! 🐲';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '3rem';
    message.style.color = '#d4af37';
    message.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.8)';
    message.style.zIndex = '10000';
    message.style.animation = 'fadeInUp 1s ease-out';
    
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

// Ajouter l'animation dragon spéciale
const dragonStyle = document.createElement('style');
dragonStyle.textContent = `
    @keyframes dragon-fly-special {
        0% { transform: translateX(-100px); }
        100% { transform: translateX(calc(100vw + 100px)); }
    }
    
    @keyframes dragon-mode {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(180deg); }
    }
`;
document.head.appendChild(dragonStyle);

// Système de météo dynamique
function initWeatherSystem() {
    const weatherTypes = ['clear', 'rain', 'snow', 'storm'];
    let currentWeather = 'clear';
    
    function changeWeather() {
        currentWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        
        switch(currentWeather) {
            case 'rain':
                createRain();
                break;
            case 'snow':
                createSnow();
                break;
            case 'storm':
                createStorm();
                break;
            default:
                clearWeather();
        }
    }
    
    // Changer la météo toutes les 30 secondes
    setInterval(changeWeather, 30000);
}

function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    rainContainer.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.style.left = Math.random() * 100 + '%';
        raindrop.style.animationDelay = Math.random() * 2 + 's';
        raindrop.style.animationDuration = Math.random() * 1 + 0.5 + 's';
        rainContainer.appendChild(raindrop);
    }
}

function createSnow() {
    const snowContainer = document.getElementById('snowContainer');
    snowContainer.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄️';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDelay = Math.random() * 10 + 's';
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snowContainer.appendChild(snowflake);
    }
}

function createStorm() {
    createRain();
    
    const lightningContainer = document.getElementById('lightningContainer');
    
    setInterval(() => {
        if (Math.random() > 0.8) {
            const flash = document.createElement('div');
            flash.className = 'lightning-flash';
            lightningContainer.appendChild(flash);
            
            setTimeout(() => flash.remove(), 200);
            
            // Son du tonnerre (visuel)
            document.body.style.filter = 'brightness(1.5)';
            setTimeout(() => {
                document.body.style.filter = 'brightness(1)';
            }, 100);
        }
    }, 3000);
}

function clearWeather() {
    document.getElementById('rainContainer').innerHTML = '';
    document.getElementById('snowContainer').innerHTML = '';
    document.getElementById('lightningContainer').innerHTML = '';
}

// Curseur personnalisé
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Créer une traînée
        if (Math.random() > 0.9) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = mouseX + 'px';
            trail.style.top = mouseY + 'px';
            document.body.appendChild(trail);
            
            setTimeout(() => trail.remove(), 500);
        }
    });
    
    // Changer le curseur au survol d'éléments interactifs
    document.querySelectorAll('button, a, .weapon-card, .quest-scroll').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.querySelector('.cursor-sword').textContent = '🗡️';
            cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.querySelector('.cursor-sword').textContent = '⚔️';
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Système de succès
const achievements = {
    firstVisit: { name: "Première Visite", description: "Bienvenue dans la forteresse!", icon: "🏰" },
    scrollMaster: { name: "Maître du Parchemin", description: "A exploré toutes les sections", icon: "📜" },
    spellCaster: { name: "Lanceur de Sorts", description: "A utilisé tous les sorts", icon: "🧙‍♂️" },
    dragonSlayer: { name: "Tueur de Dragon", description: "A vaincu le boss secret", icon: "🐲" },
    treasureHunter: { name: "Chasseur de Trésor", description: "A trouvé le trésor caché", icon: "💰" }
};

const unlockedAchievements = new Set();

function unlockAchievement(achievementId) {
    if (unlockedAchievements.has(achievementId)) return;
    
    unlockedAchievements.add(achievementId);
    const achievement = achievements[achievementId];
    
    const popup = document.getElementById('achievementPopup');
    document.getElementById('achievementMessage').textContent = `${achievement.name} - ${achievement.description}`;
    popup.querySelector('.achievement-icon').textContent = achievement.icon;
    
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 5000);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('achievements', JSON.stringify([...unlockedAchievements]));
}

// Menu de sorts rapides
function initSpellWheel() {
    const spellWheel = document.getElementById('spellWheel');
    let activeSpell = null;
    
    // Afficher avec clic droit
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        spellWheel.style.left = e.clientX + 'px';
        spellWheel.style.top = e.clientY + 'px';
        spellWheel.classList.add('active');
    });
    
    // Cacher au clic
    document.addEventListener('click', () => {
        spellWheel.classList.remove('active');
    });
    
    // Gérer les sorts
    document.querySelectorAll('.spell-item').forEach(spell => {
        spell.addEventListener('click', (e) => {
            e.stopPropagation();
            activeSpell = spell.dataset.spell;
            
            // Retirer l'active des autres
            document.querySelectorAll('.spell-item').forEach(s => s.classList.remove('active'));
            spell.classList.add('active');
            
            // Lancer l'effet du sort
            castSpell(activeSpell, e.clientX, e.clientY);
        });
    });
}

function castSpell(spellType, x, y) {
    const effects = {
        fire: { emoji: '🔥', color: '#ff6b35' },
        ice: { emoji: '❄️', color: '#87ceeb' },
        lightning: { emoji: '⚡', color: '#ffff00' },
        earth: { emoji: '🌍', color: '#8b4513' }
    };
    
    const effect = effects[spellType];
    const spellEffect = document.createElement('div');
    spellEffect.textContent = effect.emoji;
    spellEffect.style.position = 'fixed';
    spellEffect.style.left = x + 'px';
    spellEffect.style.top = y + 'px';
    spellEffect.style.fontSize = '3rem';
    spellEffect.style.color = effect.color;
    spellEffect.style.pointerEvents = 'none';
    spellEffect.style.zIndex = '9999';
    spellEffect.style.animation = 'spell-cast 1s ease-out forwards';
    
    document.body.appendChild(spellEffect);
    
    // Réduire la mana
    const manaBar = document.getElementById('manaBar');
    const currentMana = parseFloat(manaBar.style.width) || 100;
    manaBar.style.width = Math.max(0, currentMana - 20) + '%';
    
    // Régénérer la mana
    setTimeout(() => {
        manaBar.style.width = Math.min(100, parseFloat(manaBar.style.width) + 20) + '%';
    }, 3000);
    
    setTimeout(() => spellEffect.remove(), 1000);
    
    // Vérifier si tous les sorts ont été utilisés
    if (document.querySelectorAll('.spell-item.active').length === 4) {
        unlockAchievement('spellCaster');
    }
}

// Compteur de visiteurs animé
function initVisitorCounter() {
    const count = localStorage.getItem('visitorCount') || 1337;
    const counter = document.getElementById('visitorCount');
    
    let current = 0;
    const increment = count / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= count) {
            current = count;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 20);
    
    localStorage.setItem('visitorCount', parseInt(count) + 1);
}

// Système de barres de vie/mana
function initStatusBars() {
    const healthBar = document.getElementById('healthBar');
    const manaBar = document.getElementById('manaBar');
    
    // Simulation de dégâts et régénération
    setInterval(() => {
        if (Math.random() > 0.8) {
            // Dégât
            const currentHealth = parseFloat(healthBar.style.width) || 100;
            healthBar.style.width = Math.max(0, currentHealth - 10) + '%';
            
            // Effet visuel de dégât
            document.body.style.animation = 'damage-flash 0.2s';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 200);
        }
    }, 5000);
    
    // Régénération
    setInterval(() => {
        const currentHealth = parseFloat(healthBar.style.width) || 100;
        const currentMana = parseFloat(manaBar.style.width) || 100;
        
        healthBar.style.width = Math.min(100, currentHealth + 5) + '%';
        manaBar.style.width = Math.min(100, currentMana + 10) + '%';
    }, 2000);
}

// Boss Battle System
function initBossBattle() {
    // Déclencher le boss après avoir scrollé jusqu'en bas
    let bossTriggered = false;
    
    window.addEventListener('scroll', () => {
        if (!bossTriggered && window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
            bossTriggered = true;
            startBossBattle();
        }
    });
}

function startBossBattle() {
    const bossBattle = document.getElementById('bossBattle');
    const bossHealth = document.getElementById('bossHealth');
    let bossHP = 100;
    
    bossBattle.classList.add('active');
    
    // Musique de boss (effet visuel)
    document.body.style.filter = 'hue-rotate(20deg)';
    
    // Attaques du boss
    const bossAttackInterval = setInterval(() => {
        if (bossHP <= 0) {
            clearInterval(bossAttackInterval);
            return;
        }
        
        // Animation d'attaque
        const bossSprite = bossBattle.querySelector('.boss-sprite');
        bossSprite.style.animation = 'boss-attack 0.5s ease-out';
        
        setTimeout(() => {
            bossSprite.style.animation = 'boss-idle 2s ease-in-out infinite';
        }, 500);
        
        // Dégâts au joueur
        const healthBar = document.getElementById('healthBar');
        const currentHealth = parseFloat(healthBar.style.width) || 100;
        healthBar.style.width = Math.max(0, currentHealth - 15) + '%';
    }, 3000);
    
    // Permettre au joueur d'attaquer en cliquant
    bossBattle.addEventListener('click', () => {
        if (bossHP <= 0) return;
        
        bossHP -= 10;
        bossHealth.style.width = bossHP + '%';
        
        // Effet de dégât
        createSparkles(event.clientX, event.clientY);
        
        if (bossHP <= 0) {
            // Victoire!
            bossBattle.classList.remove('active');
            document.body.style.filter = '';
            unlockAchievement('dragonSlayer');
            
            // Récompense
            showDialogue("Félicitations! Tu as vaincu le Dragon du Code Ancien! Un trésor t'attend...", [
                { text: "Réclamer le trésor", action: () => showTreasureMap() }
            ]);
        }
    });
}

// Système de dialogue
function showDialogue(text, options = []) {
    const dialogueBox = document.getElementById('dialogueBox');
    const dialogueText = document.getElementById('dialogueText');
    const dialogueOptions = document.getElementById('dialogueOptions');
    
    dialogueBox.classList.add('active');
    
    // Effet de typing
    let index = 0;
    dialogueText.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            dialogueText.textContent += text[index];
            index++;
        } else {
            clearInterval(typeInterval);
            
            // Afficher les options
            dialogueOptions.innerHTML = '';
            options.forEach(option => {
                const btn = document.createElement('div');
                btn.className = 'dialogue-option';
                btn.textContent = option.text;
                btn.onclick = () => {
                    dialogueBox.classList.remove('active');
                    if (option.action) option.action();
                };
                dialogueOptions.appendChild(btn);
            });
        }
    }, 30);
}

// Carte au trésor
function showTreasureMap() {
    const treasureMap = document.getElementById('treasureMap');
    treasureMap.classList.add('active');
    
    // Marquer le trésor comme trouvé après un clic
    treasureMap.addEventListener('click', () => {
        unlockAchievement('treasureHunter');
        treasureMap.classList.remove('active');
        
        // Récompense finale
        showDialogue("Tu as trouvé le trésor légendaire! Ton portfolio a été amélioré avec des pouvoirs magiques!", [
            { text: "Merci!", action: () => activateSecretPowers() }
        ]);
    });
}

// Pouvoirs secrets
function activateSecretPowers() {
    // Ajouter des effets permanents cool
    document.body.classList.add('legendary-mode');
    
    // Particules dorées permanentes
    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.fontSize = '20px';
        particle.textContent = '✨';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = 'float-up-sparkle 3s ease-out forwards';
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    }, 500);
}

// Cycle jour/nuit
function initDayNightCycle() {
    const cycle = document.getElementById('dayNightCycle');
    let isDay = true;
    
    function toggleDayNight() {
        isDay = !isDay;
        cycle.className = isDay ? 'day-night-cycle day' : 'day-night-cycle night';
        
        // Ajuster les couleurs
        if (!isDay) {
            document.body.style.filter = 'brightness(0.7) contrast(1.1)';
        } else {
            document.body.style.filter = '';
        }
    }
    
    // Changer toutes les 60 secondes
    setInterval(toggleDayNight, 60000);
    
    // Commencer en journée
    toggleDayNight();
}

// Ajout des styles d'animation manquants
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes spell-cast {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(3) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes damage-flash {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.5) hue-rotate(-10deg); }
    }
    
    @keyframes boss-attack {
        0% { transform: scale(1); }
        50% { transform: scale(1.3) translateX(-20px); }
        100% { transform: scale(1); }
    }
    
    @keyframes float-up-sparkle {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .legendary-mode {
        animation: legendary-glow 3s ease-in-out infinite;
    }
    
    @keyframes legendary-glow {
        0%, 100% { filter: brightness(1) hue-rotate(0deg); }
        50% { filter: brightness(1.1) hue-rotate(10deg); }
    }
`;
document.head.appendChild(additionalStyles);

// Charger les succès sauvegardés
function loadAchievements() {
    const saved = localStorage.getItem('achievements');
    if (saved) {
        JSON.parse(saved).forEach(id => unlockedAchievements.add(id));
    }
}

// Démarrer tous les systèmes
document.addEventListener('DOMContentLoaded', function() {
    // ... (code existant) ...
    
    // Nouveaux systèmes
    initWeatherSystem();
    initCustomCursor();
    initSpellWheel();
    initVisitorCounter();
    initStatusBars();
    initBossBattle();
    initDayNightCycle();
    loadAchievements();
    
    // Premier succès
    setTimeout(() => {
        unlockAchievement('firstVisit');
    }, 2000);
    
    // Vérifier l'exploration complète
    let sectionsVisited = new Set();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sectionsVisited.add(entry.target.id);
                if (sectionsVisited.size >= 6) {
                    unlockAchievement('scrollMaster');
                }
            }
        });
    });
    
    document.querySelectorAll('.castle-section').forEach(section => {
        observer.observe(section);
    });
});
