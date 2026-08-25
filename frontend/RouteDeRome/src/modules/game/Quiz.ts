import { Question } from "./Question";

export class Quiz {
  readonly id: string;
  readonly questions: Question[];
  private readonly questionsVues = new Set<string>();

  constructor(id: string, questions: Question[]) {
    this.id = id;
    this.questions = questions;
  }

  // Le Set rend une question idempotente : recliquer ne compte pas deux fois.
  marquerVue(questionId: string): void {
    const question = this.questions.find((q) => q.id === questionId);
    if (!question) {
      throw new Error(`Question introuvable: ${questionId}`);
    }
    this.questionsVues.add(questionId);
  }

  // Le quiz est complet seulement quand chaque question fournie par le JSON a été consultée.
  estComplet(): boolean {
    if (this.questions.length === 0) return true;
    return this.questions.every((q) => this.questionsVues.has(q.id));
  }

  reinitialiser(): void {
    this.questionsVues.clear();
  }
}