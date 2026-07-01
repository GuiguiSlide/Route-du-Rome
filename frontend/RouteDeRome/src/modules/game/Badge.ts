export interface BadgeProps {
  id: string;
  nom: string;
  personnageId: string;
}

export class Badge {
  public readonly id: string
  public readonly nom: string
  public readonly personnageId: string

  constructor(props: BadgeProps) {
    this.id = props.id
    this.nom = props.nom
    this.personnageId = props.personnageId
  }
}
