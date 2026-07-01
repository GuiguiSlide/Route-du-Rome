export function sauvegarderProgression(cle: string, valeur: unknown): void {
  localStorage.setItem(cle, JSON.stringify(valeur))
}

export function chargerProgression<T>(cle: string): T | null {
  const item = localStorage.getItem(cle)
  return item ? (JSON.parse(item) as T) : null
}
