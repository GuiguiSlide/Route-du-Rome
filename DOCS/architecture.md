# Architecture — Route du Rome

## 1. Vue d'ensemble

**Route du Rome** est un jeu sérieux web refactorisé pour être maintenable, léger et testable. L'application est écrite en **TypeScript**, sans framework JavaScript, et construite avec **Vite**.

### Principes fondamentaux
- **Vanilla TypeScript** : pas de framework externe pour garder le projet simple et performant.
- **Modularité** : chaque responsabilité a une place claire dans le projet.
- **Couche métier isolée** : la logique du jeu est indépendante du DOM et des APIs du navigateur.
- **PWA-ready** : installation possible et navigation hors ligne grâce à un manifeste et un service worker.
- **Accessibilité** : structure sémantique, navigation clavier, contrôles vidéo, focus visible.
- **Performance** : ressources optimisées, chargement rapide, cache local.

---

## 2. Structure du projet

```
Route-du-Rome/
├── frontend/RouteDeRome/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── manifest.json
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   ├── src/
│   │   ├── main.ts
│   │   ├── style.css
│   │   ├── assets/
│   │   │   ├── img/
│   │   │   ├── sounds/
│   │   │   └── videos/
│   │   ├── modules/
│   │   │   ├── game/
│   │   │   ├── map/
│   │   │   ├── ui/
│   │   │   ├── data/
│   │   │   └── utils/
│   │   └── tests/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .gitignore
├── DOCS/
├── old/
└── README.md
```

### Structure retenue
- `src/modules/game/` : logique métier pure, progression, quêtes, badges.
- `src/modules/map/` : gestion de la carte interactive et des emplacements.
- `src/modules/ui/` : écrans et composants qui relient le DOM au domaine.
- `src/modules/data/` : données statiques validées (personnages, quiz, dialogues).
- `src/modules/utils/` : utilitaires partagés, stockage, accessibilité, médias.

Cette structure garde la clarté d'une arborescence en couches tout en restant compatible avec l'organisation actuelle du dépôt.

---

## 3. Modules principaux

### 3.1 Game (`src/modules/game/`)

**Responsabilité** : gérer l'état du jeu, la progression du joueur, les quêtes et les quiz.

Fichiers clés :
- `Jeu.ts`
- `Joueur.ts`
- `Personnage.ts`
- `Quete.ts`
- `Quiz.ts`
- `Question.ts`
- `Reponse.ts`
- `Badge.ts`
- `CarnetDeBord.ts`
- `types/EtatQuete.ts`
- `types/Position.ts`

### 3.2 Map (`src/modules/map/`)

**Responsabilité** : représentation de la carte, sélection des intervenants, changement de zone.

Fichiers clés :
- `carte.ts`
- `locations.ts`
- `npc.ts`

### 3.3 UI (`src/modules/ui/`)

**Responsabilité** : écrans, dialogues, quiz, modales et mise à jour du DOM en fonction de l'état du jeu.

Fichiers clés :
- `EcranSelection.ts`
- `EcranCarte.ts`
- `EcranDialogue.ts`
- `EcranFin.ts`
- `composants/`

### 3.4 Data (`src/modules/data/`)

**Responsabilité** : stocker les données statiques sans logique métier.

Fichiers clés :
- `personnages.ts`
- `quizzes.ts`
- `dialogues.ts`
- `translations.ts` (optionnel)

### 3.5 Utils (`src/modules/utils/`)

**Responsabilité** : services transverses et helpers.

Fichiers clés :
- `storage.ts`
- `events.ts`
- `media.ts`
- `accessibility.ts`

---

## 4. Flux de données

```
HTML / index.html
      ↓
main.ts
      ↓
Game + Map + UI
      ↓
Data + Utils
```

- `main.ts` initialise l'application, charge la sauvegarde et démarre les modules.
- La `UI` intéragit avec `Game` et `Map`.
- `Game` met à jour l'état métier.
- `UI` redessine l'écran en fonction de l'état.
- `Utils` persiste l'état et gère les médias.

---

## 5. Build & développement

- `npm run dev` : serveur Vite en local.
- `npm run build` : compilation TypeScript + bundle.
- `npm run preview` : prévisualisation de la build.
- `npm run test` : tests Vitest.

### TypeScript
- `target`: ES2023
- `module`: ESNext
- `strict`: activé

---

## 6. PWA & installation

Fichiers attendus :
- `public/manifest.json`
- `public/icon-192.png`
- `public/icon-512.png`
- `src/service-worker.ts`

Dans `index.html` :
```html
<link rel="manifest" href="/manifest.json">
<link rel="icon" type="image/png" href="/icon-192.png">
<meta name="theme-color" content="#000000">
```

---

## 7. Accessibilité

- HTML sémantique (`header`, `main`, `nav`, `section`).
- Navigation clavier (`tabindex`, focus visible).
- Contraste adéquat.
- Textes alternatifs sur les images.
- Contrôles et sous-titres vidéo.

---

## 8. Performance

- Optimiser les images et vidéos.
- Charger le CSS et JS de manière efficace.
- Eviter les dépendances lourdes.
- Utiliser le service worker pour cache hors ligne.

---

## 9. Tests

- Unitaires : logique métier.
- Intégration : interaction entre UI, Game et Map.
- E2E : scénario utilisateur (optionnel).
- Outils : Vitest.

---

## Conclusion

