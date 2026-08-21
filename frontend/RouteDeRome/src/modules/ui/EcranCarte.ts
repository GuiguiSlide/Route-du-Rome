import { creerPersonnages } from "../game/PersonnageFactory";
import { chargerPresentations } from "../data/personnages";
import personnagesData from "../data/personnages.json";
import type { Character } from "../data/personnages";
import { Carte } from "../map/Carte";

export class EcranCarte {
  private carte: Carte | null = null;

  public afficher(): void {
    document.getElementById("screen-game")?.classList.remove("visible");
    document.getElementById("screen-map")?.classList.add("visible");

    const characters = personnagesData as Character[];
    const personnages = creerPersonnages(characters).filter((p) => p.position !== null);
    const presentations = chargerPresentations(characters);

    this.carte = new Carte(presentations);
    this.carte.initialiser("map");
    this.carte.rafraichirTaille();

    personnages.forEach((personnage) => this.carte?.afficherMarqueur(personnage));
  }
}