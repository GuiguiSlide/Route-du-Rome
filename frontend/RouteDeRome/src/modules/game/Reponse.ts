export interface ReponseProps {
  id: string;
  texte: string;
}

export class Reponse {
  public readonly id: string
  public readonly texte: string

  constructor(props: ReponseProps) {
    this.id = props.id
    this.texte = props.texte
  }
}
