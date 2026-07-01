export interface Reponse {
  id: string;
  texte: string;
}

export interface QuestionProps {
  id: string;
  texte: string;
  reponses: Reponse[];
  bonneReponseId: string;
}

export class Question {
  public readonly id: string
  public readonly texte: string
  public readonly reponses: Reponse[]
  public readonly bonneReponseId: string

  constructor(props: QuestionProps) {
    this.id = props.id
    this.texte = props.texte
    this.reponses = props.reponses
    this.bonneReponseId = props.bonneReponseId
  }
}
