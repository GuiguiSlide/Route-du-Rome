const HERO_STORAGE_KEY = "rdr_hero";

export function saveSelectedHero(key: string): void {
  try {
    localStorage.setItem(HERO_STORAGE_KEY, key);
  } catch {
    // stockage indisponible (navigation privée, quota...) : on ignore
  }
}

export function getSelectedHero(): string | null {
  try {
    return localStorage.getItem(HERO_STORAGE_KEY);
  } catch {
    return null;
  }
}