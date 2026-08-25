import { EtatQuete } from "./types/EtatQuete";
import { Personnage } from "./Personnage";

export class Quete {
  readonly id: string;
  readonly personnage: Personnage;
  readonly objectif: string;
  private etat: EtatQuete = EtatQuete.NON_COMMENCEE;

  constructor(id: string, personnage: Personnage, objectif: string) {
    this.id = id;
    this.personnage = personnage;
    this.objectif = objectif;
  }

  // Une quête ne passe à EN_COURS qu'au premier dialogue avec son personnage.
  commencer(): void {
    if (this.etat === EtatQuete.NON_COMMENCEE) {
      this.etat = EtatQuete.EN_COURS;
    }
  }

  // La validation est appelée par Jeu après la fin du quiz.
  valider(): void {
    this.etat = EtatQuete.ACCOMPLIE;
  }

  estAccomplie(): boolean {
    return this.etat === EtatQuete.ACCOMPLIE;
  }

  getEtat(): EtatQuete {
    return this.etat;
  }
}