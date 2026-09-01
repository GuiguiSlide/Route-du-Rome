// Classe représentant le carnet de bord du joueur
// Gère le suivi des métiers découverts et la progression du joueur

export class CarnetDeBord {
  // Liste des métiers découverts par le joueur
  private readonly metiersDecouverts: string[] = [];
  // Nombre total de métiers à découvrir
  private readonly totalMetiers: number;

  // Initialise le carnet avec le nombre total de métiers attendus
  constructor(totalMetiers: number) {
    this.totalMetiers = totalMetiers;
  }

  // Ajoute un métier à la liste des métiers découverts (sans doublon)
  ajouterMetier(metier: string): void {
    if (!this.metiersDecouverts.includes(metier)) {
      this.metiersDecouverts.push(metier);
    }
  }

  // Retourne une copie read-only de la liste des métiers découverts
  getMetiersDecouverts(): readonly string[] {
    return [...this.metiersDecouverts];
  }

  // Calcule la progression : ratio de métiers découverts par rapport au total
  getProgression(): number {
    if (this.totalMetiers === 0) return 0;
    return this.metiersDecouverts.length / this.totalMetiers;
  }

  // Vérifie si un métier spécifique a déjà été découvert
  aDecouvert(metier: string): boolean {
    return this.metiersDecouverts.includes(metier);
  }
}