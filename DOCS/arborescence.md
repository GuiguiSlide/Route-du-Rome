à adapter

src/
├─ domaine/            la logique métier, en OBJETS (testable, sans DOM)
│  ├─ Jeu.ts           orchestre les règles (commencer, répondre, gagner de l'XP)
│  ├─ Joueur.ts        XP, niveau, badges, métiers découverts
│  ├─ Personnage.ts    un pro : nom, métier, secteur, position, quiz
│  ├─ Quete.ts         une quête : objectif, état
│  ├─ Quiz.ts          questions et réponses d'un personnage
│  └─ CarnetDeBord.ts  progression et métiers débloqués
├─ services/           accès au monde extérieur, derrière des interfaces
│  ├─ Carte.ts         encapsule Leaflet
│  ├─ Audio.ts         musique / ambiance sonore
│  └─ Video.ts         lecture des vidéos + « passer »
├─ ui/                 rendu et écrans : relie le DOM au domaine
│  ├─ EcranSelection.ts
│  ├─ EcranCarte.ts
│  └─ EcranDialogue.ts
├─ donnees/
│  └─ personnages.ts   les données des personnages / quiz
└─ main.ts             point d'entrée : assemble le tout
index.html             squelette minimal
public/                médias (vidéos, sons, images optimisées)
styles/                CSS sorti du HTML et organisé
tests/                 tests
