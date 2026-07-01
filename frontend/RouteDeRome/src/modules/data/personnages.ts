export interface PersonnageDonnees {
  id: string;
  nom: string;
  metier: string;
  secteur: string;
  position: { lat: number; lng: number };
  videoIntro: string;
}

export const PERSONNAGES: PersonnageDonnees[] = []
