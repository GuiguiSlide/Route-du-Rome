// Classe représentant un quiz pour un personnage
// Suit l'état des questions consultées pour valider la complétion

import { Question } from "./Question";

export class Quiz {
  readonly id: string;
  readonly questions: Question[];
  // Enregistre les questions déjà vues par le joueur
  private readonly questionsVues = new Set<string>();

  // Initialise un quiz avec un ID et ses questions
  constructor(id: string, questions: Question[]) {
    this.id = id;
    this.questions = questions;
  }

  // Marque une question comme vue
  // Le Set rend une question idempotente : recliquer ne compte pas deux fois.
  marquerVue(questionId: string): void {
    const question = this.questions.find((q) => q.id === questionId);
    if (!question) {
      throw new Error(`Question introuvable: ${questionId}`);
    }
    this.questionsVues.add(questionId);
  }

  // Vérifie si le quiz est complet (toutes les questions ont été vues)
  // Le quiz est complet seulement quand chaque question fournie par le JSON a été consultée.
  estComplet(): boolean {
    if (this.questions.length === 0) return true;
    return this.questions.every((q) => this.questionsVues.has(q.id));
  }

  // Réinitialise le quiz en vidant l'ensemble des questions vues
  reinitialiser(): void {
    this.questionsVues.clear();
  }
}