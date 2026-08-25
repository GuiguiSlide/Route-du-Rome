import { Personnage } from "./Personnage";
import { Position } from "./types/Position";
import { Quiz } from "./Quiz";
import { Question } from "./Question";
import type { Character, QuizQuestion } from "../data/personnages";

// Transforme une ligne JSON en objet métier utilisé par Jeu et Carte.
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

// Applique l'adaptateur à tous les personnages chargés depuis le JSON.
export function creerPersonnages(characters: Character[]): Personnage[] {
  return characters.map(creerPersonnage);
}

// Les héros n'ont pas de position; les professionnels en ont une pour la carte.
function creerPosition(character: Character): Position | null {
  if (!character.location) return null;
  return new Position(character.location.lat, character.location.lng);
}

// Le préfixe d'id garantit qu'un quiz reste rattaché à son personnage.
function creerQuiz(character: Character): Quiz {
  const questions = character.quiz.map(creerQuestion);
  return new Quiz(`${character.id}-quiz`, questions);
}

function creerQuestion(quizQuestion: QuizQuestion): Question {
  return new Question(quizQuestion.id, quizQuestion.texte, quizQuestion.reponse);
}