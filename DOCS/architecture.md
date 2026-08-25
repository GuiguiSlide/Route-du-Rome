# Architecture technique

## 1. Vue d'ensemble

Route du Rome est une application web de type jeu sérieux. Le frontend est une application TypeScript sans framework, bundlée par Vite. Le navigateur fournit le DOM, les balises audio/video et `localStorage`; Leaflet fournit la carte interactive.

Le chemin réellement exécuté est :

```text
index.html
  -> main.ts
      -> EcranSelection
          -> EcranDialogue / HeroPopup
              -> EcranCarte
                  -> Carte + Jeu
                      -> PersonnageFactory
                          -> personnages.json
                  -> EcranDialogue -> EcranQuiz
                  -> EcranCarnet / EcranFin
```

La source de vérité des personnages, dialogues et quiz est `src/modules/data/personnages.json`. Les fichiers `dialogues.ts`, `quizzes.ts`, `locations.ts` et `npc.ts` sont des structures anciennes ou prévues, mais ne participent pas au démarrage actuel.

## 2. Fichiers d'entrée et configuration

### `frontend/RouteDeRome/index.html`

Contient les trois écrans visuels et tous les éléments DOM utilisés par les modules UI : choix du héros, introduction vidéo, popup, carte, dialogue, quiz, carnet et écran de fin. Les identifiants sont un contrat avec le TypeScript : renommer `dlg`, `map`, `carnet-overlay` ou `end-overlay` nécessite de modifier les modules correspondants.

Il charge Leaflet par CDN, `style.css` et `src/main.ts`. Les vidéos et sons sont référencés par des chemins relatifs.

### `frontend/RouteDeRome/package.json`

Déclare le projet Vite, les scripts `dev`, `build` et `preview`, TypeScript, Leaflet et Vitest. `npm run build` lance `tsc` puis `vite build`; `npx vite build` ne réalise que le bundling Vite.

### `frontend/RouteDeRome/tsconfig.json`

Configure la compilation TypeScript stricte. Le réglage `erasableSyntaxOnly` rend l'enum `EtatQuete` incompatible avec TypeScript 6 : c'est une dette de compilation connue, indépendante du bundling Vite.

### `frontend/RouteDeRome/.gitignore`

Exclut les fichiers générés ou locaux, notamment `node_modules` et `dist`.

### `frontend/RouteDeRome/src/main.ts`

Point d'entrée exécuté par `index.html`. Il enregistre :

- les cartes de sélection des héros via `bindHeroCards()`;
- les contrôles de la vidéo d'introduction via `bindVideoControls()`;
- les clics et touches du dialogue via `bindDialogueControls()`;
- les boutons de la popup via `bindHeroPopupControls()`;
- le bouton `Continuer` du quiz via `bindQuizControls()`;
- l'ouverture et la fermeture du carnet via `bindCarnetControls()`.

Le gestionnaire de clic du dialogue ignore volontairement les boutons du quiz afin qu'un clic sur une question ne fasse pas avancer le texte d'introduction.

## 3. Données

### `src/modules/data/personnages.json`

Source de vérité statique. Il contient 2 héros jouables (`elio`, `elia`) et 9 professionnels cartographiés. Chaque professionnel possède une position, un portrait, une vidéo, deux lignes d'introduction et trois questions ouvertes avec leur réponse informative.

### `src/modules/data/personnages.ts`

Définit les contrats `Character`, `QuizQuestion`, `PersonnagePresentation` et `PersonnageContenu`. `CHARACTERS` importe le JSON. `chargerContenus()` extrait les dialogues, `chargerPresentations()` prépare les marqueurs, et les fonctions `get*` recherchent les héros ou personnages. `EcranSelection` utilise `getHeroById`; `EcranCarte` utilise les fonctions de transformation.

### `src/modules/data/dialogues.ts`

Définit `DialogueDonnees` et `DIALOGUES`, actuellement vide. Aucun module actif ne l'importe; les dialogues réels viennent de `personnages.json`.

### `src/modules/data/quizzes.ts`

Définit une ancienne structure `QuizDonnees` et `QUIZZES`, actuellement vide et non importée. Le quiz actif est construit depuis le champ `quiz` de `personnages.json`.

## 4. Domaine métier

### `src/modules/game/PersonnageFactory.ts`

Adaptateur entre JSON et domaine. `creerPersonnage()` convertit un personnage JSON en `Personnage`, crée sa `Position`, ses `Question` et son `Quiz`. `creerPersonnages()` applique cette conversion à toute la liste. Appelé par `EcranCarte`.

