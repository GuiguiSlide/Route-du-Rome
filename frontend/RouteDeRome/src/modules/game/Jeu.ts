import { Badge } from "./Badge";
import { Joueur } from "./Joueur";
import { Personnage } from "./Personnage";
import { Quete } from "./Quete";
import { Quiz } from "./Quiz";

const SEUIL_PROXIMITE_METRES = 1500;

export class Jeu {
  private readonly joueur: Joueur;
  private readonly personnages: Personnage[];
  private readonly quetes: Quete[];

  constructor(joueur: Joueur, personnages: Personnage[], quetes: Quete[]) {
    this.joueur = joueur;
    this.personnages = personnages;
    this.quetes = quetes;
  }

  // Enregistre le héros choisi; les rencontres professionnelles utilisent le même joueur.
  commencer(personnageId: string): void {
    const personnage = this.selectionnerPersonnage(personnageId);
    this.joueur.changerPersonnage(personnage);
  }

  // Centralise les recherches afin que les appels métier échouent explicitement si l'id est faux.
  selectionnerPersonnage(id: string): Personnage {
    const personnage = this.personnages.find((p) => p.id === id);
    if (!personnage) {
      throw new Error(`Personnage introuvable: ${id}`);
    }
    return personnage;
  }

  // Une rencontre démarre à la fois le personnage et la quête associée.
  parlerA(personnageId: string): Quiz {
    const personnage = this.selectionnerPersonnage(personnageId);
    personnage.marquerRencontre();
    const quete = this.getQueteDuPersonnage(personnageId);
    quete?.commencer();
    return personnage.getQuiz();
  }

  // Le Quiz garde l'état des questions; Jeu sert ici de passerelle entre UI et domaine.
  marquerQuestionVue(quizId: string, questionId: string): void {
    const personnage = this.personnages.find((p) => p.getQuiz().id === quizId);
    if (!personnage) {
      throw new Error(`Quiz introuvable: ${quizId}`);
    }
    personnage.getQuiz().marquerVue(questionId);
  }

  // Une quête complète produit les trois récompenses visibles dans le carnet : métier, XP et badge.
  validerQuete(queteId: string): void {
    const quete = this.quetes.find((q) => q.id === queteId);
    if (!quete) {
      throw new Error(`Quête introuvable: ${queteId}`);
    }
    quete.valider();
    this.joueur.getCarnetDeBord().ajouterMetier(quete.personnage.metier);
    this.joueur.gagnerXp(150);
    this.joueur.ajouterBadge(
      new Badge(`badge-${quete.personnage.id}`, quete.personnage.metier, quete.personnage.id)
    );
  }

  // Termine une rencontre à partir du professionnel plutôt que de l'identifiant de quête.
  terminerRencontre(personnageId: string): void {
    const quete = this.getQueteDuPersonnage(personnageId);
    if (!quete) {
      throw new Error(`Aucune quête pour le personnage: ${personnageId}`);
    }
    this.validerQuete(quete.id);
  }

  // Parcourt les professionnels restants et déclenche le premier trouvé dans le rayon de 1 500 m.
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

  // Toutes les quêtes doivent être accomplies pour afficher l'écran final.
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