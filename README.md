# Portfolio Sven Reichert - Édition Château Médiéval Dark Fantasy

## 🏰 Vue d'ensemble

Un portfolio unique transformé en forteresse médiévale dark fantasy avec des animations immersives inspirées des sites modernes comme Ciao Kombucha. Ce projet combine l'esthétique gothique avec des technologies web modernes pour créer une expérience utilisateur inoubliable.

## ⚔️ Structure des fichiers

```
portfolio/
├── index.html      # Structure HTML avec thème médiéval
├── styles.css      # Styles dark fantasy avec animations
├── script.js       # Interactions magiques et effets
└── README.md       # Guide du royaume numérique
```

## 🐲 Fonctionnalités Épiques

### Animations Immersives
- **Brume animée** qui flotte à travers l'écran
- **Particules de feu** qui s'élèvent continuellement
- **Dragons volants** en arrière-plan
- **Torches animées** avec effet de flamme réaliste
- **Orbes magiques** flottants avec effet de parallaxe
- **Lucioles** dansantes pour l'ambiance

### Effets Interactifs
- **Portail magique** lors de la navigation
- **Porte de château** qui s'ouvre au clic
- **Corbeau messager** qui vole vers la section contact
- **Étincelles magiques** à chaque interaction
- **Grimoire interactif** avec pages tournantes
- **Cartes d'armes** avec effets élémentaires (feu, glace, foudre, terre)

### Easter Eggs
- **Code Konami** (↑↑↓↓←→←→BA) active le Mode Dragon ! 🐲

## ⚡ Technologies Utilisées

- **HTML5** - Structure sémantique médiévale
- **CSS3** - Animations complexes et effets visuels
- **JavaScript Vanilla** - Interactions magiques sans dépendances
- **Google Fonts** - Polices Cinzel et Crimson Text pour l'ambiance médiévale

## 🎨 Personnalisation du Thème

### Palette de Couleurs Médiévales
Dans `styles.css`, modifiez ces variables principales :
- `#d4af37` - Or royal (couleur principale)
- `#ff6b35` - Orange feu (couleur secondaire)
- `#e8d5b7` - Parchemin (texte clair)
- `#1a0f0a` - Brun foncé (arrière-plans)
- `#0a0a0a` - Noir charbon (fond principal)

### Modifier les Éléments Fantastiques
- **Dragons** : Cherchez `.dragon` dans le CSS
- **Torches** : Modifiez `.flame` pour changer la couleur du feu
- **Orbes magiques** : Ajustez `.orb` pour différents effets
- **Particules** : Personnalisez `.fire-particle` et `.firefly`

### Ajuster les Animations
- Vitesse de la brume : `animation: fog-move 60s`
- Vitesse des dragons : `animation: dragon-fly-1 30s`
- Intensité des flammes : `animation: flicker 1.5s`

## 🏗️ Structure des Sections

1. **Forteresse (Hero)** - Section d'accueil avec porte animée
2. **Chroniques (À propos)** - Présentation sur parchemin
3. **Arsenal (Compétences)** - Cartes d'armes magiques
4. **Quêtes (Projets)** - Parchemins de quêtes avec rareté
5. **Grimoire (Présentation)** - Livre de sorts interactif
6. **Tour des Corbeaux (Contact)** - Messages par corbeau voyageur

## 🚀 Optimisations et Performance

### Optimisations Appliquées
- Animations CSS hardware-accelerated avec `transform` et `opacity`
- Lazy loading des animations au scroll avec Intersection Observer
- Debouncing sur les événements de scroll et resize
- Particules limitées pour maintenir 60 FPS

### Conseils de Performance
- Réduisez le nombre de particules sur mobile
- Désactivez certaines animations sur les appareils moins puissants
- Utilisez `will-change` avec parcimonie sur les éléments animés

## 📱 Responsive Design

Le site s'adapte automatiquement avec :
- Menu burger préparé pour mobile (à implémenter)
- Grilles flexibles pour toutes les tailles d'écran
- Animations réduites sur mobile pour la performance
- Textes et espacements optimisés

## 🔧 Fonctionnalités Avancées à Ajouter

- [ ] Sons d'ambiance (feu crépitant, vent, corbeau)
- [ ] Mode jour/nuit avec transition
- [ ] Mini-jeu caché dans le grimoire
- [ ] Système de succès/achievements
- [ ] Curseur personnalisé (épée, baguette magique)
- [ ] Météo dynamique (pluie, neige, brouillard)

## 🛡️ Compatibilité

- Chrome/Edge : ✅ Optimal
- Firefox : ✅ Optimal
- Safari : ✅ Optimal
- Mobile : ✅ Adapté (iOS/Android)

## 🎯 SEO et Accessibilité

- Structure sémantique HTML5
- Attributs alt sur les éléments visuels
- Contraste suffisant pour la lisibilité
- Navigation au clavier fonctionnelle

## 📚 Ressources et Inspiration

- Animations inspirées par les sites modernes (Ciao Kombucha)
- Esthétique dark fantasy médiévale
- Effets de particules et parallaxe pour l'immersion
- Interface interactive façon jeu vidéo

---

**Que votre code soit éternel et vos bugs inexistants ! ⚔️🏰**