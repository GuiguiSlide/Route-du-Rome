// Classe représentant une réponse possible dans un quiz
// Contient l'ID de la réponse et son texte

export class Reponse {
  readonly id: string;
  readonly texte: string;

  // Initialise une réponse avec un ID et un texte
  constructor(id: string, texte: string) {
    this.id = id;
    this.texte = texte;
  }
}