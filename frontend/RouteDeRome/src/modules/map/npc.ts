// Interface représentant un PNJ (personnage non joueur)
// Contient les informations de base d'un professionnel sur la carte

export interface Npc {
  id: string;
  nom: string;
  metier: string;
  secteur: string;
}

// Liste des PNJ disponibles dans le jeu (tableau vide en attente de données)
export const NPCS: Npc[] = []
