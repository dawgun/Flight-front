import { create } from "zustand";
import { Flight, FlightStore } from "./types/flightTypes";

const useFlightsStore = create<FlightStore>((set) => ({
  flights: [] as Flight[],
  selectedFlight: {} as Flight,
  loadFlights: (flights: Flight[]): void =>
    set((state) => ({ ...state, flights: flights })),
}));

export default useFlightsStore;
