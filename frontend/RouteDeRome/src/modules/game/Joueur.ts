import { Badge } from "./Badge";
import { CarnetDeBord } from "./CarnetDeBord";
import { Personnage } from "./Personnage";
import { Position } from "./types/Position";

export class Joueur {
  private xp = 0;
  private niveau = 1;
  private readonly badges: Badge[] = [];
  private personnageChoisi: Personnage | null = null;
  private readonly carnetDeBord: CarnetDeBord;
  private position: Position | null = null;

  constructor(carnetDeBord: CarnetDeBord) {
    this.carnetDeBord = carnetDeBord;
  }

  // Le niveau est dérivé de l'XP : il n'est jamais modifié directement par l'interface.
  gagnerXp(montant: number): void {
    if (montant < 0) {
      throw new Error("Le montant d'XP ne peut pas être négatif");
    }
    this.xp += montant;
    this.recalculerNiveau();
  }

  private recalculerNiveau(): void {
    this.niveau = Math.floor(this.xp / 100) + 1;
  }

  // Le tableau conserve l'ordre d'obtention tout en empêchant les doublons par identifiant.
  ajouterBadge(badge: Badge): void {
    if (this.badges.some((b) => b.id === badge.id)) return;
    this.badges.push(badge);
  }

  changerPersonnage(personnage: Personnage): void {
    this.personnageChoisi = personnage;
  }

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