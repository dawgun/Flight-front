import { create } from "zustand";
import { Flight, FlightStore } from "./types/flightTypes";

const useFlightsStore = create<FlightStore>((set) => ({
  flights: [] as Flight[],
  selectedFlight: {} as Flight,
  loadFlights: (flights) => set((state) => ({ ...state, flights: flights })),
  selectFlight: (flight) =>
    set((state) => ({ ...state, selectedFlight: flight })),
}));

export default useFlightsStore;
