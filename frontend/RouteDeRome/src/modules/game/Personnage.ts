import { Position } from "./types/Position";
import { Quiz } from "./Quiz";

export class Personnage {
  readonly id: string;
  readonly nom: string;
  readonly metier: string;
  readonly secteur: string;
  readonly position: Position | null;
  readonly videoIntro: string | null;
  private readonly quiz: Quiz;
  private dejaRencontre: boolean;

  constructor(
    id: string,
    nom: string,
    metier: string,
    secteur: string,
    position: Position | null,
    quiz: Quiz,
    videoIntro: string | null,
    dejaRencontre: boolean = false
  ) {
    this.id = id;
    this.nom = nom;
    this.metier = metier;
    this.secteur = secteur;
    this.position = position;
    this.quiz = quiz;
    this.videoIntro = videoIntro;
    this.dejaRencontre = dejaRencontre;
  }

  getQuiz(): Quiz {
    return this.quiz;
  }

  marquerRencontre(): void {
    this.dejaRencontre = true;
  }

  aEteRencontre(): boolean {
    return this.dejaRencontre;
  }
}