# Arborescence

projet-route-du-rome/
├─ src/
│  ├─ domaine/              # logique métier pure, en OBJETS (testable, sans DOM)
│  │  ├─ Jeu.ts             # orchestre les règles (commencer, parler à un perso, répondre, valider une quête)
│  │  ├─ Joueur.ts          # XP, niveau, badges, personnage choisi, carnet de bord
│  │  ├─ Personnage.ts      # un pro : id, nom, métier, secteur, position, quiz, vidéo d'intro
│  │  ├─ Quete.ts           # une quête : objectif, personnage concerné, état
│  │  ├─ Quiz.ts            # questions/réponses d'un personnage, vérification des réponses
│  │  ├─ Question.ts        # une question + ses réponses possibles
│  │  ├─ Reponse.ts         # une réponse possible à une question
│  │  ├─ Badge.ts           # un badge obtenu (id, nom, personnage associé)
│  │  ├─ CarnetDeBord.ts    # métiers découverts, progression globale
│  │  └─ types/
│  │     ├─ EtatQuete.ts    # enum : NON_COMMENCEE / EN_COURS / ACCOMPLIE
│  │     └─ Position.ts     # type lat/lng
│  │
│  ├─ services/             # accès au monde extérieur, toujours derrière une interface
│  │  ├─ carte/
│  │  │  ├─ ICarte.ts       # interface : afficherMarqueur, centrerSur, marquerAccompli
│  │  │  └─ CarteLeaflet.ts # implémentation concrète avec Leaflet
│  │  ├─ audio/
│  │  │  ├─ IAudio.ts       # interface : jouerMusique, couper
│  │  │  └─ AudioWeb.ts     # implémentation avec l'API Audio du navigateur
│  │  └─ video/
│  │     ├─ IVideo.ts       # interface : lire, passer
│  │     └─ VideoHtml.ts    # implémentation avec <video>
│  │
│  ├─ ui/                   # rendu et écrans : relie le DOM au domaine
│  │  ├─ EcranSelection.ts  # choix de l'explorateur + vidéo d'intro + alerte de démarrage
│  │  ├─ EcranCarte.ts      # carte interactive, badges, quête actuelle, changement de perso
│  │  ├─ EcranDialogue.ts   # dialogue, questions, vidéo, validation de quête
│  │  ├─ EcranFin.ts        # écran de fin une fois toutes les quêtes accomplies
│  │  └─ composants/        # éléments UI réutilisables (boutons, cartes de perso, etc.)
│  │
│  ├─ donnees/
│  │  └─ personnages.ts     # données statiques des personnages et de leurs quiz
│  │
│  ├─ app.ts                # état global de navigation entre écrans
│  └─ main.ts                # point d'entrée : assemble domaine, services, ui
│
├─ public/                  # médias (vidéos, sons, images optimisées) et assets statiques
│
├─ styles/                  # CSS sorti du HTML et organisé (un fichier par écran ou composant)
│
├─ tests/
│  ├─ domaine/              # tests unitaires (Jeu, Joueur, Quiz, Quete, CarnetDeBord...)
│  └─ services/             # tests des implémentations de services (mocks des interfaces)
│
├─ index.html               # squelette minimal, un seul point d'entrée HTML
├─ vite.config.ts
├─ tsconfig.json
├─ package.json
└─ .gitignore