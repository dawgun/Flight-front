import { create } from "zustand";
import { Flight, FlightStore } from "./types/flightTypes";

const useFlightsStore = create<FlightStore>((set) => ({
  flights: [] as Flight[],
  selectedFlight: {} as Flight,
  loadFlights: (flights) => set((state) => ({ ...state, flights: flights })),
  selectFlight: (flight) =>
    set((state) => ({ ...state, selectedFlight: flight })),
  updateFlight: (flightId, newFlightPosition) =>
    set((state) => ({
      ...state,
      flights: state.flights.map((flight) => {
        if (flight.id === flightId) {
          flight.airplane.latitude = newFlightPosition.latitude;
          flight.airplane.longitude = newFlightPosition.longitude;
        }
        return flight;
      }),
    })),
}));

export default useFlightsStore;
