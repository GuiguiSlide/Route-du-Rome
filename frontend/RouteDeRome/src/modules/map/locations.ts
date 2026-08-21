export interface IntroNpc {
  lat: number;
  lng: number;
  icon: string;
  name: string;
  color: string;
}

// Les 9 professionnels du jeu, positionnés sur la carte d'intro
export const INTRO_NPCS: IntroNpc[] = [
  { lat: 48.649, lng: -2.025, icon: "\u2693", name: "Morgane", color: "#406BDE" },
  { lat: 48.554, lng: -1.75, icon: "\uD83C\uDF3E", name: "Sarah", color: "#8B5BB8" },
  { lat: 48.672, lng: -1.847, icon: "\uD83C\uDF7D\uFE0F", name: "Sophie", color: "#FFCC52" },
  { lat: 48.455, lng: -2.049, icon: "\u269B\uFE0F", name: "Nathan", color: "#EB6366" },
  { lat: 48.634, lng: -2.067, icon: "\uD83E\uDD1D", name: "Claire", color: "#D9C9E5" },
  { lat: 48.634, lng: -2.133, icon: "\uD83E\uDD42", name: "Manu", color: "#FFDE8C" },
  { lat: 48.412, lng: -1.748, icon: "\uD83D\uDD27", name: "Florian", color: "#B0BFF0" },
  { lat: 48.59, lng: -1.84, icon: "\uD83D\uDC76", name: "Laetitia", color: "#F0C9DE" },
  { lat: 48.561, lng: -1.831, icon: "\uD83D\uDD29", name: "Jeanne", color: "#F5A39E" },
];