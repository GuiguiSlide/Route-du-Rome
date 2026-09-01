// Module pour la gestion du stockage local du navigateur
// Enregistre et récupère les données persistantes du joueur

const HERO_STORAGE_KEY = "rdr_hero";

// Enregistre l'ID du héros sélectionné dans le stockage local
export function saveSelectedHero(key: string): void {
  try {
    localStorage.setItem(HERO_STORAGE_KEY, key);
  } catch {
    // stockage indisponible (navigation privée, quota...) : on ignore
  }
}

// Récupère l'ID du héros précédemment sélectionné
export function getSelectedHero(): string | null {
  try {
    return localStorage.getItem(HERO_STORAGE_KEY);
  } catch {
    return null;
  }
}