import { LatLngTuple } from "leaflet";

export interface ServerStreamStore {
  planePosition: LatLngTuple;
  setPlanePosition: (newPlanePosition: LatLngTuple) => void;
}
