import { Badge } from './Badge'

export interface JoueurState {
  xp: number;
  niveau: number;
  badges: Badge[];
  personnageChoisiId: string | null;
}

export class Joueur {
  private state: JoueurState = {
    xp: 0,
    niveau: 1,
    badges: [],
    personnageChoisiId: null,
  }

  public gagnerXp(valeur: number): void {
    this.state.xp += valeur
  }

  public ajouterBadge(badge: Badge): void {
    this.state.badges.push(badge)
  }

  public getState(): JoueurState {
    return { ...this.state, badges: [...this.state.badges] }
  }
}
