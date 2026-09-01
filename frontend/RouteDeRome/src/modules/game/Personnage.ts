// Classe représentant un personnage du jeu (héros ou professionnel)
// Contient les informations du personnage et gère l'état de rencontre

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
  // Indique si le personnage a déjà été rencontré
  private dejaRencontre: boolean;

  // Initialise un personnage avec tous ses détails
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

  // Retourne le quiz associé au personnage
  getQuiz(): Quiz {
    return this.quiz;
  }

  // Enregistre que le personnage a été rencontré
  marquerRencontre(): void {
    this.dejaRencontre = true;
  }

  // Vérifie si le personnage a déjà été rencontré
  aEteRencontre(): boolean {
    return this.dejaRencontre;
  }
}