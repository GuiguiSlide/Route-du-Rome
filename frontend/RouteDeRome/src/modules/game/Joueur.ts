// Classe représentant le joueur/le héros du jeu
// Gère les statistiques du joueur : XP, niveau, badges, position et personnage choisi

import { Badge } from "./Badge";
import { CarnetDeBord } from "./CarnetDeBord";
import { Personnage } from "./Personnage";
import { Position } from "./types/Position";

export class Joueur {
  // Points d'expérience accumulés
  private xp = 0;
  // Niveau du joueur (dérivé de l'XP)
  private niveau = 1;
  // Collection de badges obtenus
  private readonly badges: Badge[] = [];
  // Personnage actuellement sélectionné (héros ou en rencontre)
  private personnageChoisi: Personnage | null = null;
  // Le carnet de bord du joueur
  private readonly carnetDeBord: CarnetDeBord;
  // Position actuelle du joueur sur la carte
  private position: Position | null = null;

  // Initialise le joueur avec un carnet de bord
  constructor(carnetDeBord: CarnetDeBord) {
    this.carnetDeBord = carnetDeBord;
  }

  // Ajoute de l'XP et recalcule le niveau automatiquement
  // Le niveau est dérivé de l'XP : il n'est jamais modifié directement par l'interface.
  gagnerXp(montant: number): void {
    if (montant < 0) {
      throw new Error("Le montant d'XP ne peut pas être négatif");
    }
    this.xp += montant;
    this.recalculerNiveau();
  }

  // Recalcule le niveau en fonction de l'XP (100 XP = 1 niveau)
  private recalculerNiveau(): void {
    this.niveau = Math.floor(this.xp / 100) + 1;
  }

  // Ajoute un badge à la collection (sans doublon)
  // Le tableau conserve l'ordre d'obtention tout en empêchant les doublons par identifiant.
  ajouterBadge(badge: Badge): void {
    if (this.badges.some((b) => b.id === badge.id)) return;
    this.badges.push(badge);
  }

  // Enregistre le personnage choisi (héros ou NPC en rencontre)
  changerPersonnage(personnage: Personnage): void {
    this.personnageChoisi = personnage;
  }

  // Met à jour la position actuelle du joueur sur la carte
  deplacerVers(position: Position): void {
    this.position = position;
  }

  getPosition(): Position | null {
    return this.position;
  }

  getXp(): number {
    return this.xp;
  }

  getNiveau(): number {
    return this.niveau;
  }

  getBadges(): readonly Badge[] {
    return [...this.badges];
  }

  getPersonnageChoisi(): Personnage | null {
    return this.personnageChoisi;
  }

  getCarnetDeBord(): CarnetDeBord {
    return this.carnetDeBord;
  }
}