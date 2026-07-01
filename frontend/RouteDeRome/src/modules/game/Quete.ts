import { EtatQuete } from './types/EtatQuete'

export interface QueteProps {
  id: string;
  personnageId: string;
  objectif: string;
}

export class Quete {
  public readonly id: string
  public readonly personnageId: string
  public readonly objectif: string
  private etat: EtatQuete = EtatQuete.NON_COMMENCEE

  constructor(props: QueteProps) {
    this.id = props.id
    this.personnageId = props.personnageId
    this.objectif = props.objectif
  }

  public valider(): void {
    this.etat = EtatQuete.ACCOMPLIE
  }

  public estAccomplie(): boolean {
    return this.etat === EtatQuete.ACCOMPLIE
  }
}
