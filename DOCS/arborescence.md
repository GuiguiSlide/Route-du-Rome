# Arborescence

La structure retenue combine la modularité opérationnelle de `src/modules/` et la séparation logique en couches.

Route-du-Rome/
├── frontend/RouteDeRome/
│   ├── public/                        # actifs statiques et fichiers PWA
│   ├── src/
│   │   ├── main.ts                   # point d'entrée de l'application
│   │   ├── style.css                 # styles globaux
│   │   ├── assets/
│   │   │   ├── img/
│   │   │   ├── sounds/
│   │   │   └── videos/
│   │   ├── modules/
│   │   │   ├── game/                 # logique métier et progression du jeu
│   │   │   │   ├── Jeu.ts
│   │   │   │   ├── Joueur.ts
│   │   │   │   ├── Personnage.ts
│   │   │   │   ├── Quete.ts
│   │   │   │   ├── Quiz.ts
│   │   │   │   ├── Question.ts
│   │   │   │   ├── Reponse.ts
│   │   │   │   ├── Badge.ts
│   │   │   │   ├── CarnetDeBord.ts
│   │   │   │   └── types/
│   │   │   │       ├── EtatQuete.ts
│   │   │   │       └── Position.ts
│   │   │   ├── map/                  # carte interactive et sélection des intervenants
│   │   │   │   ├── carte.ts
│   │   │   │   ├── locations.ts
│   │   │   │   └── npc.ts
│   │   │   ├── ui/                   # écrans et composants DOM
│   │   │   │   ├── EcranSelection.ts
│   │   │   │   ├── EcranCarte.ts
│   │   │   │   ├── EcranDialogue.ts
│   │   │   │   ├── EcranFin.ts
│   │   │   │   └── composants/
│   │   │   ├── data/                 # données statiques du jeu
│   │   │   │   ├── personnages.ts
│   │   │   │   ├── quizzes.ts
│   │   │   │   └── dialogues.ts
│   │   │   └── utils/                # utilitaires partagés
│   │   │       ├── storage.ts
│   │   │       ├── events.ts
│   │   │       ├── media.ts
│   │   │       └── accessibility.ts
│   │   └── tests/
│   │       ├── unit/
│   │       └── integration/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .gitignore
├── DOCS/
├── old/
└── README.md

## Notes
- `src/modules/game/` représente la couche domaine métier.
- `src/modules/map/` et `src/modules/utils/` supportent les services externes et helpers.
- `src/modules/ui/` relie le DOM au jeu sans faire reposer la logique métier sur le navigateur.
- `src/modules/data/` contient les données statiques validées par le commanditaire.