Cette version rassemble le meilleur des deux approches : une architecture modulaire claire comme dans `architecture.md`, avec une arborescence concrète et détaillée qui reflète la structure réelle du dépôt.

- **Target** : ES2023 (navigateurs modernes)
- **Module** : ESNext (Vite gère la transpilation)
- **Strict** : activé (noUnusedLocals, noUnusedParameters, etc.)

---

## 6. PWA & Installation

### Fichiers attendus
- `public/manifest.json` : manifeste PWA
- `public/icon-192.png` / `icon-512.png` : icônes
- `src/service-worker.ts` : [à créer] service worker (cache, offline)

### Dans `index.html`
```html
<link rel="manifest" href="/manifest.json">
<link rel="icon" type="image/png" href="/icon-192.png">
<meta name="theme-color" content="#...">
```

---

## 7. Accessibilité & Sémantique

### Principes
- Structure **HTML sémantique** (header, main, section, article, nav)
- **Attributs ARIA** où nécessaire
- **Navigation au clavier** (tabindex, focus visible)
- **Contraste** suffisant (WCAG AA minimum)
- **Sous-titres** et contrôles pour les vidéos
- **Textes alternatifs** pour les images

### Tests d'accessibilité
- axe DevTools, WAVE, Lighthouse
- Vérification au clavier (Tab, Entrée, Échap)
- Lecteur d'écran (NVDA, JAWS, VoiceOver)

---

## 8. Performance & Optimisation

### Images
- **WebP** + fallback PNG
- **Responsive** (srcset, picture)
- **Lazy loading** si non-critique
- Dimensions appropriées, compression

### Vidéos
- Format **MP4** (H.264) + **WebM** (VP9) pour compatibilité
- Codec audio AAC
- **Streaming adaptatif** si possible, sinon progressive
- Contrôles natifs, sous-titres intégrés

### Ressources
- **CSS** : critique en ligne, reste asynchrone
- **JS** : async/defer, code-splitting via Vite
- **Fonts** : system fonts privilégiés
- **Cache** : HTTP Cache-Control, Service Worker

### Mesure
- Lighthouse CI en build
- Core Web Vitals (LCP, FID, CLS)

---

## 9. Tests

### Stratégie
- **Unitaires** : logique métier (game.ts, progression.ts, etc.)
- **Intégration** : interaction UI/Game/Map
- **E2E** (optionnel) : scénarios utilisateur complets

### Framework
- **Vitest** : configuration dans `vitest.config.ts`
- **Assertions** : vitest expect ou Chai

### Structure
```
src/tests/
├── unit/
│   ├── game.test.ts
│   ├── progression.test.ts
│   └── ...
├── integration/
│   ├── game-ui.test.ts
│   └── ...
└── setup.ts
```

---

## 10. Documentation

### À produire

1. **CONCEPTION.md** : spécifications détaillées (états du jeu, diagrammes, workflows)
2. **API.md** : documentation des modules et interfaces publiques
3. **DEV.md** : guide développeur (installation, contribution, conventions)
4. **CODE.md** : conventions de code (nommage, structure, commentaires)

### Conventions de code
- Noms en **camelCase** (variables, fonctions)
- Types explicites (interfaces, types génériques)
- Commentaires JSDoc pour les fonctions publiques
- Imports groupés (modules tiers, locaux)

---

## 11. Déploiement

### Environnements
- **Dev** : `npm run dev` (localhost:5173)
- **Build** : `npm run build` (distribution dans `dist/`)
- **Production** : serveur HTTP statique (ou CDN) + Service Worker

### Checklist
- [ ] Build sans erreurs TypeScript
- [ ] Aucun console.warn/error
- [ ] Lighthouse score ≥ 90
- [ ] Tests au vert
- [ ] Accessibilité vérifiée (WAVE, axe)
- [ ] Performance mesurée (CWV)
- [ ] PWA fonctionnelle (offline)

---

## 12. Prochaines étapes

1. **Créer** les dossiers `src/modules/game`, `map`, `ui`, `data`, `utils`
2. **Définir** les interfaces des modules (cf. section 3)
3. **Implémenter** la logique métier (Game, Map)
4. **Construire** les composants UI
5. **Charger** les données (professionnels, quiz, dialogues)
6. **Écrire** les tests
7. **Configurer** Vite, Service Worker, PWA
8. **Optimiser** images et vidéos
9. **Tester** accessibilité et performance
10. **Documenter** (CONCEPTION, API, DEV)

---

## Annexe : Ancien code (problèmes identifiés)

### Issues de l'ancienne architecture
- ✗ Deux fichiers HTML de 2000+ lignes sans séparation logique
- ✗ CSS et JS en ligne (pas de minification, pas de cache)
- ✗ Pas de modularité (code monolithique)
- ✗ Pas de tests
- ✗ Pas de documentation
- ✗ Images encodées en base64 (poids + pas de cache)
- ✗ Pas de PWA
- ✗ Accessibilité absente

### Améliorations apportées
- ✓ Modularité par domaine (game, map, ui, data, utils)
- ✓ Séparation HTML/CSS/JS
- ✓ TypeScript + outillage Vite
- ✓ Tests + CI/CD ready
- ✓ PWA installable
- ✓ Images/vidéos optimisées + cache
- ✓ Accessibilité RGAA
- ✓ Documentation complète
- ✓ Éco-conception (RGESN)
