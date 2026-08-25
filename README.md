# 1. Contexte
- « La Route du Rome » est une application web interactive — un jeu sérieux — réalisée pour France Travail (Ille-et-Vilaine). Son but : faire découvrir les métiers du département 35 de façon ludique. Le joueur choisit un guide (Élio ou Élia), explore une carte de l'Ille-et-Vilaine, rencontre des professionnels (un par secteur : maritime, restauration, agriculture, industrie, petite enfance, mécanique…), répond à des quiz illustrés de vidéos pour découvrir leur métier, et gagne de l'expérience, des niveaux et des badges qu'il retrouve dans un carnet de bord.
- L'application fonctionne et le commanditaire en est satisfait sur le fond. Mais elle a été développée « à l'ancienne » : tout tient dans deux pages HTML, le CSS et le JavaScript en ligne, du code daté, et ni structure, ni tests, ni documentation. La faire évoluer ou la maintenir est aujourd'hui difficile.
# 2. La demande
- Le commanditaire veut la même application, mais rendue professionnelle : maintenable, évolutive, sécurisée et testable, utilisable sur mobile et tablette, et installable comme une application (PWA).
→ Important : aucune nouvelle fonctionnalité, aucun changement visible pour l'utilisateur. Le résultat doit se comporter exactement comme l'application actuelle.
# 3. Périmètre
- Inclus : refonte technique (structure du code, qualité, outillage de build), responsive mobile/tablette, transformation en PWA, accessibilité, documentation.
- Exclus : toute nouvelle fonctionnalité, tout backend ou serveur, tout compte ou donnée utilisateur, et tout framework (React, Vue, Angular… sont écartés).
# 4. Exigences du commanditaire
- Iso-fonctionnel : tout ce qui marche aujourd'hui (les écrans, les vidéos, les dialogues, la carte, le jeu, les sons) doit marcher à l'identique.
Stack imposée : le projet doit être outillé avec Vite, écrit en TypeScript mais livré en JavaScript classique, sans framework. Les dépendances doivent être gérées proprement (plus de bibliothèque chargée « en dur » depuis un CDN).
- Qualité : un code lisible, modulaire, testé et documenté — document de conception et documentation du code, en français.
Responsive : l'expérience doit être confortable sur mobile et sur tablette, pas seulement sur ordinateur.
- PWA : l'application doit être installable et rester utilisable au mieux même sans connexion.
Performance & optimisation : des temps de chargement maîtrisés et un poids réduit. Aujourd'hui le site intègre ses images directement dans le HTML (encodées en base64), ce qui l'alourdit fortement et empêche toute mise en cache ; avec les vidéos lourdes, c'est une cible prioritaire. La performance doit pouvoir se mesurer (par exemple avec Lighthouse).
- Éco-conception : une démarche de sobriété numérique, dans l'esprit du RGESN (le pendant éco-conception du RGAA, publié par l'Arcep et l'Arcom avec l'ADEME) : alléger les données transférées, ne charger que le nécessaire, éviter le superflu.
- Référencement (SEO) : un HTML sémantique, un titre et une description pertinents, une structure de contenu claire et des alternatives textuelles, pour que la page soit correctement comprise par les moteurs de recherche.
- Accessibilité : l'application doit viser la conformité au RGAA (sous-titres et contrôles des vidéos, contrôle du son, navigation au clavier, contrastes suffisants, textes alternatifs).
- Sécurité : les bonnes pratiques côté front sont attendues (pas d'injection de contenu non maîtrisé, dépendances saines). Des mentions légales doivent être présentes ; le volet RGPD reste léger puisqu'aucune donnée personnelle n'est collectée.
→ Tout se tient : performance, éco-conception, référencement et accessibilité tirent dans le même sens. Un site plus léger est plus rapide, plus sobre et mieux référencé ; un HTML sémantique sert à la fois le SEO et l'accessibilité. Ce sont quatre facettes d'une même qualité, pas quatre chantiers séparés.
# 5. Livrables attendus
- Document de conception : conçu avant de coder (un squelette vous est fourni séparément).
- Code modernisé : dans un dépôt, avec le build Vite et la sortie JavaScript.
- Tests : écrits et exécutables, avec une stratégie assumée.
- Documentation : de conception et du code, en français.
- Version installable : l'application en PWA, prête à être déployée.

```
Route-du-Rome
├─ DOCS
│  ├─ arborescence.md
│  ├─ architecture.md
│  ├─ commentcafonctionne.md
│  ├─ conception.md
│  ├─ devlog.md
│  ├─ mcd
│  ├─ mld
│  ├─ objectifs_et_contraintes.md
│  ├─ README.md
│  ├─ reste_a_faire.md
│  └─ uml
│     └─ uml.md
├─ frontend
│  ├─ README.md
│  └─ RouteDeRome
│     ├─ dist
│     │  ├─ assets
│     │  │  ├─ img
│     │  │  │  ├─ ClairePP.png
│     │  │  │  ├─ EliaPP.png
│     │  │  │  ├─ ElioPP.png
│     │  │  │  ├─ FlorianPP.png
│     │  │  │  ├─ JeannePP.png
│     │  │  │  ├─ LaetitiaPP.png
│     │  │  │  ├─ ManuPP.png
│     │  │  │  ├─ MorganePP.png
│     │  │  │  ├─ NathanPP.png
│     │  │  │  ├─ SarahPP.png
│     │  │  │  └─ SophiePP.png
│     │  │  ├─ index-Btp5VGcP.css
│     │  │  ├─ index-fQElA1ZH.js
│     │  │  ├─ sounds
│     │  │  │  ├─ mouettes.mp3
│     │  │  │  ├─ Theme.mp3
│     │  │  │  └─ waves.mp3
│     │  │  └─ videos
│     │  │     ├─ Claire.mp4
│     │  │     ├─ Elia1.mp4
│     │  │     ├─ Elio1.mp4
│     │  │     ├─ Florian.mp4
│     │  │     ├─ Jeanne.mp4
│     │  │     ├─ Laetitia.mp4
│     │  │     ├─ Manu.mp4
│     │  │     ├─ Morgane1.mp4
│     │  │     ├─ Nathan.mp4
│     │  │     ├─ Sarah.mp4
│     │  │     └─ Sophie.mp4
│     │  ├─ favicon.svg
│     │  ├─ icons.svg
│     │  ├─ index.html
│     │  ├─ jeu.css
│     │  ├─ jeu.html
│     │  └─ jeu.js
│     ├─ index.html
│     ├─ package-lock.json
│     ├─ package.json
│     ├─ public
│     │  ├─ assets
│     │  │  ├─ img
│     │  │  │  ├─ ClairePP.png
│     │  │  │  ├─ EliaPP.png
│     │  │  │  ├─ ElioPP.png
│     │  │  │  ├─ FlorianPP.png
│     │  │  │  ├─ JeannePP.png
│     │  │  │  ├─ LaetitiaPP.png
│     │  │  │  ├─ ManuPP.png
│     │  │  │  ├─ MorganePP.png
│     │  │  │  ├─ NathanPP.png
│     │  │  │  ├─ SarahPP.png
│     │  │  │  └─ SophiePP.png
│     │  │  ├─ sounds
│     │  │  │  ├─ mouettes.mp3
│     │  │  │  ├─ Theme.mp3
│     │  │  │  └─ waves.mp3
│     │  │  └─ videos
│     │  │     ├─ Claire.mp4
│     │  │     ├─ Elia1.mp4
│     │  │     ├─ Elio1.mp4
│     │  │     ├─ Florian.mp4
│     │  │     ├─ Jeanne.mp4
│     │  │     ├─ Laetitia.mp4
│     │  │     ├─ Manu.mp4
│     │  │     ├─ Morgane1.mp4
│     │  │     ├─ Nathan.mp4
│     │  │     ├─ Sarah.mp4
│     │  │     └─ Sophie.mp4
│     │  ├─ favicon.svg
│     │  ├─ icons.svg
│     │  ├─ jeu.css
│     │  ├─ jeu.html
│     │  └─ jeu.js
│     ├─ src
│     │  ├─ assets
│     │  │  ├─ img
│     │  │  │  ├─ ClairePP.png
│     │  │  │  ├─ EliaPP.png
│     │  │  │  ├─ ElioPP.png
│     │  │  │  ├─ FlorianPP.png
│     │  │  │  ├─ JeannePP.png
│     │  │  │  ├─ LaetitiaPP.png
│     │  │  │  ├─ ManuPP.png
│     │  │  │  ├─ MorganePP.png
│     │  │  │  ├─ NathanPP.png
│     │  │  │  ├─ SarahPP.png
│     │  │  │  └─ SophiePP.png
│     │  │  ├─ sounds
│     │  │  │  ├─ mouettes.mp3
│     │  │  │  ├─ Theme.mp3
│     │  │  │  └─ waves.mp3
│     │  │  └─ videos
│     │  │     ├─ Claire.mp4
│     │  │     ├─ Elia1.mp4
│     │  │     ├─ Elio1.mp4
│     │  │     ├─ Florian.mp4
│     │  │     ├─ Jeanne.mp4
│     │  │     ├─ Laetitia.mp4
│     │  │     ├─ Manu.mp4
│     │  │     ├─ Morgane1.mp4
│     │  │     ├─ Nathan.mp4
│     │  │     ├─ Sarah.mp4
│     │  │     └─ Sophie.mp4
│     │  ├─ main.ts
│     │  ├─ modules
│     │  │  ├─ data
│     │  │  │  ├─ dialogues.ts
│     │  │  │  ├─ personnages.json
│     │  │  │  ├─ personnages.ts
│     │  │  │  └─ quizzes.ts
│     │  │  ├─ game
│     │  │  │  ├─ Badge.ts
│     │  │  │  ├─ CarnetDeBord.ts
│     │  │  │  ├─ Jeu.ts
│     │  │  │  ├─ Joueur.ts
│     │  │  │  ├─ Personnage.ts
│     │  │  │  ├─ Question.ts
│     │  │  │  ├─ Quete.ts
│     │  │  │  ├─ Quiz.ts
│     │  │  │  ├─ Reponse.ts
│     │  │  │  └─ types
│     │  │  │     ├─ EtatQuete.ts
│     │  │  │     └─ Position.ts
│     │  │  ├─ map
│     │  │  │  ├─ carte.ts
│     │  │  │  ├─ locations.ts
│     │  │  │  └─ npc.ts
│     │  │  ├─ ui
│     │  │  │  ├─ composants
│     │  │  │  │  ├─ Bouton.ts
│     │  │  │  │  ├─ HeroPopup.ts
│     │  │  │  │  └─ index.ts
│     │  │  │  ├─ EcranCarte.ts
│     │  │  │  ├─ EcranDialogue.ts
│     │  │  │  ├─ EcranFin.ts
│     │  │  │  └─ EcranSelection.ts
│     │  │  └─ utils
│     │  │     ├─ accessibility.ts
│     │  │     ├─ events.ts
│     │  │     ├─ media.ts
│     │  │     └─ storage.ts
│     │  ├─ style.css
│     │  └─ tests
│     │     ├─ integration
│     │     │  └─ ui.test.ts
│     │     └─ unit
│     │        └─ game.test.ts
│     └─ tsconfig.json
├─ old
│  ├─ ancienne_architecture.md
│  ├─ assets
│  │  ├─ img
│  │  │  ├─ ClairePP.png
│  │  │  ├─ EliaPP.png
│  │  │  ├─ ElioPP.png
│  │  │  ├─ FlorianPP.png
│  │  │  ├─ JeannePP.png
│  │  │  ├─ LaetitiaPP.png
│  │  │  ├─ ManuPP.png
│  │  │  ├─ MorganePP.png
│  │  │  ├─ NathanPP.png
│  │  │  ├─ SarahPP.png
│  │  │  └─ SophiePP.png
│  │  ├─ sounds
│  │  │  ├─ mouettes.mp3
│  │  │  ├─ Theme.mp3
│  │  │  └─ waves.mp3
│  │  └─ videos
│  │     ├─ Claire.mp4
│  │     ├─ Elia1.mp4
│  │     ├─ Elio1.mp4
│  │     ├─ Florian.mp4
│  │     ├─ Jeanne.mp4
│  │     ├─ Laetitia.mp4
│  │     ├─ Manu.mp4
│  │     ├─ Morgane1.mp4
│  │     ├─ Nathan.mp4
│  │     ├─ Sarah.mp4
│  │     └─ Sophie.mp4
│  ├─ index.css
│  ├─ index.html
│  ├─ index.js
│  ├─ jeu.css
│  ├─ jeu.html
│  └─ jeu.js
└─ README.md

```