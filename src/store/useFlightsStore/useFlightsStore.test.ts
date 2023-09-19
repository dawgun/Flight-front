import useFlightsStore from "./useFlightsStore.js";
import {
  mockFlight,
  mockFlights,
} from "../../testUtils/mockFlight/mockFlight.js";

describe("GIVEN the function reducer loadFlights", () => {
  describe("WHEN it's called with flights", () => {
    test("THEN should return the same state with new flights", () => {
      const flights = mockFlights();

      useFlightsStore.getState().loadFlights(flights);
      const newFlights = useFlightsStore.getState().flights;

      expect(newFlights).toStrictEqual(flights);
    });
  });
});

describe("GIVEN the function reducer selectFlight", () => {
  describe("WHEN it's called with a flight", () => {
    test("THEN should return the same state with selected flight", () => {
      const flight = mockFlight();
      useFlightsStore.getState().selectFlight(flight);

      const flightSelected = useFlightsStore.getState().selectedFlight;

      expect(flightSelected).toStrictEqual(flight);
    });
  });
});
