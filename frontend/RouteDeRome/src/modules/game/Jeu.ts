import { Badge } from "./Badge";
import { Joueur } from "./Joueur";
import { Personnage } from "./Personnage";
import { Quete } from "./Quete";
import { Quiz } from "./Quiz";

const SEUIL_PROXIMITE_METRES = 300;

export class Jeu {
  private readonly joueur: Joueur;
  private readonly personnages: Personnage[];
  private readonly quetes: Quete[];

  constructor(joueur: Joueur, personnages: Personnage[], quetes: Quete[]) {
    this.joueur = joueur;
    this.personnages = personnages;
    this.quetes = quetes;
  }

  commencer(personnageId: string): void {
    const personnage = this.selectionnerPersonnage(personnageId);
    this.joueur.changerPersonnage(personnage);
  }

  selectionnerPersonnage(id: string): Personnage {
    const personnage = this.personnages.find((p) => p.id === id);
    if (!personnage) {
      throw new Error(`Personnage introuvable: ${id}`);
    }
    return personnage;
  }

  parlerA(personnageId: string): Quiz {
    const personnage = this.selectionnerPersonnage(personnageId);
    personnage.marquerRencontre();
    const quete = this.getQueteDuPersonnage(personnageId);
    quete?.commencer();
    return personnage.getQuiz();
  }

  repondre(quizId: string, questionId: string, reponseId: string): boolean {
    const personnage = this.personnages.find((p) => p.getQuiz().id === quizId);
    if (!personnage) {
      throw new Error(`Quiz introuvable: ${quizId}`);
    }
    return personnage.getQuiz().verifierReponse(questionId, reponseId);
  }

  validerQuete(queteId: string): void {
    const quete = this.quetes.find((q) => q.id === queteId);
    if (!quete) {
      throw new Error(`Quête introuvable: ${queteId}`);
    }
    quete.valider();
    this.joueur.getCarnetDeBord().ajouterMetier(quete.personnage.metier);
    this.joueur.ajouterBadge(
      new Badge(`badge-${quete.personnage.id}`, quete.personnage.metier, quete.personnage.id)
    );
  }

  verifierProximite(): Personnage | null {
    const position = this.joueur.getPosition();
    if (!position) return null;

    for (const personnage of this.personnages) {
      if (!personnage.position || personnage.aEteRencontre()) continue;

      const distance = position.distanceTo(personnage.position);
      if (distance <= SEUIL_PROXIMITE_METRES) {
        return personnage;
      }
    }

    return null;
  }

  private getQueteDuPersonnage(personnageId: string): Quete | undefined {
    return this.quetes.find((q) => q.personnage.id === personnageId);
  }

  estTermine(): boolean {
    return this.quetes.every((q) => q.estAccomplie());
  }

  getJoueur(): Joueur {
    return this.joueur;
  }

  getPersonnages(): readonly Personnage[] {
    return [...this.personnages];
  }
}