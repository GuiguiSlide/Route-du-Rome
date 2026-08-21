import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ICarte } from "./ICarte";
import type { Personnage } from "../game/Personnage";
import type { Position } from "../game/types/Position";
import type { PersonnagePresentation } from "../data/personnages";

export class Carte implements ICarte {
  private map: L.Map | null = null;
  private readonly markers = new Map<string, L.Marker>();
  private readonly presentations: Map<string, PersonnagePresentation>;

  constructor(presentations: PersonnagePresentation[]) {
    this.presentations = new Map(
      presentations.map((presentation) => [presentation.personnageId, presentation])
    );
  }

  initialiser(containerId: string): void {
    if (this.map) return;

    this.map = L.map(containerId, {
      center: [48.58, -1.96],
      zoom: 11,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      subdomains: "abc",
      attribution: "© OpenStreetMap",
    }).addTo(this.map);
  }

  rafraichirTaille(): void {
    this.map?.invalidateSize();
  }

  afficherMarqueur(personnage: Personnage): void {
    if (!this.map || !personnage.position) return;

    const presentation = this.presentations.get(personnage.id);
    const icon = this.creerIcone(personnage.nom, presentation);

    const marker = L.marker([personnage.position.lat, personnage.position.lng], { icon }).addTo(
      this.map
    );
    this.markers.set(personnage.id, marker);
  }

  centrerSur(position: Position): void {
    this.map?.setView([position.lat, position.lng], this.map.getZoom());
  }

  marquerAccompli(personnageId: string): void {
    const marker = this.markers.get(personnageId);
    const presentation = this.presentations.get(personnageId);
    if (!marker || !presentation) return;

    marker.setIcon(this.creerIcone(personnageId, presentation, true));
  }

  private creerIcone(
    nom: string,
    presentation: PersonnagePresentation | undefined,
    accompli = false
  ): L.DivIcon {
    const icon = presentation?.icon ?? "?";
    const color = presentation?.color ?? "#8B5BB8";
    const opacity = accompli ? "1" : "0.85";

    return L.divIcon({
      className: "",
      html: `
        <div style="display:flex;flex-direction:column;align-items:center;opacity:${opacity};">
          <div style="width:44px;height:44px;border-radius:50%;border:3px solid ${color};background:rgba(18,14,36,0.9);display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 0 12px rgba(0,0,0,0.5);">${icon}</div>
          <div style="background:rgba(18,14,36,0.9);border:1px solid ${color};color:#fff;font-size:9px;font-weight:800;padding:2px 7px;border-radius:8px;margin-top:3px;white-space:nowrap;font-family:Nunito,sans-serif;">${nom}</div>
        </div>`,
      iconSize: [60, 65],
      iconAnchor: [30, 62],
    });
  }
}