01/07/2026
Migration effectuée
✅ J’ai transposé l’ancien site vers le nouveau projet Vite dans RouteDeRome.

Changements réalisés
index.html

remplaçant du starter Vite avec la page d’accueil La Route du Rome
ajout du CSS Leaflet et de la police Google
chargement des scripts et assets dans public/
src/main.ts

import des données HEROES et INTRO_NPCS
reprise du comportement de lancement / dialogue / popup / redirection vers jeu.html
utilisation de TypeScript forte avec gestion d’erreurs
src/style.css

remplacé par le CSS de l’ancien site pour retrouver le style professionnel
gestion responsive tablette incluse
public/

import des dossiers assets/img, assets/sounds, assets/videos
copie de jeu.html, jeu.css, jeu.js depuis l’ancien site
Validation
npm run build est passé avec succès
Le nouveau format est maintenant fonctionnel et compile, tout en préservant l’interface et les contenus de l’ancien site


on as rendu le code dégueu avec vite maintenant il faut continuer de transposer le html/css/js vers le node.js/ts/vite

bug repérés après modification: impossible de passer a jeu.html ou de passer l'animation 