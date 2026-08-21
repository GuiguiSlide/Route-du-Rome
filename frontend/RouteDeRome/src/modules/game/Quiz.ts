import { Question } from "./Question";

export class Quiz {
  readonly id: string;
  readonly questions: Question[];
  private readonly reponsesDonnees = new Map<string, string>();

  constructor(id: string, questions: Question[]) {
    this.id = id;
    this.questions = questions;
  }

  verifierReponse(questionId: string, reponseId: string): boolean {
    const question = this.questions.find((q) => q.id === questionId);
    if (!question) {
      throw new Error(`Question introuvable: ${questionId}`);
    }
    this.reponsesDonnees.set(questionId, reponseId);
    return question.estCorrecte(reponseId);
  }

  estComplet(): boolean {
    if (this.questions.length === 0) return true;
    return this.questions.every((q) => this.reponsesDonnees.has(q.id));
  }

  reinitialiser(): void {
    this.reponsesDonnees.clear();
  }
}