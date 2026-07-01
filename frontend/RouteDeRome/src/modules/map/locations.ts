export interface Location {
  id: string;
  nom: string;
  x: number;
  y: number;
  secteur: string;
  personnageId: string;
}

export const LOCATIONS: Location[] = []
