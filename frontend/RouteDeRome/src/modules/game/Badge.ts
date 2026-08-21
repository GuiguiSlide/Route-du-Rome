export class Badge {
  readonly id: string;
  readonly nom: string;
  readonly personnageId: string;

  constructor(id: string, nom: string, personnageId: string) {
    this.id = id;
    this.nom = nom;
    this.personnageId = personnageId;
  }
}