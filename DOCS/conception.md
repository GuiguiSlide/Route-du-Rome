# Projet

- Nom : Route du Rome
- Contexte : La Route du Rome est un jeu sérieux pour France Travail (35) qui fait découvrir les métiers du département via un guide, une carte interactive et des quiz vidéo, avec un système d'XP et de badges.
- Objectif : conserver le fonctionnement validé par le commanditaire tout en refondant techniquement l'application pour la rendre professionnelle.

> Important : aucune nouvelle fonctionnalité et aucun changement visible pour l'utilisateur final. Le comportement doit rester strictement identique à l'existant.

## Documentation de conception

- `arborescence.md`
- `commentcafonctionne.md`

## Analyse des problèmes

- Le code existant a été généré de manière artisanale et nécessite une refactorisation complète.
- Le projet doit être migré vers `npm` et `Vite` pour disposer d'un outillage moderne et de tests.
- La solution doit utiliser TypeScript pour typer les objets métier tout en restant légère.
- Il n'y a pas besoin de base de données : les données restent statiques et le backend n'est pas nécessaire.
