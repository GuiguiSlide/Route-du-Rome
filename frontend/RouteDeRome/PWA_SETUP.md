# Guide d'installation PWA - La Route du Rome

## Configuration Progressive Web App (PWA)

L'application **La Route du Rome** est maintenant configurée en tant que Progressive Web App installable. Cela signifie qu'elle peut être installée sur n'importe quel appareil (téléphone, tablette, ordinateur) et fonctionner comme une application native.

## Fichiers PWA créés

### 1. **manifest.json** (`/public/manifest.json`)
Fichier de configuration principal de la PWA qui déclare :
- Le nom et la description de l'application
- L'affichage en mode "standalone" (sans barre du navigateur)
- Les icônes de l'application (192x192 et 512x512)
- Le thème de couleur (#1D1E3C)
- Les raccourcis pour lancer directement avec Élio ou Élia

### 2. **Service Worker** (`/public/sw.js`)
Script qui s'exécute en arrière-plan et fournit :
- **Mise en cache** : Les assets statiques sont mis en cache pour un chargement plus rapide
- **Support offline** : L'application fonctionne sans connexion Internet (avec les données en cache)
- **Stratégie de cache** :
  - Assets statiques (CSS, JS, images) : Cache first (cache prioritaire)
  - Pages dynamiques : Network first (réseau prioritaire)

### 3. **Configuration HTML** (mise à jour de `index.html`)
Ajout de :
- Métadonnées pour les applications mobiles (Apple, Microsoft)
- Lien vers le manifest.json
- Icônes d'application pour différentes plateformes
- Script d'enregistrement du Service Worker

### 4. **Configuration navigateur** (`/public/browserconfig.xml`)
Configuration pour Windows :
- Couleur de la tuile (tile) Windows
- Support des notifications

## Comment installer l'application

### Sur navigateur Desktop (Chrome, Edge, Brave, Vivaldi)
1. Accédez à l'application dans le navigateur
2. Cliquez sur le bouton **"Installer"** dans la barre d'adresse (ou menu)
3. L'application apparaîtra dans vos applications installées

### Sur mobile Android (Chrome, Brave, Edge)
1. Ouvrez l'application dans le navigateur
2. Tapez le menu (⋮) → **"Installer l'app"**
3. L'application s'ajoutera à votre écran d'accueil

### Sur iOS (Safari)
1. Ouvrez l'application dans Safari
2. Tapez le bouton de partage (↗️)
3. Sélectionnez **"Sur l'écran d'accueil"**
4. Choisissez un nom et confirmez

## Fonctionnement offline

Après la première visite de l'application :
- Les assets (CSS, JS, images) sont mis en cache
- L'application peut être lancée sans Internet
- Les nouvelles données seront synchronisées au retour de la connexion

## Vérification du déploiement

Le Service Worker et le manifest.json doivent être accessibles à ces URL :
- `https://votre-domaine.com/manifest.json`
- `https://votre-domaine.com/sw.js`

## Configuration HTTPS requise

Pour que l'installation PWA fonctionne, **l'application DOIT être servie en HTTPS** (sauf en localhost pour le développement).

## Mise à jour de l'application

Le Service Worker vérifie les mises à jour automatiquement :
- Une vérification est effectuée au chargement
- Les mises à jour sont téléchargées en arrière-plan
- Au rechargement suivant, la version mise à jour sera utilisée

## Icônes manquantes à ajouter

Pour une installation optimale, ajoutez ces fichiers icônes au dossier `/public` :
- `/public/icon-192.png` - Icône 192x192px
- `/public/icon-512.png` - Icône 512x512px (screenshot)
- `/public/icon-192-maskable.png` - Icône adaptable 192x192px
- `/public/icon-512-maskable.png` - Icône adaptable 512x512px

Les icônes "maskable" permettent une meilleure intégration sur les appareils qui appliquent des formes personnalisées aux icônes d'application.

## Test en développement

```bash
# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Servir la build en local
npm run preview
```

## Conformité aux standards

L'application respecte les critères d'installation PWA du Web.dev :
✅ HTTPS (requis en production)
✅ Manifest.json valide
✅ Service Worker fonctionnel
✅ Icônes d'application
✅ Métadonnées appropriées
✅ Responsive design

## Support navigateurs

| Navigateur | Desktop | Mobile |
|-----------|---------|--------|
| Chrome | ✅ | ✅ |
| Edge | ✅ | ✅ |
| Firefox | ✅ | ✅ (partiel) |
| Safari | ⚠️ (limité) | ✅ (iOS 15+) |
| Brave | ✅ | ✅ |

## En cas de problème

1. Vérifier que l'application est en HTTPS
2. Ouvrir les DevTools (F12) → Application → Service Workers
3. Vérifier que le Service Worker est "activated and running"
4. Vider le cache et recharger la page
