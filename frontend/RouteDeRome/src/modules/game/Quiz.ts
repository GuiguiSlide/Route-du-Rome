import { Question } from './Question'

export interface QuizProps {
  id: string;
  questions: Question[];
}

export class Quiz {
  public readonly id: string
  public readonly questions: Question[]

  constructor(props: QuizProps) {
    this.id = props.id
    this.questions = props.questions
  }

  public verifierReponse(questionId: string, reponseId: string): boolean {
    const question = this.questions.find((item) => item.id === questionId)
    return question?.bonneReponseId === reponseId ?? false
  }
}
