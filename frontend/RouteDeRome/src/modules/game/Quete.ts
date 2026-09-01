// Classe représentant une quête du jeu
// Une quête est associée à un personnage professionnel et passe par plusieurs états

import { EtatQuete } from "./types/EtatQuete";
import { Personnage } from "./Personnage";

export class Quete {
  readonly id: string;
  readonly personnage: Personnage;
  readonly objectif: string;
  // État actuel de la quête
  private etat: EtatQuete = EtatQuete.NON_COMMENCEE;

  // Initialise une quête avec un ID, le personnage associé et un objectif
  constructor(id: string, personnage: Personnage, objectif: string) {
    this.id = id;
    this.personnage = personnage;
    this.objectif = objectif;
  }

  // Enregistre le début de la quête
  // Une quête ne passe à EN_COURS qu'au premier dialogue avec son personnage.
  commencer(): void {
    if (this.etat === EtatQuete.NON_COMMENCEE) {
      this.etat = EtatQuete.EN_COURS;
    }
  }

  // Valide la quête comme accomplie
  // La validation est appelée par Jeu après la fin du quiz.
  valider(): void {
    this.etat = EtatQuete.ACCOMPLIE;
  }

  // Vérifie si la quête est accomplie
  estAccomplie(): boolean {
    return this.etat === EtatQuete.ACCOMPLIE;
  }

  // Retourne l'état actuel de la quête
  getEtat(): EtatQuete {
    return this.etat;
  }
}