// Classe représentant une question de quiz
// Contient la question, son texte et la réponse associée

export class Question {
  readonly id: string;
  readonly texte: string;
  readonly reponse: string;

  // Initialise une question avec son ID, texte et réponse
  constructor(id: string, texte: string, reponse: string) {
    this.id = id;
    this.texte = texte;
    this.reponse = reponse;
  }
}