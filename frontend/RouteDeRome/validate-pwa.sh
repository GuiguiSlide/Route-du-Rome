#!/bin/bash

# Script de test et validation PWA pour La Route du Rome
# Usage: bash validate-pwa.sh

echo "🚀 Validation PWA - La Route du Rome"
echo "======================================"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0

# Fonction pour afficher les résultats
check() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
  else
    echo -e "${RED}✗${NC} $1"
    ((FAILED++))
  fi
}

# Test 1: Vérifier la présence de manifest.json
echo -e "\n${BLUE}📋 Fichiers de configuration${NC}"
if [ -f "public/manifest.json" ]; then
  echo -e "${GREEN}✓${NC} manifest.json trouvé"
  ((PASSED++))
else
  echo -e "${RED}✗${NC} manifest.json manquant"
  ((FAILED++))
fi

# Test 2: Vérifier la présence du Service Worker
if [ -f "public/sw.js" ]; then
  echo -e "${GREEN}✓${NC} Service Worker (sw.js) trouvé"
  ((PASSED++))
else
  echo -e "${RED}✗${NC} Service Worker manquant"
  ((FAILED++))
fi

# Test 3: Vérifier browserconfig.xml
if [ -f "public/browserconfig.xml" ]; then
  echo -e "${GREEN}✓${NC} browserconfig.xml trouvé"
  ((PASSED++))
else
  echo -e "${RED}✗${NC} browserconfig.xml manquant"
  ((FAILED++))
fi

# Test 4: Vérifier index.html contient le manifest
echo -e "\n${BLUE}🌐 Configuration HTML${NC}"
if grep -q 'manifest.json' index.html; then
  echo -e "${GREEN}✓${NC} Lien vers manifest.json présent"
  ((PASSED++))
else
  echo -e "${RED}✗${NC} Lien vers manifest.json absent"
  ((FAILED++))
fi

# Test 5: Vérifier Service Worker registration
if grep -q 'navigator.serviceWorker.register' index.html; then
  echo -e "${GREEN}✓${NC} Enregistrement du Service Worker présent"
  ((PASSED++))
else
  echo -e "${RED}✗${NC} Enregistrement du Service Worker absent"
  ((FAILED++))
fi

# Test 6: Vérifier les meta tags PWA
if grep -q 'apple-mobile-web-app-capable' index.html; then
  echo -e "${GREEN}✓${NC} Meta tags PWA présents"
  ((PASSED++))
else
  echo -e "${RED}✗${NC} Meta tags PWA absents"
  ((FAILED++))
fi

# Test 7: Vérifier les icônes
echo -e "\n${BLUE}🎨 Icônes d'application${NC}"
ICONS_NEEDED=("icon-192.png" "icon-512.png" "icon-192-maskable.png" "icon-512-maskable.png")
ICONS_FOUND=0

for icon in "${ICONS_NEEDED[@]}"; do
  if [ -f "public/$icon" ]; then
    echo -e "${GREEN}✓${NC} $icon trouvé"
    ((ICONS_FOUND++))
    ((PASSED++))
  else
    echo -e "${YELLOW}⚠${NC} $icon manquant (optionnel mais recommandé)"
    # Pas d'incrément de FAILED car les icônes peuvent être générées
  fi
done

# Test 8: Vérifier package.json
echo -e "\n${BLUE}📦 Configuration Node.js${NC}"
if grep -q '"name": "routederome"' package.json; then
  echo -e "${GREEN}✓${NC} Nom du package correct"
  ((PASSED++))
else
  echo -e "${RED}✗${NC} Nom du package incorrect"
  ((FAILED++))
fi

if grep -q '"build": "tsc && vite build"' package.json; then
  echo -e "${GREEN}✓${NC} Script build configuré"
  ((PASSED++))
else
  echo -e "${RED}✗${NC} Script build manquant"
  ((FAILED++))
fi

# Test 9: Vérifier la syntaxe JSON du manifest
echo -e "\n${BLUE}✔️ Validation JSON${NC}"
if command -v jq &> /dev/null; then
  if jq empty public/manifest.json 2>/dev/null; then
    echo -e "${GREEN}✓${NC} manifest.json JSON valide"
    ((PASSED++))
  else
    echo -e "${RED}✗${NC} manifest.json JSON invalide"
    ((FAILED++))
  fi
else
  echo -e "${YELLOW}⚠${NC} jq non installé, validation JSON ignorée"
fi

# Résumé
echo -e "\n${BLUE}📊 Résumé${NC}"
echo "======================================"
echo -e "${GREEN}Réussis: $PASSED${NC}"
echo -e "${RED}Échoués: $FAILED${NC}"

if [ $FAILED -eq 0 ]; then
  echo -e "\n${GREEN}✓ PWA prête pour le déploiement!${NC}"
  
  echo -e "\n${BLUE}Prochaines étapes:${NC}"
  echo "1. Générer les icônes si manquantes"
  echo "2. Tester localement: npm run dev"
  echo "3. Builder: npm run build"
  echo "4. Valider avec: npm run preview"
  echo "5. Vérifier dans Chrome DevTools (F12 → Application)"
  echo "6. Déployer en HTTPS"
  exit 0
else
  echo -e "\n${RED}✗ Veuillez corriger les erreurs PWA${NC}"
  exit 1
fi
