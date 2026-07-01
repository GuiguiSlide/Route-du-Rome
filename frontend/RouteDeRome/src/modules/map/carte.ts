import { Personnage } from '../game/Personnage'
import { Position } from '../game/types/Position'

export interface CarteInterface {
  afficherMarqueur(personnage: Personnage): void
  centrerSur(position: Position): void
  marquerAccompli(personnageId: string): void
}

export class Carte implements CarteInterface {
  public afficherMarqueur(personnage: Personnage): void {
    console.log('Afficher marqueur pour', personnage.id)
  }

  public centrerSur(position: Position): void {
    console.log('Centrer la carte sur', position)
  }

  public marquerAccompli(personnageId: string): void {
    console.log('Marquer accompli', personnageId)
  }
}
