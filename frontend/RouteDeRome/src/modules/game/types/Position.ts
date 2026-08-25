export class Position {
  readonly lat: number;
  readonly lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }

  // Formule de Haversine : distance réelle à la surface de la Terre, renvoyée en mètres.
  distanceTo(autre: Position): number {
    const R = 6371000;
    const dLat = this.toRad(autre.lat - this.lat);
    const dLng = this.toRad(autre.lng - this.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(this.lat)) *
        Math.cos(this.toRad(autre.lat)) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }
}