### `src/modules/game/Personnage.ts`

Modèle d'un héros ou professionnel. Il conserve son identité, son métier, sa position, sa vidéo et son quiz. `marquerRencontre()` et `aEteRencontre()` contrôlent la disponibilité du marqueur; `getQuiz()` expose le quiz au jeu.

### `src/modules/game/Question.ts`

Objet simple contenant `id`, `texte` et `reponse`. Créé par `PersonnageFactory` et lu par `Quiz` et `EcranQuiz`.

### `src/modules/game/Quiz.ts`

Conserve les questions déjà consultées dans un `Set`. `marquerVue()` valide l'identifiant puis l'enregistre. `estComplet()` devient vrai quand toutes les questions ont été consultées. Le système n'évalue pas une bonne ou mauvaise réponse : chaque question est un sujet à ouvrir.

### `src/modules/game/Quete.ts`

Associe un professionnel à un objectif et un état (`NON_COMMENCEE`, `EN_COURS`, `ACCOMPLIE`). `commencer()` démarre la quête, `valider()` la termine, et `estAccomplie()` permet à `Jeu.estTermine()` de calculer la fin globale.

### `src/modules/game/Joueur.ts`

Conserve l'état de la partie : XP, niveau, badges, héros choisi, position et carnet. `gagnerXp()` ajoute l'XP et recalcule le niveau (`floor(XP / 100) + 1`). `ajouterBadge()` évite les doublons. Les getters sont utilisés par `Jeu`, `EcranCarnet` et `EcranFin`.

### `src/modules/game/Badge.ts`

Objet contenant l'identifiant du badge, son nom de métier et l'identifiant du professionnel. Créé par `Jeu.validerQuete()` puis stocké par `Joueur`.

### `src/modules/game/CarnetDeBord.ts`

Conserve les métiers uniques découverts. `ajouterMetier()` évite les doublons; `getMetiersDecouverts()` fournit une copie; `getProgression()` retourne une fraction; `aDecouvert()` répond à une recherche. Le carnet est créé par `EcranCarte` et alimenté par `Jeu`.

### `src/modules/game/Jeu.ts`

Orchestrateur métier. `parlerA()` marque une rencontre et démarre sa quête. `verifierProximite()` compare la position du joueur à celles des professionnels avec un seuil de 1 500 mètres. `marquerQuestionVue()` délègue au quiz. `validerQuete()` valide la quête, ajoute le métier, attribue 150 XP et crée le badge. `terminerRencontre()` appelle cette validation. `estTermine()` indique si les 9 quêtes sont accomplies.

### `src/modules/game/types/EtatQuete.ts`

Déclare les trois états d'une quête. Il est importé par `Quete`. L'utilisation d'un `enum` est actuellement signalée par TypeScript 6 avec `erasableSyntaxOnly`.

### `src/modules/game/types/Position.ts`

Stocke latitude et longitude. `distanceTo()` calcule une distance en mètres avec la formule de Haversine; `Jeu.verifierProximite()` l'utilise pour déclencher une rencontre.

### `src/modules/game/Reponse.ts`

Ancien objet de réponse à choix multiples (`id`, `texte`). Il n'est importé par aucun fichier actif.

## 5. Carte

### `src/modules/map/Carte.ts`

Adaptateur Leaflet. `initialiser()` crée la carte et son écouteur de clic; `onClicCarte()` enregistre le callback fourni par `EcranCarte`; `afficherJoueur()` déplace le marqueur du joueur; `afficherMarqueur()` ajoute un professionnel; `marquerAccompli()` remplace son affichage par une version accomplie; `centrerSur()` recentre la vue. L'élément HTML utilisé est `#map`.

### `src/modules/map/ICarte.ts`

Contrat abstrait des opérations cartographiques. `Carte` l'implémente, mais `EcranCarte` dépend directement de la classe concrète.

### `src/modules/map/locations.ts`

Ancienne liste `INTRO_NPCS` de professionnels et coordonnées. Elle duplique les données JSON et n'est pas utilisée par le flux courant.

### `src/modules/map/npc.ts`

Définit un ancien type `Npc` et une liste `NPCS` vide. Aucun appelant actif.

## 6. Interface utilisateur

### `src/modules/ui/EcranSelection.ts`

`bindHeroCards()` écoute `card-elio` et `card-elia`. `launchHero()` récupère le héros, lance l'audio, sauvegarde son choix et ouvre la transition. `startVideoSequence()` configure `the-video`, affiche la vidéo d'introduction puis lance le dialogue et la popup. `bindVideoControls()` relie le bouton `skip-btn-action`; `skipVideo()` avance la vidéo et masque ce bouton.

