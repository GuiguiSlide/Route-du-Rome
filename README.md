# La Route du Rome

Jeu sérieux web réalisé pour France Travail Ille-et-Vilaine. Le joueur choisit Élio ou Élia, explore une carte du 35, rencontre des professionnels et découvre leurs métiers grâce aux dialogues, aux vidéos et aux quiz.

## Fonctionnalités

- choix d'un explorateur : Élio ou Élia ;
- vidéo et dialogue d'introduction ;
- carte interactive Leaflet de l'Ille-et-Vilaine ;
- 9 professionnels à rencontrer ;
- dialogue avec portrait, nom et métier du professionnel ;
- vidéo de rencontre affichée devant la carte ;
- 3 questions ouvertes par professionnel ;
- réponse affichée dans la boîte de dialogue ;
- 150 XP et un badge après chaque quête complète ;
- progression du niveau du joueur ;
- carnet de bord avec métiers et badges ;
- écran de fin après les 9 rencontres ;
- interface adaptée au mobile et à la tablette.

## Stack technique

- TypeScript ;
- JavaScript généré par Vite ;
- Vite ;
- Leaflet ;
- HTML et CSS natifs ;
- Vitest pour les tests ;
- aucun framework frontend.

## Structure

```text
Route-du-Rome/
├── DOCS/                         Documentation et conception
├── frontend/RouteDeRome/
│   ├── index.html                Structure des écrans
│   ├── public/assets/            Images, sons et vidéos servis par Vite
│   └── src/
│       ├── main.ts               Point d'entrée
│       ├── style.css             Styles globaux et responsive
│       ├── modules/data/         Personnages, dialogues et quiz
│       ├── modules/game/         Joueur, quêtes, quiz, badges et XP
│       ├── modules/map/          Carte Leaflet et marqueurs
│       ├── modules/ui/           Écrans et composants DOM
│       ├── modules/utils/        Audio, stockage et helpers
│       └── tests/                Tests unitaires et d'intégration
└── old/                          Ancienne version conservée comme référence
```

La source de vérité actuelle est `frontend/RouteDeRome/src/modules/data/personnages.json`. Elle contient les 2 héros, les 9 professionnels, leurs dialogues, leurs portraits, leurs vidéos et leurs quiz.

## Installation

Prérequis : Node.js et npm.

```bash
cd frontend/RouteDeRome
npm install
```

## Commandes

Depuis `frontend/RouteDeRome` :

```bash
npm run dev       # lance le serveur de développement Vite
npx vite build    # génère le bundle de production
npm run build     # TypeScript puis bundle Vite
npm run preview   # sert la build de production
```

Le serveur de développement est généralement disponible à l'adresse indiquée par Vite, souvent `http://localhost:5173`.

## Fonctionnement du jeu

1. `main.ts` initialise les événements de l'interface.
2. Le joueur choisit Élio ou Élia.
3. La vidéo et le dialogue d'introduction sont affichés.
4. Le joueur démarre l'aventure et ouvre la carte.
5. Un clic déplace le joueur; une rencontre est déclenchée à moins de 1 500 mètres d'un professionnel.
6. Le portrait, le nom, le métier, la vidéo et le dialogue du professionnel sont affichés.
7. Le joueur consulte les trois questions du quiz.
8. Le bouton `Continuer` valide la quête et attribue 150 XP, un métier et un badge.
9. Le carnet reste consultable depuis la carte.
10. L'écran final apparaît quand les 9 quêtes sont accomplies.

## Documentation

- [Documentation du dossier](DOCS/README.md)
- [Architecture fichier par fichier](DOCS/architecture.md)
- [Fonctionnement détaillé](DOCS/commentcafonctionne.md)
- [Arborescence](DOCS/arborescence.md)
- [Conception](DOCS/conception.md)
- [Objectifs et contraintes](DOCS/objectifs_et_contraintes.md)
- [Devlog](DOCS/devlog.md)
- [Reste à faire](DOCS/reste_a_faire.md)

## Tests et état connu

Les tests sont dans `frontend/RouteDeRome/src/tests/`. Le bundling `npx vite build` fonctionne. La commande `npm run build` peut encore signaler des éléments hérités de l'ancienne API de tests ainsi que l'utilisation de l'enum `EtatQuete` avec la configuration TypeScript actuelle.

Les fichiers `dialogues.ts`, `quizzes.ts`, `locations.ts`, `npc.ts`, `Reponse.ts`, `IAudio.ts` et `IVideo.ts` sont conservés pour la migration ou l'évolution future, mais ne sont pas utilisés par le flux principal actuel.

## PWA et déploiement

Le projet est préparé pour un déploiement statique et référence un manifeste dans `index.html`. Le manifeste, le service worker et la stratégie de cache doivent être finalisés avant de considérer la PWA comme complètement opérationnelle hors connexion.
