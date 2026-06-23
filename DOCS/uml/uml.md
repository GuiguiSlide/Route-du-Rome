# UML — Diagramme de classes

## Justification des choix de conception

### Séparation domaine / services / ui

Le diagramme reflète directement la séparation en couches définie dans arborescence.md. La classe `Jeu` orchestre les règles métier (commencer une partie, parler à un personnage, répondre à un quiz, valider une quête) sans dépendre du DOM ni d'une librairie externe, ce qui la rend testable de façon isolée. Les classes `Joueur`, `Personnage`, `Quete`, `Quiz`, `Question`, `Reponse`, `Badge` et `CarnetDeBord` constituent cette même couche domaine : ce sont des objets de données et de logique pure, sans aucune dépendance à Leaflet, à l'audio ou à la vidéo.

### Interfaces pour les services externes

`ICarte`, `IAudio` et `IVideo` existent pour isoler le domaine des bibliothèques tierces (Leaflet pour la carte, l'API Audio du navigateur, l'élément `<video>` HTML). Cette indirection permet de remplacer une implémentation sans toucher au domaine, et surtout de simuler ces services dans les tests unitaires (un mock de `ICarte` au lieu de Leaflet, par exemple) plutôt que de dépendre d'un environnement DOM réel.

### Décomposition de Quiz en Question et Reponse

L'arborescence initiale ne mentionnait qu'une classe `Quiz`, mais le fonctionnement décrit (poser des questions, choisir une réponse) implique une structure à deux niveaux. Séparer `Question` et `Reponse` permet de typer précisément chaque question (son texte, ses réponses possibles, la bonne réponse) plutôt que de stocker cette logique dans des structures non typées, ce qui correspond à l'objectif de typage du projet.

### Ajout de Badge et de l'énumération EtatQuete

