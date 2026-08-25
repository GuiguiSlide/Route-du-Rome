import { Personnage } from "../game/Personnage";
import { Position } from "../game/types/Position";

export interface ICarte {
  afficherMarqueur(personnage: Personnage): void;
  centrerSur(position: Position): void;
  marquerAccompli(personnageId: string): void;
  afficherJoueur(position: Position): void;
  onClicCarte(callback: (position: Position) => void): void;
}