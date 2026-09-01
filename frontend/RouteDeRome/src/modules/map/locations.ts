// Interface définissant une localisation avec ses données visuelles
// Utilisée pour afficher les personnages sur la carte

export interface IntroNpc {
  lat: number;
  lng: number;
  icon: string;
  name: string;
  color: string;
}
