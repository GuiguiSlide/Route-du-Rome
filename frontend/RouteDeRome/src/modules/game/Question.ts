import { Reponse } from "./Reponse";

export class Question {
  readonly id: string;
  readonly texte: string;
  readonly reponses: Reponse[];
  readonly bonneReponseId: string;

  constructor(id: string, texte: string, reponses: Reponse[], bonneReponseId: string) {
    this.id = id;
    this.texte = texte;
    this.reponses = reponses;
    this.bonneReponseId = bonneReponseId;
  }

  estCorrecte(reponseId: string): boolean {
    return reponseId === this.bonneReponseId;
  }
}