### `src/modules/ui/EcranDialogue.ts`

`startDialogue()` initialise les lignes, les points d'avancement, ouvre `#dlg` et lance l'écriture progressive. `advanceDialogue()` termine d'abord l'animation en cours, puis passe à la ligne suivante; après la dernière ligne, il appelle le callback. `closeDialogue()` masque le panneau et arrête le timer. Appelé par la sélection, la carte et `main.ts`.

### `src/modules/ui/EcranQuiz.ts`

`startQuiz()` prépare l'interface et désactive `Continuer`. `renderChoices()` crée un bouton par question. `choisirQuestion()` affiche la réponse dans `#dlg-txt`, marque la question vue et active `Continuer` après les trois questions. `terminerQuiz()` ferme le quiz et appelle la fin de rencontre. `bindQuizControls()` relie le bouton sans laisser l'événement atteindre le dialogue global.

### `src/modules/ui/EcranCarte.ts`

Crée le `Jeu`, le `Joueur`, le carnet, les quêtes et la carte. Lors d'un clic, elle déplace le joueur, vérifie la proximité, remplit portrait/nom/métier du NPC, lance sa vidéo puis son dialogue. Après le quiz, elle valide la rencontre, marque le marqueur accompli, met à jour le niveau, arrête la vidéo et ouvre `EcranFin` si toutes les quêtes sont terminées. Elle écoute aussi l'événement DOM `ouvrir-carnet`.

### `src/modules/ui/EcranCarnet.ts`

`bindCarnetControls()` relie le bouton `carnet-btn` à l'événement `ouvrir-carnet` et le bouton de fermeture. `afficherCarnet()` lit le `Joueur`, met à jour niveau, XP, métiers et badges, puis affiche `carnet-overlay`. `fermerCarnet()` masque cet overlay.

### `src/modules/ui/EcranFin.ts`

`EcranFin.afficher(joueur)` reporte XP, niveau et nombre de métiers dans les éléments `end-*`, puis affiche `end-overlay`. Il est appelé par `EcranCarte` après la dernière quête.

### `src/modules/ui/composants/HeroPopup.ts`

`fillHeroPopup()` remplit les portraits, noms, rôles et bio du héros. `showHeroPopup()` affiche la popup et anime la barre XP; `closeHeroPopup()` la masque. La bio locale est injectée par `innerHTML` car elle contient des balises `strong` issues du JSON.

### `src/modules/ui/composants/Bouton.ts`

Expose `BoutonProps` et une fonction `Bouton()` qui génère une chaîne HTML de bouton. Aucun appelant actif.

### `src/modules/ui/composants/index.ts`

Réexporte `Bouton`. Ce barrel n'est pas utilisé par le flux actuel.

## 7. Utilitaires

### `src/modules/utils/media.ts`

`playBackgroundAudio()` lance la musique et les vagues après une interaction utilisateur. `startSeagulls()` programme des mouettes aléatoires. Les éléments concernés sont `bg-music`, `waves` et `seagull`.

### `src/modules/utils/storage.ts`

`saveSelectedHero()` écrit le héros dans `localStorage` sous `rdr_hero`; `getSelectedHero()` peut le relire mais n'est pas encore utilisé au démarrage.

### `src/modules/utils/accessibility.ts`

`focusElement()` et `definirAriaRole()` sont des helpers d'accessibilité prévus, sans appelant actuel.

### `src/modules/utils/events.ts`

Expose `on()` et `emit()` pour un bus d'événements; le flux actuel utilise plutôt `document.addEventListener()` et `CustomEvent` pour le carnet.

### `src/modules/utils/IAudio.ts` et `src/modules/utils/IVideo.ts`

Interfaces prévues pour abstraire audio et vidéo. Elles ne sont pas utilisées par les écrans actuels.

## 8. Tests et dette technique

`src/tests/unit/game.test.ts` vise le domaine mais utilise une ancienne API (`new Jeu()` et `getState()`). `src/tests/integration/ui.test.ts` est actuellement un test minimal. Le bundling Vite passe; la compilation complète `npm run build` reste à remettre en cohérence avec l'enum et les tests obsolètes.

Les principales consolidations futures sont : supprimer les sources anciennes non utilisées, brancher le stockage au démarrage, remplacer l'enum ou ajuster TypeScript, et enrichir les tests d'intégration du flux sélection → rencontre → fin.
