# Portfolio Sven Reichert

## Structure des fichiers

Le projet est maintenant organisé en plusieurs fichiers pour une meilleure maintenance :

```
portfolio/
├── index.html      # Fichier HTML principal
├── styles.css      # Toutes les feuilles de style
├── script.js       # Tout le JavaScript
└── README.md       # Ce fichier de documentation
```

## Installation

1. Créez un nouveau dossier pour votre portfolio
2. Placez les 3 fichiers dans ce dossier :
   - `index.html`
   - `styles.css`
   - `script.js`
3. Ouvrez `index.html` dans votre navigateur

## Personnalisation

### Changer le titre de la page
Dans `index.html`, modifiez la ligne 6 :
```html
<title>Sven Reichert - Portfolio</title>
```

### Modifier les couleurs principales
Dans `styles.css`, recherchez les couleurs principales :
- `#e91e63` (rose) - Couleur primaire
- `#3f51b5` (bleu) - Couleur secondaire
- `#f8bbd9` (rose clair) - Accents
- `#add8e6` (bleu clair) - Accents
- `#ffd700` (doré) - Accents

### Ajouter/Modifier des sections
Dans `index.html`, chaque section suit ce modèle :
```html
<section id="nom-section" class="section">
    <h2 class="section-title">Titre de la section</h2>
    <!-- Contenu de la section -->
</section>
```

### Modifier les projets
Les projets sont dans la section avec `id="projects"`. Chaque projet suit ce modèle :
```html
<div class="project-card">
    <div class="project-header">
        <h3>🏆 Nom du projet</h3>
        <p>Type de projet</p>
    </div>
    <div class="project-content">
        <h4 class="project-title">Titre détaillé</h4>
        <p class="project-description">Description</p>
        <div class="project-tech">
            <span class="tech-tag">Tech 1</span>
            <span class="tech-tag">Tech 2</span>
        </div>
    </div>
</div>
```

### Modifier les slides de présentation
Les slides sont dans la section `id="presentation"`. Chaque slide a un id unique (`slide1`, `slide2`, etc.)

### Ajouter des animations
Les animations principales sont définies dans `styles.css` :
- `fadeInUp` - Apparition avec translation vers le haut
- `slideIn` - Glissement latéral
- `float` - Flottement des éléments décoratifs
- `gradient-flow` - Animation de gradient

## Fonctionnalités JavaScript

Le fichier `script.js` gère :
- Navigation smooth scroll
- Présentation interactive avec slides
- Mise en surbrillance du menu actif
- Animations au scroll
- Effet parallaxe sur le hero
- Auto-avancement des slides (30 secondes)

## Responsive Design

Le site est responsive avec des breakpoints à :
- Desktop : > 768px
- Mobile : ≤ 768px

## Optimisations futures

Vous pouvez ajouter :
- Menu hamburger fonctionnel pour mobile
- Lazy loading des images
- Mode sombre
- Animations supplémentaires
- Formulaire de contact fonctionnel
- Intégration avec un CMS

## Hébergement

Pour héberger le portfolio :
1. **GitHub Pages** : Créez un repository et activez GitHub Pages
2. **Netlify** : Glissez-déposez le dossier sur netlify.com
3. **Vercel** : Déployez via vercel.com
4. **Hébergement classique** : Uploadez les fichiers via FTP

## Support

Pour toute question ou modification, les fichiers sont maintenant bien organisés et faciles à modifier !