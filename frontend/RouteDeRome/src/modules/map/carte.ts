// Classe représentant la carte interactive du jeu
// Utilise Leaflet pour afficher la carte, les marqueurs des personnages et la position du joueur

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ICarte } from "./ICarte";
import type { Personnage } from "../game/Personnage";
import { Position } from "../game/types/Position";
import type { PersonnagePresentation } from "../data/personnages";

export class Carte implements ICarte {
  private map: L.Map | null = null;
  // Stocke les marqueurs des personnages par ID
  private readonly markers = new Map<string, L.Marker>();
  // Cache les présentations des personnages pour un accès rapide
  private readonly presentations: Map<string, PersonnagePresentation>;
  // Marqueur représentant la position du joueur
  private joueurMarker: L.Marker | null = null;
  // Callbacks exécutés quand le joueur clique sur la carte
  private readonly clicCallbacks: Array<(position: Position) => void> = [];

  // Initialise la carte avec les données de présentation des personnages
  // La Map permet de retrouver instantanément l'icône et la couleur par identifiant.
  constructor(presentations: PersonnagePresentation[]) {
      presentations.map((presentation) => [presentation.personnageId, presentation])
    );
  }

  // Initialise la carte Leaflet avec centre sur Rennes et configuration standard
  // Leaflet est initialisé une seule fois pour éviter de doubler les tuiles et les événements.
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

    this.map.on("click", (e: L.LeafletMouseEvent) => {
      const position = new Position(e.latlng.lat, e.latlng.lng);
      this.clicCallbacks.forEach((callback) => callback(position));
    });
  }

  // Rafraîchit la taille de la carte (utile après un redimensionnement de fenêtre)
  rafraichirTaille(): void {
    this.map?.invalidateSize();
  }

  // Enregistre un callback exécuté quand le joueur clique sur la carte
  // Le callback sera appelé par Leaflet à chaque clic sur la carte.
  onClicCarte(callback: (position: Position) => void): void {
    this.clicCallbacks.push(callback);
  }

  // Affiche ou met à jour la position du joueur sur la carte
  // Le marqueur joueur est créé au premier déplacement puis simplement repositionné.
  afficherJoueur(position: Position): void {
    if (!this.map) return;

    if (this.joueurMarker) {
      this.joueurMarker.setLatLng([position.lat, position.lng]);
      return;
    }

    const icon = L.divIcon({
      className: "",
      html: `<div style="width:20px;height:20px;border-radius:50%;background:#FFCC52;border:3px solid #fff;box-shadow:0 0 12px rgba(255,204,82,0.8);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
    this.joueurMarker = L.marker([position.lat, position.lng], { icon }).addTo(this.map);
  }

  // Affiche un personnage comme marqueur sur la carte avec son icône
  // Transforme un professionnel métier en marqueur visuel avec son icône et son nom.
  afficherMarqueur(personnage: Personnage): void {
    if (!this.map || !personnage.position) return;

    const presentation = this.presentations.get(personnage.id);
    const icon = this.creerIcone(personnage.nom, presentation);

    const marker = L.marker([personnage.position.lat, personnage.position.lng], { icon }).addTo(
      this.map
    );
    this.markers.set(personnage.id, marker);
  }

  // Centre la vue de la carte sur une position donnée
  centrerSur(position: Position): void {
    this.map?.setView([position.lat, position.lng], this.map.getZoom());
  }

  // Marque la quête d'un personnage comme accomplie (affiche une coche verte)
  // La coche verte signale que la quête du professionnel est déjà terminée.
  marquerAccompli(personnageId: string): void {
    const marker = this.markers.get(personnageId);
    const presentation = this.presentations.get(personnageId);
    if (!marker || !presentation) return;

    marker.setIcon(this.creerIcone(personnageId, presentation, true));
  }

  // Crée un icône personnalisé pour un personnage avec un style Leaflet
  private creerIcone(
    nom: string,
    presentation: PersonnagePresentation | undefined,
    accompli = false
  ): L.DivIcon {
    const icon = presentation?.icon ?? "?";
    const color = accompli ? "#4CAF50" : (presentation?.color ?? "#8B5BB8");
    const opacity = accompli ? "1" : "0.85";
    const badge = accompli
      ? `<div style="position:absolute;top:-4px;right:-4px;width:20px;height:20px;border-radius:50%;background:#4CAF50;border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;font-weight:bold;">✓</div>`
      : "";

    return L.divIcon({
      className: "",
      html: `
        <div style="display:flex;flex-direction:column;align-items:center;opacity:${opacity};position:relative;">
          <div style="position:relative;width:44px;height:44px;border-radius:50%;border:3px solid ${color};background:rgba(18,14,36,0.9);display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 0 12px rgba(0,0,0,0.5);">${icon}${badge}</div>
          <div style="background:rgba(18,14,36,0.9);border:1px solid ${color};color:#fff;font-size:9px;font-weight:800;padding:2px 7px;border-radius:8px;margin-top:3px;white-space:nowrap;font-family:Nunito,sans-serif;">${nom}</div>
        </div>`,
      iconSize: [60, 65],
      iconAnchor: [30, 62],
    });
  }
}