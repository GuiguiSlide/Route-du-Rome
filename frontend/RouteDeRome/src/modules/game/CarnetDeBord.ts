export class CarnetDeBord {
  private readonly metiersDecouverts: string[] = [];
  private readonly totalMetiers: number;

  constructor(totalMetiers: number) {
    this.totalMetiers = totalMetiers;
  }

  ajouterMetier(metier: string): void {
    if (!this.metiersDecouverts.includes(metier)) {
      this.metiersDecouverts.push(metier);
    }
  }

  getMetiersDecouverts(): readonly string[] {
    return [...this.metiersDecouverts];
  }

  getProgression(): number {
    if (this.totalMetiers === 0) return 0;
    return this.metiersDecouverts.length / this.totalMetiers;
  }

  aDecouvert(metier: string): boolean {
    return this.metiersDecouverts.includes(metier);
  }
}