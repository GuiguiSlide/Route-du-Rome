# Objectifs et contraintes

## Objectifs

### Objectif général
Refondre techniquement *La Route du Rome* pour la rendre professionnelle (maintenable, évolutive, sécurisée, testable) sans en modifier le fonctionnement ni l'expérience utilisateur. Le fond de l'application est déjà validé par le commanditaire : seule la forme technique est concernée.

### Objectifs qualité
- **Maintenabilité** : sortir du code monolithique (deux pages HTML, CSS/JS en ligne) pour une architecture en couches claires
- **Évolutivité** : permettre l'ajout futur de fonctionnalités sans réécriture massive
- **Sécurité** : éliminer les pratiques à risque héritées du code généré par IA
- **Testabilité** : isoler la logique métier (XP, niveaux, badges, progression des quêtes) du DOM pour permettre des tests unitaires
- **Compatibilité** : rendre l'application utilisable sur mobile et tablette
- **Installabilité** : transformer l'application en PWA (manifest + service worker)

### Non-régression (objectif transversal)
Le comportement de l'application doit rester strictement identique à l'existant (cf. commentcafonctionne.md) : aucune nouvelle fonctionnalité, aucun changement visible pour l'utilisateur final.

## Contraintes

### Contraintes techniques
- Migration vers **TypeScript** pour typer les objets du domaine sans alourdir une application qui doit rester légère
- Mise en place d'un environnement **npm + Vite** pour disposer d'un outillage de build et de test
- **Pas de base de données** : les données (personnages, quiz) restent statiques, donc **pas de backend nécessaire**
- Architecture cible en couches (cf. arborescence.md) :
  - `domaine/` : logique métier pure, testable sans DOM (Jeu, Joueur, Personnage, Quete, Quiz, CarnetDeBord)
  - `services/` : accès au monde extérieur derrière des interfaces (Carte/Leaflet, Audio, Video)
  - `ui/` : écrans qui relient le DOM au domaine
  - `donnees/` : données des personnages et quiz

### Contraintes de périmètre
- Reprise à l'identique du parcours utilisateur existant : sélection du personnage, vidéo d'introduction, alerte de démarrage, carte interactive, dialogues, questions, vidéos, validation de quête (XP + badge), écran de fin
- Aucune évolution fonctionnelle ni visuelle tant que la refonte n'est pas validée

### Contraintes de réalisation
- Refactorisation complète du code existant (généré par IA, sans tests ni structure)
- Le commanditaire ayant déjà validé le fond, ce projet ne porte que sur la qualité technique