// Module de gestion des données des personnages du jeu
// Charge les données JSON et fournit des interfaces et fonctions utilitaires
// pour accéder aux personnages (héros jouables, professionnels sur la carte)

import raw from "./personnages.json";

// Interface représentant un personnage complet avec tous ses détails
export interface Character {
  id: string;
  name: string;
  role: string;
  sector: string | null;
  popRole: string | null;
  portrait: string;
  tags: string[];
  isPlayable: boolean;
  location: { lat: number; lng: number; icon: string; color: string } | null;
  video: string | null;
  bio: string | null;
  dialogues: { intro: string[] };
  quiz: QuizQuestion[];
}

// Interface pour la présentation visuelle d'un personnage sur la carte
// Contient l'icône et la couleur associées au personnage
export interface PersonnagePresentation {
  personnageId: string;
  icon: string;
  color: string;
}

// Interface pour le contenu dialogué d'un personnage
export interface PersonnageContenu {
  personnageId: string;
  dialogueIntro: string[];
}

// Charge les dialogues d'introduction de chaque personnage
// Filtre uniquement les données nécessaires pour les écrans de dialogue
export function chargerContenus(characters: Character[]): PersonnageContenu[] {
  return characters.map((character) => ({
    personnageId: character.id,
    dialogueIntro: character.dialogues.intro,
  }));
}

// Charge les présentations visuelles (icône et couleur) des personnages présents sur la carte
// Prépare uniquement les dialogues nécessaires à EcranCarte, sans mélanger les données de présentation.
export function chargerPresentations(characters: Character[]): PersonnagePresentation[] {
  return characters
    .filter((character) => character.location !== null)
    .map((character) => ({
      personnageId: character.id,
      icon: character.location!.icon,
      color: character.location!.color,
    }));
}
// Interface pour une question de quiz d'un personnage
export interface QuizQuestion {
  id: string;
  texte: string;
  reponse: string;
}
// Interface pour la localisation géographique d'un personnage sur la carte
export interface CharacterLocation {
  lat: number;
  lng: number;
  icon: string;
  color: string;
}

// Tableau de tous les personnages chargés à partir du JSON
export const CHARACTERS: Character[] = raw as Character[];

// Personnages jouables (Élio / Élia) - retourne les héros sélectionnables en début de jeu
export function getPlayableHeroes(): Character[] {
  return CHARACTERS.filter((c) => c.isPlayable);
}

// Récupère un héros spécifique par son ID
// La sélection appelle cette fonction pour empêcher de choisir un professionnel comme héros.
export function getHeroById(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id && c.isPlayable);
}

// Personnages professionnels/NPC à découvrir sur la carte - retourne les personnages avec une localisation
export function getMapCharacters(): Character[] {
  return CHARACTERS.filter((c) => c.location !== null);
}

// Récupère un personnage par son ID (héros ou professionnel)
// Sert aux écrans qui veulent retrouver un personnage, qu'il soit héros ou professionnel.
export function getCharacterById(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}