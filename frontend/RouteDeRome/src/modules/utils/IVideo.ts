// Interface définissant le contrat pour la gestion des vidéos
// Permet de lire et de contrôler la lecture de vidéos

export interface IVideo {
  lire(source: string): void;
  passer(): void;
}