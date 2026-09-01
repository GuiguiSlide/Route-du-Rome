// Classe représentant un badge/récompense obtenu par le joueur
// Chaque badge est associé à un personnage et à son métier

export class Badge {
  readonly id: string;
  readonly nom: string;
  readonly personnageId: string;

  // Initialise un badge avec un ID unique, un nom et l'ID du personnage associé
  constructor(id: string, nom: string, personnageId: string) {
    this.id = id;
    this.nom = nom;
    this.personnageId = personnageId;
  }
}