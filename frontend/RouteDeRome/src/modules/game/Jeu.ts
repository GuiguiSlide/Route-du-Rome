export interface JeuState {
  personnageSelectionneId: string | null;
  quetesAccomplies: string[];
  xp: number;
}

export class Jeu {
  private state: JeuState = {
    personnageSelectionneId: null,
    quetesAccomplies: [],
    xp: 0,
  }

  public selectionnerPersonnage(id: string): void {
    this.state.personnageSelectionneId = id
  }

  public getState(): JeuState {
    return { ...this.state }
  }
}
