import raw from "./personnages.json";

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

export interface PersonnagePresentation {
  personnageId: string;
  icon: string;
  color: string;
}
export interface PersonnageContenu {
  personnageId: string;
  dialogueIntro: string[];
}

export function chargerContenus(characters: Character[]): PersonnageContenu[] {
  return characters.map((character) => ({
    personnageId: character.id,
    dialogueIntro: character.dialogues.intro,
  }));
}

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
export interface QuizQuestion {
  id: string;
  texte: string;
  reponse: string;
}
export interface CharacterLocation {
  lat: number;
  lng: number;
  icon: string;
  color: string;
}

export const CHARACTERS: Character[] = raw as Character[];

// Personnages jouables (Élio / Élia)
export function getPlayableHeroes(): Character[] {
  return CHARACTERS.filter((c) => c.isPlayable);
}

// La sélection appelle cette fonction pour empêcher de choisir un professionnel comme héros.
export function getHeroById(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id && c.isPlayable);
}

// Professionnels/NPC à découvrir sur la carte
export function getMapCharacters(): Character[] {
  return CHARACTERS.filter((c) => c.location !== null);
}

// Sert aux écrans qui veulent retrouver un personnage, qu'il soit héros ou professionnel.
export function getCharacterById(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}