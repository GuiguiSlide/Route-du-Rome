import { Carte } from "../map/Carte";
import { creerPersonnages } from "../game/PersonnageFactory";
import { chargerPresentations, chargerContenus } from "../data/personnages";
import personnagesData from "../data/personnages.json";
import type { Character, PersonnageContenu } from "../data/personnages";
import { Jeu } from "../game/Jeu";
import { Joueur } from "../game/Joueur";
import { CarnetDeBord } from "../game/CarnetDeBord";
import { Quete } from "../game/Quete";
import type { Position } from "../game/types/Position";
import { startDialogue, closeDialogue } from "./EcranDialogue";
import { startQuiz } from "./EcranQuiz";

export class EcranCarte {
  private carte: Carte | null = null;
  private jeu: Jeu | null = null;
  private contenus: readonly PersonnageContenu[] = [];

  public afficher(): void {
    document.getElementById("screen-game")?.classList.remove("visible");
    document.getElementById("screen-map")?.classList.add("visible");

    const characters = personnagesData as Character[];
    const personnages = creerPersonnages(characters);
    const personnagesCarte = personnages.filter((p) => p.position !== null);
    const presentations = chargerPresentations(characters);
    this.contenus = chargerContenus(characters);

    const carnetDeBord = new CarnetDeBord(personnagesCarte.length);
    const joueur = new Joueur(carnetDeBord);
    const quetes = personnagesCarte.map(
      (personnage) => new Quete(`quete-${personnage.id}`, personnage, personnage.metier)
    );
    this.jeu = new Jeu(joueur, personnages, quetes);

    this.carte = new Carte(presentations);
    this.carte.initialiser("map");
    this.carte.rafraichirTaille();

    personnagesCarte.forEach((personnage) => this.carte?.afficherMarqueur(personnage));

    this.carte.onClicCarte((position) => this.gererClicCarte(position));
  }

  private gererClicCarte(position: Position): void {
    if (!this.jeu || !this.carte) return;

    this.jeu.getJoueur().deplacerVers(position);
    this.carte.afficherJoueur(position);

    const personnage = this.jeu.verifierProximite();
    if (!personnage) return;

    const quiz = this.jeu.parlerA(personnage.id);
    const contenu = this.contenus.find((c) => c.personnageId === personnage.id);
    const lignes = contenu?.dialogueIntro ?? [];

    this.afficherVideoRencontre(personnage.videoIntro);

    startDialogue(lignes, () => {
      if (quiz.questions.length > 0) {
        startQuiz(
          quiz,
          (questionId) => this.jeu!.marquerQuestionVue(quiz.id, questionId),
          () => this.terminerRencontre(personnage.id)
        );
      } else {
        closeDialogue();
        this.terminerRencontre(personnage.id);
      }
    });
  }

  private terminerRencontre(personnageId: string): void {
    this.jeu?.terminerRencontre(personnageId);
    this.carte?.marquerAccompli(personnageId);
    this.masquerVideoRencontre();
  }

  private afficherVideoRencontre(videoUrl: string | null): void {
    const wrap = document.getElementById("encounter-video-wrap");
    const video = document.getElementById("encounter-video") as HTMLVideoElement | null;
    if (!wrap || !video || !videoUrl) return;

    video.src = videoUrl;
    video.load();
    video.play().catch(() => { });
    wrap.classList.add("show");
  }

  private masquerVideoRencontre(): void {
    const wrap = document.getElementById("encounter-video-wrap");
    const video = document.getElementById("encounter-video") as HTMLVideoElement | null;
    wrap?.classList.remove("show");
    if (video) {
      video.pause();
      video.src = "";
    }
  }
}