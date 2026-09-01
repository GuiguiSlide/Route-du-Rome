// Interface pour les quiz des personnages
// Contient les questions avec leurs réponses possibles et la bonne réponse
export interface QuizDonnees {
  id: string;
  personnageId: string;
  questions: {
    id: string;
    texte: string;
    reponses: { id: string; texte: string }[];
    bonneReponseId: string;
  }[];
}

// Liste des quiz disponibles (tableau vide en attente de données)
export const QUIZZES: QuizDonnees[] = []
