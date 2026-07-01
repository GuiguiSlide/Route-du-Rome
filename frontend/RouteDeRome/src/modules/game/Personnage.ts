import { Quiz } from './Quiz'
import { Position } from './types/Position'

export interface PersonnageProps {
  id: string;
  nom: string;
  metier: string;
  secteur: string;
  position: Position;
  videoIntro: string;
  quiz: Quiz;
}

export class Personnage {
  public readonly id: string
  public readonly nom: string
  public readonly metier: string
  public readonly secteur: string
  public readonly position: Position
  public readonly videoIntro: string
  public readonly quiz: Quiz

  constructor(props: PersonnageProps) {
    this.id = props.id
    this.nom = props.nom
    this.metier = props.metier
    this.secteur = props.secteur
    this.position = props.position
    this.videoIntro = props.videoIntro
    this.quiz = props.quiz
  }
}
