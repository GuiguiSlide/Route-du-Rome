# Comment fonctionne l'application

## 1. Démarrage

Le navigateur ouvre `frontend/RouteDeRome/index.html`. Le fichier contient les écrans et les éléments DOM; il charge `style.css` puis `src/main.ts`. La fonction `init()` de `main.ts` enregistre tous les événements. Aucun framework ne pilote l'application : les modules modifient directement le DOM.

## 2. Choisir son explorateur

Les cartes `card-elio` et `card-elia` sont reliées à `bindHeroCards()` dans `EcranSelection.ts`.

1. `launchHero(id)` recherche le héros avec `getHeroById()`.
2. `playBackgroundAudio()` lance la musique et les vagues.
3. `saveSelectedHero()` sauvegarde l'identifiant sous `rdr_hero`.
4. `fillHeroPopup()` prépare le portrait, le nom, le rôle et la bio.
5. `transitionToGameScreen()` masque `screen-pick` et affiche `screen-game`.
6. `startVideoSequence()` charge la vidéo du héros dans `the-video`.
7. Une fois la vidéo prête, le dialogue d'introduction s'ouvre.
8. Après les lignes d'introduction, `showHeroPopup()` affiche le bouton de démarrage.

Le bouton `pop-btn-start` ferme la popup puis appelle `new EcranCarte().afficher()`.

## 3. Dialogue

`startDialogue(lines, onEnd)` reçoit un tableau de textes et une fonction à appeler à la fin. Il remplit `dlg-dots`, ouvre `dlg` et écrit le texte caractère par caractère avec `typeLine()`.

- Le premier clic ou la touche Espace/Entrée termine l'animation de frappe.
- Le clic suivant passe à la ligne suivante avec `advanceDialogue()`.
- Après la dernière ligne, le callback fourni est exécuté.
- `closeDialogue()` masque la boîte et arrête le timer.

`main.ts` possède le gestionnaire général de clic du dialogue. Il ignore les boutons de quiz pour qu'un clic sur une question ne fasse pas avancer les lignes.

## 4. Création de la carte

`EcranCarte.afficher()` réalise l'initialisation du jeu :

1. il masque `screen-game` et affiche `screen-map`;
2. il lit `personnages.json`;
3. `creerPersonnages()` transforme les données en objets métier;
4. il garde les 9 personnages qui ont une position;
5. il crée un `CarnetDeBord`, un `Joueur` et une `Quete` par professionnel;
6. il crée `Jeu` avec ces objets;
7. `Carte.initialiser("map")` crée la carte Leaflet;
8. les 9 marqueurs sont ajoutés;
9. chaque clic sur la carte est transmis à `gererClicCarte()`.

## 5. Déplacement et rencontre

Quand l'utilisateur clique sur la carte, `gererClicCarte()` :

1. déplace le joueur vers la position cliquée;
2. affiche ou déplace son marqueur;
3. appelle `Jeu.verifierProximite()`;
4. compare la position du joueur à chaque professionnel non rencontré;
5. déclenche une rencontre si la distance est inférieure ou égale à 1 500 mètres.

Si aucun personnage n'est assez proche, le clic ne lance rien. Si un personnage est trouvé, `Jeu.parlerA()` marque la rencontre et démarre sa quête.

## 6. Vidéo et identité du professionnel

Avant d'ouvrir le dialogue NPC, `EcranCarte` remplit :

- `dlg-portrait` avec le portrait du professionnel;
- `dlg-nname` avec son nom;
- `dlg-nrole` avec son métier.

`afficherVideoRencontre()` charge sa vidéo dans `encounter-video`, appelle `play()` et affiche `encounter-video-wrap`. Le CSS place cette vidéo au-dessus de la carte et sous la boîte de dialogue. Quand la rencontre se termine, `masquerVideoRencontre()` met la vidéo en pause et vide sa source.

## 7. Quiz

Après les lignes de dialogue, le callback de `startDialogue()` lance `startQuiz()`.

1. `renderChoices()` crée un bouton par question du `Quiz`.
2. Un clic appelle `choisirQuestion()`.
3. Le bouton sélectionné reçoit la classe `selected`.
4. La réponse remplace le texte d'introduction dans `dlg-txt`.
5. `Jeu.marquerQuestionVue()` enregistre la question comme consultée.
6. Après les trois questions, le bouton `dlg-quiz-continue` est activé.
7. `terminerQuiz()` ferme le quiz et appelle la fin de rencontre.

Les questions sont ouvertes : il n'y a pas de réponse correcte ou incorrecte. Le joueur doit consulter chaque question pour terminer le quiz.

## 8. Récompense et niveau

`EcranCarte.terminerRencontre()` appelle `Jeu.terminerRencontre()`, qui appelle `validerQuete()`.

`validerQuete()` :

- passe la quête à l'état `ACCOMPLIE`;
- ajoute le métier au `CarnetDeBord`;
- donne 150 XP au `Joueur`;
- crée un badge lié au professionnel;
- stocke le badge dans le joueur.

`Joueur.gagnerXp()` recalcule le niveau avec `Math.floor(xp / 100) + 1`. Le niveau affiché dans le HUD de carte est actualisé après chaque rencontre.

## 9. Carnet de bord

Le bouton `carnet-btn` est relié par `bindCarnetControls()`. Il déclenche l'événement DOM `ouvrir-carnet`; `EcranCarte` l'écoute et transmet le joueur à `afficherCarnet()`.

`EcranCarnet.afficherCarnet()` lit l'état courant et remplit :

- `carnet-level` : niveau;
- `carnet-xp` : XP total;
- `carnet-jobs` : métiers découverts sur 9;
- `carnet-badges` : un élément par badge.

`fermerCarnet()` retire la classe `show` de `carnet-overlay`.

## 10. Fin de partie

Après chaque quête, `EcranCarte` appelle `Jeu.estTermine()`. Cette méthode renvoie vrai lorsque les 9 quêtes sont accomplies. Dans ce cas, `EcranFin.afficher()` :

- reporte l'XP dans `end-xp`;
- reporte le niveau dans `end-level`;
- reporte le nombre de métiers dans `end-jobs`;
- affiche `end-overlay`.

Le lien de l'écran final recharge `index.html` pour recommencer une partie.

## 11. Audio

Les balises `bg-music`, `waves` et `seagull` sont dans `index.html`. Les fonctions de `media.ts` sont appelées après le clic de choix du héros, ce qui respecte les restrictions du navigateur sur la lecture automatique audio.

## 12. Données et sources non utilisées

Le flux actuel utilise `personnages.json` comme source unique. Les tableaux `DIALOGUES`, `QUIZZES`, `INTRO_NPCS` et `NPCS` sont conservés pour référence ou transition, mais ne sont pas appelés. `storage.getSelectedHero()`, les helpers d'accessibilité, le bus `events.ts`, `Reponse.ts`, `IAudio.ts` et `IVideo.ts` sont également disponibles mais non intégrés au démarrage.

## 13. Vérification

- `npx vite build` vérifie le bundling et réussit actuellement.
- `npm run build` ajoute la compilation TypeScript et peut échouer sur l'enum `EtatQuete` et les tests unitaires hérités d'une ancienne API.
- Les tests doivent couvrir au minimum la proximité, le quiz complet, la récompense, l'ouverture du carnet et l'apparition de l'écran final.
