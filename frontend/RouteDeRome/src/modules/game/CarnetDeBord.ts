export class CarnetDeBord {
  private metiersDecouverts: string[] = []

  public ajouterMetier(metier: string): void {
    if (!this.metiersDecouverts.includes(metier)) {
      this.metiersDecouverts.push(metier)
    }
  }

  public getProgression(): number {
    return this.metiersDecouverts.length
  }

  public getMetiers(): string[] {
    return [...this.metiersDecouverts]
  }
}
