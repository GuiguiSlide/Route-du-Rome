export class Question {
  readonly id: string;
  readonly texte: string;
  readonly reponse: string;

  constructor(id: string, texte: string, reponse: string) {
    this.id = id;
    this.texte = texte;
    this.reponse = reponse;
  }
}