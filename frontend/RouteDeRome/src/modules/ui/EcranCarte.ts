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
import { afficherCarnet } from "./EcranCarnet";
import { EcranFin } from "./EcranFin";

export class EcranCarte {
  private carte: Carte | null = null;
  private jeu: Jeu | null = null;
  private contenus: readonly PersonnageContenu[] = [];

  // Construit la partie complète et relie la carte aux callbacks de rencontre.
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
    document.addEventListener("ouvrir-carnet", () => {
      if (this.jeu) afficherCarnet(this.jeu.getJoueur());
    });

    this.carte = new Carte(presentations);
    this.carte.initialiser("map");
    this.carte.rafraichirTaille();

    personnagesCarte.forEach((personnage) => this.carte?.afficherMarqueur(personnage));

    this.carte.onClicCarte((position) => this.gererClicCarte(position));
  }

  // Un clic devient une rencontre seulement si le joueur est dans le rayon métier défini par Jeu.
  private gererClicCarte(position: Position): void {
    if (!this.jeu || !this.carte) return;

    this.jeu.getJoueur().deplacerVers(position);
    this.carte.afficherJoueur(position);

    const personnage = this.jeu.verifierProximite();
    if (!personnage) return;

    const quiz = this.jeu.parlerA(personnage.id);
    const contenu = this.contenus.find((c) => c.personnageId === personnage.id);
    const lignes = contenu?.dialogueIntro ?? [];
    const portrait = personnagesData.find((character) => character.id === personnage.id)?.portrait;
    const dialoguePortrait = document.getElementById("dlg-portrait") as HTMLImageElement | null;
    if (dialoguePortrait && portrait) {
      dialoguePortrait.src = portrait;
      dialoguePortrait.alt = personnage.nom;
    }
    const dialogueName = document.getElementById("dlg-nname");
    const dialogueRole = document.getElementById("dlg-nrole");
    if (dialogueName) dialogueName.textContent = personnage.nom;
    if (dialogueRole) dialogueRole.textContent = personnage.metier;

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

  // Le callback du quiz déclenche les récompenses, puis éventuellement la fin globale.
  private terminerRencontre(personnageId: string): void {
    this.jeu?.terminerRencontre(personnageId);
    this.carte?.marquerAccompli(personnageId);
    this.masquerVideoRencontre();
    const level = document.getElementById("map-level");
    if (level && this.jeu) level.textContent = `Niveau ${this.jeu.getJoueur().getNiveau()}`;
    if (this.jeu?.estTermine()) {
      new EcranFin().afficher(this.jeu.getJoueur());
    }
  }

  // La vidéo est une couche DOM au-dessus de la carte; le dialogue reste au premier plan.
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