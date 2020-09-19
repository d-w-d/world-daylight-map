export interface IOptions {
  tickDur: number;
  shadowOpacity: number;
  lightsOpacity: number;
  sunOpacity: number;
  precisionLat: number; // How many latitudinal degrees per point when checking solar position.
  precisionLng: number; // How may longitudial degrees per sunrise / sunset path point.
  mapWidth: number;
  mapHeight: number;
  refreshMap: boolean; // Periodically redraw map to keep current time
  refreshMapInterval: number; // Update interval
  bgColorLeft: string;
  bgColorRight: string;
  lightsColor: string;
  worldPaths: string;
  citiesDataPath: string;
}

export interface ILatLng {
  lat: number;
  lng: number;
}

export interface IXY {
  x: number;
  y: number;
}
