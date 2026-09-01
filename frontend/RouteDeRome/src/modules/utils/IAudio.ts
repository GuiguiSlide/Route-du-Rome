// Interface définissant le contrat pour la gestion de l'audio
// Permet de jouer de la musique de fond et du bruit d'ambiance

export interface IAudio {
  jouerMusique(piste: string): void;
  couper(): void;
}