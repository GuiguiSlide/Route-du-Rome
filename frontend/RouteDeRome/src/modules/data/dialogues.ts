// Interface pour les dialogues des personnages
// Représente les données structurées d'un dialogue avec son ID, le personnage associé et les lignes de texte
export interface DialogueDonnees {
  id: string;
  personnageId: string;
  textes: string[];
}

// Liste des dialogues disponibles dans le jeu (tableau vide en attente de données)
export const DIALOGUES: DialogueDonnees[] = []
