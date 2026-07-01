import type { EtatQuete } from './types/EtatQuete'

export interface QueteProps {
  id: string;
  personnageId: string;
  objectif: string;
}

const ETAT_NON_COMMENCEE: EtatQuete = 'NON_COMMENCEE'
const ETAT_ACCOMPLIE: EtatQuete = 'ACCOMPLIE'

export class Quete {
  public readonly id: string
  public readonly personnageId: string
  public readonly objectif: string
  private etat: EtatQuete = ETAT_NON_COMMENCEE

  constructor(props: QueteProps) {
    this.id = props.id
    this.personnageId = props.personnageId
    this.objectif = props.objectif
  }

  public valider(): void {
    this.etat = ETAT_ACCOMPLIE
  }

  public estAccomplie(): boolean {
    return this.etat === ETAT_ACCOMPLIE
  }
}
