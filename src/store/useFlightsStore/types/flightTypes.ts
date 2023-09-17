export interface FlightStore {
  flights: Flight[];
  selectedFlight: Flight;
  loadFlights: (flights: Flight[]) => void;
}

export interface Flight {
  id: string;
  departureDate: Date;
  airplane: Airplane;
  route: Route;
  waypoints: Waypoint[];
}

export interface Airplane {
  icao24: string;
  model: string;
  longitude: number;
  latitude: number;
}

export interface Route {
  airports: Airport[];
}

export interface Airport {
  id: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Waypoint {
  latitude: number;
  longitude: number;
}
