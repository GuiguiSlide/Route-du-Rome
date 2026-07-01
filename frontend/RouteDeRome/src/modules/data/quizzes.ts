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

export const QUIZZES: QuizDonnees[] = []
