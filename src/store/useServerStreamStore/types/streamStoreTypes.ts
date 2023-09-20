import { LatLngTuple } from "leaflet";

export interface ServerStreamStore {
  eventSource: EventSource;
  planePosition: LatLngTuple;
  setPlanePosition: (newPlanePosition: LatLngTuple) => void;
  startFlight: (eventSource: EventSource) => void;
}
