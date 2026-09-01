# 🚀 La Route du Rome - Progressive Web App

Une application web pédagogique installable pour découvrir les métiers de l'Ille-et-Vilaine.

## ✨ Fonctionnalités

- 📱 **Installable** : Installez l'app sur votre téléphone, tablette ou ordinateur
- 🌐 **Offline-ready** : Fonctionne sans connexion Internet
- ⚡ **Rapide** : Chargement instantané grâce au cache
- 🎮 **Interactive** : Découvrez les métiers à travers une aventure immersive
- 🎥 **Vidéos** : Rencontrez les professionnels du 35
- 📊 **Progressive** : Améliorations continues et mises à jour automatiques

## 📋 Prérequis

- Node.js 16+ 
- npm ou yarn
- Navigateur moderne (Chrome, Edge, Brave, Firefox)

## 🛠️ Installation

1. Clonez le dépôt :
```bash
cd frontend/RouteDeRome
```

2. Installez les dépendances :
```bash
npm install
```

## 🚀 Développement

### Lancer le serveur de développement
```bash
npm run dev
```
L'application sera disponible sur `http://localhost:5173`

### Compiler TypeScript
```bash
tsc
```

### Tester le build
```bash
npm run build
npm run preview
```

## 🔧 Configuration PWA

L'application est configurée en tant que Progressive Web App avec :

- **manifest.json** : Configuration d'installation
- **Service Worker** : Support offline et caching intelligent
- **Métadonnées** : Intégration système (iOS, Android, Windows)

### Générer les icônes PWA

Les icônes d'application sont nécessaires pour une installation optimale. Créez-les :

```bash
# Option 1 : Utiliser un générateur en ligne
# https://www.pwabuilder.com/
# https://realfavicongenerator.net/

# Option 2 : Utiliser ImageMagick
convert logo.png -resize 192x192 public/icon-192.png
convert logo.png -resize 512x512 public/icon-512.png
convert logo.png -resize 192x192 public/icon-192-maskable.png
convert logo.png -resize 512x512 public/icon-512-maskable.png
```

### Valider la configuration PWA

```bash
# Valider tous les fichiers PWA
bash validate-pwa.sh

# Ou manuellement :
# 1. Lancer npm run preview
# 2. Ouvrir Chrome DevTools (F12)
# 3. Aller à Application → Manifest
# 4. Aller à Application → Service Workers
# 5. Cliquer sur "Install" (bouton dans la barre d'adresse)
```

## 📦 Build pour production

```bash
npm run build
```

Cela crée un dossier `dist/` contenant l'application prête à être déployée.

## 🌐 Déploiement

### Vercel (recommandé pour PWA)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Serveur personnalisé (Apache)
```bash
# 1. Assurez-vous que HTTPS est activé
# 2. Copiez .htaccess à la racine du site
# 3. Téléchargez le contenu de dist/
# 4. Vérifiez que mod_rewrite et mod_headers sont activés
```

### Serveur personnalisé (Nginx)
```bash
# 1. Utilisez la configuration nginx.conf
# 2. Adaptez les chemins à votre système
# 3. Recharger Nginx : sudo systemctl reload nginx
```

## ⚙️ Configuration par plateforme

### Fichiers de configuration créés :
- `.htaccess` - Configuration Apache (SPA + headers cache + sécurité)
- `nginx.conf` - Configuration Nginx (router SPA + headers)
- `vite.config.ts` - Configuration Vite (build optimization)
- `vercel.json` - Configuration Vercel (auto-deploy)
- `netlify.toml` - Configuration Netlify (auto-deploy)

## 📚 Documentation

- [PWA_SETUP.md](./PWA_SETUP.md) - Guide complet de la configuration PWA
- [PWA_CHECKLIST.md](./PWA_CHECKLIST.md) - Checklist avant le déploiement
- [DOCS/](../DOCS/) - Documentation du projet

## 🧪 Tests

### Tests unitaires
```bash
npm test
```

### Lighthouse (Performance & PWA)
```bash
# Dans Chrome DevTools (F12 → Lighthouse)
# Ou utiliser le CLI :
npm install -g @lighthouse/cli
lighthouse https://votre-url --view
```

## 🔐 Sécurité

L'application inclut les en-têtes de sécurité suivants :
- CSP (Content Security Policy)
- X-Frame-Options (SAMEORIGIN)
- X-Content-Type-Options (nosniff)
- X-XSS-Protection
- CORS pour les polices

## 📱 Support multi-plateforme

| Plateforme | Installation | Offline | Notes |
|---|---|---|---|
| **Android** | ✅ Chrome/Edge | ✅ | Icône + raccourcis |
| **iOS** | ✅ Safari 15+ | ⚠️ Limité | Via "Sur l'écran d'accueil" |
| **Windows** | ✅ Chrome/Edge | ✅ | Tuile + menu démarrer |
| **macOS** | ✅ Chrome/Edge/Safari | ✅ | Dock + Applications |
| **Linux** | ✅ Chrome/Firefox | ✅ | Lanceur d'applications |

## 🚨 Dépannage

### L'app ne s'installe pas
- ✅ Vérifiez que vous êtes en **HTTPS** (sauf localhost)
- ✅ Vérifiez le manifest.json est valide : `npm run preview` → F12 → Application
- ✅ Vérifiez que le Service Worker est activé

### Service Worker ne se met pas à jour
- Videz le cache : `npm run preview` → F12 → Storage → Clear site data
- Forcez la mise à jour : `chrome://serviceworker-internals/`

### L'app ne fonctionne pas offline
- Vérifiez que les assets sont bien cachés
- Vérifiez la console pour les erreurs de Service Worker
- Vérifiez que vous avez visité l'app avant (cache doit être rempli)

## 📞 Support

Pour plus d'informations :
- [Web.dev - PWA](https://web.dev/progressive-web-apps/)
- [MDN - Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Builder](https://www.pwabuilder.com/)

## 📄 Licence

MIT

## 🎯 Roadmap

- [ ] Support hors ligne amélioré
- [ ] Synchronisation de données en arrière-plan
- [ ] Notifications push
- [ ] Mode sombre
- [ ] Multi-langue

---

**Made with ❤️ for education - France Travail 35**
