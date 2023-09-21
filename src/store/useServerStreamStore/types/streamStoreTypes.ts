import { LatLngTuple } from "leaflet";

export interface ServerStreamStore {
  eventSource: EventSource;
  planePosition: LatLngTuple;
  isPlayed: boolean;
  setPlanePosition: (newPlanePosition: LatLngTuple) => void;
  startFlight: (eventSource: EventSource) => void;
  runPlay: () => void;
  stopPlay: () => void;
}
