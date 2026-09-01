# Checklist PWA - La Route du Rome

## ✅ Configuration complétée

- [x] Manifest.json créé avec descriptions et icônes
- [x] Service Worker implémenté avec stratégies de cache
- [x] Métadonnées PWA ajoutées à index.html
- [x] Configuration Apache (.htaccess)
- [x] Configuration Nginx (nginx.conf)
- [x] Configuration Vite (vite.config.ts)
- [x] Configuration Vercel (vercel.json)
- [x] Configuration Netlify (netlify.toml)
- [x] Enregistrement du Service Worker en JavaScript
- [x] Support Safari/iOS (Apple meta tags)
- [x] Support Windows (browserconfig.xml)

## ⚠️ À faire avant le déploiement

### 1. Créer/Ajouter les fichiers icônes
Créer les fichiers PNG suivants dans `/public` :
- [ ] `icon-192.png` - 192x192 pixels (icône standard)
- [ ] `icon-512.png` - 512x512 pixels (icône large)
- [ ] `icon-192-maskable.png` - 192x192 pixels avec padding (pour adaptative icons Android)
- [ ] `icon-512-maskable.png` - 512x512 pixels avec padding (pour adaptative icons Android)

**Recommandations** :
- Format PNG avec transparence
- Les icônes maskable doivent avoir du padding (au moins 20% de la taille)
- Utiliser un fond qui correspond au thème (#1D1E3C)

### 2. Mettre à jour les icônes existantes (le cas échéant)
- [ ] Remplacer/ajouter `favicon.svg` si nécessaire
- [ ] Créer `favicon.ico` si les navigateurs anciens la demandent

### 3. Tester la PWA localement
```bash
# 1. Build l'application
npm run build

# 2. Servir la build
npm run preview

# 3. Tester dans Chrome DevTools
# - F12 → Application → Manifest
# - F12 → Application → Service Workers
# - Vérifier que l'app est installable
```

### 4. Configurer le serveur pour HTTPS
- [ ] Obtenir un certificat SSL/TLS
- [ ] Configurer le serveur pour utiliser HTTPS
- [ ] Tester le renouvellement automatique du certificat

### 5. Déployer et tester
- [ ] Déployer l'application en HTTPS
- [ ] Tester l'installation sur plusieurs navigateurs
- [ ] Tester le fonctionnement offline
- [ ] Tester sur plusieurs appareils (téléphones, tablettes)

### 6. Validation
- [ ] Utiliser PWA Builder (https://www.pwabuilder.com/)
- [ ] Vérifier les critères Google Play (https://web.dev/installable-web-apps/)
- [ ] Valider avec Lighthouse (Chrome DevTools)

## Fichiers PWA créés

```
/public
  ├── manifest.json           # Configuration PWA
  ├── sw.js                   # Service Worker
  ├── browserconfig.xml       # Config Windows
  ├── icon-192.png           # À créer
  ├── icon-512.png           # À créer
  ├── icon-192-maskable.png  # À créer
  └── icon-512-maskable.png  # À créer

/
  ├── index.html             # Mis à jour avec meta tags et SW registration
  ├── vite.config.ts         # Configuration Vite
  ├── .htaccess              # Configuration Apache
  ├── nginx.conf             # Configuration Nginx
  ├── vercel.json            # Configuration Vercel
  ├── netlify.toml           # Configuration Netlify
  └── PWA_SETUP.md           # Documentation
```

## Options d'hébergement

### Pour développement local
```bash
npm run dev
# Accès : http://localhost:5173
```

### Pour production
- **Vercel** : Déploiement automatique avec vercel.json
- **Netlify** : Déploiement automatique avec netlify.toml
- **Apache** : Utiliser .htaccess avec VirtualHost en HTTPS
- **Nginx** : Adapter nginx.conf à votre configuration

## Points clés à retenir

1. **HTTPS obligatoire** : La PWA ne fonctionne que sur HTTPS (sauf en localhost)
2. **Service Worker** : Vérifié au chargement pour les mises à jour
3. **Manifest.json** : Les icônes sont essentielles
4. **Cache strategy** : 
   - Assets statiques : Cache first
   - Pages dynamiques : Network first
5. **Offline support** : L'app fonctionne avec les données en cache

## Support navigateur pour PWA

| Fonctionnalité | Chrome | Edge | Firefox | Safari |
|---|---|---|---|---|
| Installation | ✅ | ✅ | ✅ | ✅ iOS 15+ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |
| Manifest | ✅ | ✅ | ✅ | ⚠️ partiel |
| Offline | ✅ | ✅ | ✅ | ⚠️ limité |

## Ressources utiles

- [Web.dev - PWA](https://web.dev/progressive-web-apps/)
- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [PWA Builder](https://www.pwabuilder.com/)
- [Service Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
