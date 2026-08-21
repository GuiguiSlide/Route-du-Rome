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

  commencer(): void {
    if (this.etat === EtatQuete.NON_COMMENCEE) {
      this.etat = EtatQuete.EN_COURS;
    }
  }

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