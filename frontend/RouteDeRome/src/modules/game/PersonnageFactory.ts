import { Personnage } from "./Personnage";
import { Position } from "./types/Position";
import { Quiz } from "./Quiz";
import { Question } from "./Question";
import type { Character, QuizQuestion } from "../data/personnages";

export function creerPersonnage(character: Character): Personnage {
  const position = creerPosition(character);
  const quiz = creerQuiz(character);

  return new Personnage(
    character.id,
    character.name,
    character.role,
    character.sector ?? "",
    position,
    quiz,
    character.video
  );
}

export function creerPersonnages(characters: Character[]): Personnage[] {
  return characters.map(creerPersonnage);
}

function creerPosition(character: Character): Position | null {
  if (!character.location) return null;
  return new Position(character.location.lat, character.location.lng);
}

function creerQuiz(character: Character): Quiz {
  const questions = character.quiz.map(creerQuestion);
  return new Quiz(`${character.id}-quiz`, questions);
}

function creerQuestion(quizQuestion: QuizQuestion): Question {
  return new Question(quizQuestion.id, quizQuestion.texte, quizQuestion.reponse);
}