`Badge` n'apparaissait pas explicitement dans l'arborescence mais est nécessaire puisque le système de récompense est central au jeu (obtention d'XP et de badge à chaque quête accomplie). L'énumération `EtatQuete` (NON_COMMENCEE / EN_COURS / ACCOMPLIE) remplace ce qui serait probablement un simple booléen ou une chaîne de caractères dans le code actuel : elle rend explicite les trois états possibles d'une quête et évite les valeurs invalides.

### Relations de composition (joueur, badges, carnet de bord)

Les relations en composition (`*--`) entre `Jeu`/`Joueur`, `Joueur`/`Badge`, `Joueur`/`CarnetDeBord`, `Personnage`/`Quiz` et `Quiz`/`Question` traduisent le fait que ces objets n'ont pas de sens hors du contexte qui les contient : un badge n'existe pas indépendamment du joueur qui l'a obtenu, une question n'existe pas indépendamment du quiz auquel elle appartient. Les relations en association simple (`-->`), comme entre `Joueur` et `Personnage` choisi, ou `Quete` et `Personnage` concerné, indiquent au contraire une référence entre deux objets qui peuvent exister indépendamment l'un de l'autre.

### Couche UI alignée sur le parcours utilisateur

Les classes `EcranSelection`, `EcranCarte` et `EcranDialogue` correspondent terme à terme aux trois grandes étapes du parcours décrites dans commentcafonctionne.md (sélection du personnage, navigation sur la carte, dialogue avec un intervenant). Chacune dépend du domaine (`Jeu`) et, le cas échéant, d'un service via son interface, jamais d'une implémentation concrète, ce qui garantit que l'UI reste interchangeable sans modifier la logique métier.

```mermaid
classDiagram
    %% ===== DOMAINE =====
    class Jeu {
        -joueur: Joueur
        -personnages: Personnage[]
        -quetes: Quete[]
        +commencer(personnageId: string) void
        +selectionnerPersonnage(id: string) Personnage
        +parlerA(personnageId: string) Quiz
        +repondre(quizId: string, reponseId: string) boolean
        +validerQuete(queteId: string) void
        +estTermine() boolean
    }

    class Joueur {
        -xp: number
        -niveau: number
        -badges: Badge[]
        -personnageChoisi: Personnage
        -carnetDeBord: CarnetDeBord
        +gagnerXp(montant: number) void
        +ajouterBadge(badge: Badge) void
        +changerPersonnage(personnage: Personnage) void
    }

    class Personnage {
        -id: string
        -nom: string
        -metier: string
        -secteur: string
        -position: Position
        -quiz: Quiz
        -videoIntro: string
        -dejaRencontre: boolean
        +getQuiz() Quiz
    }

    class Quete {
        -id: string
        -personnageId: string
        -objectif: string
        -etat: EtatQuete
        +valider() void
        +estAccomplie() boolean
    }

    class Quiz {
        -id: string
        -questions: Question[]
        +verifierReponse(questionId: string, reponseId: string) boolean
        +estComplet() boolean
    }

    class Question {
        -id: string
        -texte: string
        -reponses: Reponse[]
        -bonneReponseId: string
    }

    class Reponse {
        -id: string
        -texte: string
    }

    class CarnetDeBord {
        -metiersDecouverts: string[]
        -progression: number
        +ajouterMetier(metier: string) void
        +getProgression() number
    }

    class Badge {
        -id: string
        -nom: string
        -personnageId: string
    }

    class Position {
        -lat: number
        -lng: number
    }

    class EtatQuete {
        <<enumeration>>
        NON_COMMENCEE
        EN_COURS
        ACCOMPLIE
    }

    %% ===== SERVICES =====
    class ICarte {
        <<interface>>
        +afficherMarqueur(personnage: Personnage) void
        +centrerSur(position: Position) void
        +marquerAccompli(personnageId: string) void
    }

    class Carte {
        -instanceLeaflet: any
        +afficherMarqueur(personnage: Personnage) void
        +centrerSur(position: Position) void
        +marquerAccompli(personnageId: string) void
    }

    class IAudio {
        <<interface>>
        +jouerMusique(piste: string) void
        +couper() void
    }

    class Audio {
        -contexte: AudioContext
        +jouerMusique(piste: string) void
        +couper() void
    }

    class IVideo {
        <<interface>>
        +lire(source: string) void
        +passer() void
    }

    class Video {
        -element: HTMLVideoElement
        +lire(source: string) void
        +passer() void
    }

    %% ===== UI =====
    class EcranSelection {
        -jeu: Jeu
        +afficherPersonnages() void
        +onChoixPersonnage(id: string) void
    }

    class EcranCarte {
        -jeu: Jeu
        -carte: ICarte
        +afficherCarte() void
        +onClicPersonnage(id: string) void
        +afficherQueteActuelle() void
    }

    class EcranDialogue {
        -jeu: Jeu
        -video: IVideo
        +afficherDialogue(personnage: Personnage) void
        +afficherQuiz(quiz: Quiz) void
        +onReponseChoisie(reponseId: string) void
    }

    %% ===== RELATIONS =====
    Jeu "1" *-- "1" Joueur : possède
    Jeu "1" *-- "*" Personnage : gère
    Jeu "1" *-- "*" Quete : gère
    Joueur "1" *-- "*" Badge : collectionne
    Joueur "1" *-- "1" CarnetDeBord : possède
    Joueur "1" --> "0..1" Personnage : a choisi
    Personnage "1" *-- "1" Quiz : possède
    Personnage "1" *-- "1" Position : a une
    Quiz "1" *-- "*" Question : contient
    Question "1" *-- "*" Reponse : propose
    Quete "1" --> "1" Personnage : concerne
    Quete --> EtatQuete : a un

    Carte ..|> ICarte : implémente
    Audio ..|> IAudio : implémente
    Video ..|> IVideo : implémente

    EcranSelection --> Jeu : utilise
    EcranCarte --> Jeu : utilise
    EcranCarte --> ICarte : utilise
    EcranDialogue --> Jeu : utilise
    EcranDialogue --> IVideo : utilise
    ```