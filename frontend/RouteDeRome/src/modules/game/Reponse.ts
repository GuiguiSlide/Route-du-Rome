export class Reponse {
  readonly id: string;
  readonly texte: string;

  constructor(id: string, texte: string) {
    this.id = id;
    this.texte = texte;
  }
}