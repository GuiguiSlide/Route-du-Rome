# Arborescence du projet

```text
Route-du-Rome/
├── README.md
├── DOCS/
│   ├── README.md
│   ├── arborescence.md
│   ├── architecture.md
│   ├── commentcafonctionne.md
│   ├── conception.md
│   ├── devlog.md
│   ├── objectifs_et_contraintes.md
│   ├── reste_a_faire.md
│   ├── mcd/
│   ├── mld/
│   └── uml/
├── frontend/
│   └── RouteDeRome/
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       ├── public/
│       │   └── assets/
│       │       ├── img/
│       │       ├── sounds/
│       │       └── videos/
│       └── src/
│           ├── main.ts
│           ├── style.css
│           ├── assets/
│           │   ├── img/
│           │   ├── sounds/
│           │   └── videos/
│           ├── modules/
│           │   ├── data/
│           │   │   ├── personnages.json
│           │   │   ├── personnages.ts
│           │   │   ├── dialogues.ts
│           │   │   └── quizzes.ts
│           │   ├── game/
│           │   │   ├── Jeu.ts
│           │   │   ├── Joueur.ts
│           │   │   ├── Personnage.ts
│           │   │   ├── PersonnageFactory.ts
│           │   │   ├── Quete.ts
│           │   │   ├── Quiz.ts
│           │   │   ├── Question.ts
│           │   │   ├── Reponse.ts
│           │   │   ├── Badge.ts
│           │   │   ├── CarnetDeBord.ts
│           │   │   └── types/
│           │   │       ├── EtatQuete.ts
│           │   │       └── Position.ts
│           │   ├── map/
│           │   │   ├── Carte.ts
│           │   │   ├── ICarte.ts
│           │   │   ├── locations.ts
│           │   │   └── npc.ts
│           │   ├── ui/
│           │   │   ├── EcranSelection.ts
│           │   │   ├── EcranCarte.ts
│           │   │   ├── EcranDialogue.ts
│           │   │   ├── EcranQuiz.ts
│           │   │   ├── EcranCarnet.ts
│           │   │   ├── EcranFin.ts
│           │   │   └── composants/
│           │   │       ├── Bouton.ts
│           │   │       ├── HeroPopup.ts
│           │   │       └── index.ts
│           │   └── utils/
│           │       ├── media.ts
│           │       ├── storage.ts
│           │       ├── events.ts
│           │       ├── accessibility.ts
│           │       ├── IAudio.ts
│           │       └── IVideo.ts
│           └── tests/
│               ├── unit/game.test.ts
│               └── integration/ui.test.ts
└── old/
    └── ancienne version HTML/CSS/JavaScript
```

## Rôle des dossiers

- `DOCS/` : documentation fonctionnelle, technique et conception.
- `frontend/RouteDeRome/src/modules/data/` : données statiques et leurs types.
- `frontend/RouteDeRome/src/modules/game/` : domaine métier indépendant du DOM.
- `frontend/RouteDeRome/src/modules/map/` : adaptateur Leaflet et marqueurs.
- `frontend/RouteDeRome/src/modules/ui/` : écrans qui manipulent le DOM.
- `frontend/RouteDeRome/src/modules/utils/` : services transverses.
- `frontend/RouteDeRome/src/tests/` : tests unitaires et d'intégration.
- `old/` : ancienne implémentation conservée comme référence, non chargée par Vite.

## Chemin actif

Le chemin utilisé par l'application est `index.html` → `main.ts` → `EcranSelection`/`EcranCarte` → domaine métier et `personnages.json`. Les fichiers de données et modèles signalés comme non utilisés dans `architecture.md` sont des restes de conception ou de migration.
