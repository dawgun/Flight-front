import {
  Flight,
  FlightStore,
} from "../../store/useFlightsStore/types/flightTypes";
import useFlightsStore from "../../store/useFlightsStore/useFlightsStore";
import { mockFlight, mockFlights } from "../mockFlight/mockFlight";

const mockStore = (flights: Flight[], selectedFlight: Flight): FlightStore => ({
  flights: flights,
  selectedFlight: selectedFlight,
  loadFlights: vi.fn(),
  selectFlight: vi.fn(),
  updateFlight: vi.fn(),
});

const originalStore = useFlightsStore.getState();
const listOfFlights = mockFlights();
const flight = mockFlight();

export const resetFlightStore = () => useFlightsStore.setState(originalStore);
export const mockFlightStore = ({
  flights = listOfFlights,
  selectedFlight = flight,
}: Omit<Partial<FlightStore>, "loadFlights">) => {
  const store = mockStore(flights, selectedFlight);
  useFlightsStore.setState(store);
  return store;
};
