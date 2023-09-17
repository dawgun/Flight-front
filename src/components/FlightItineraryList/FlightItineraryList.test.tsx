import { mockFlightAirport } from "../../testUtils/mockFlight/mockFlight.ts";
import { render, screen } from "@testing-library/react";
import FlightItineraryList from "./FlightItineraryList.tsx";
import { mockFlightStore } from "../../testUtils/mockUseFlightsStore/mockUseFlightsStore.ts";

describe("GIVEN the FlightItineraryList component", () => {
  describe("WHEN it's instanced", () => {
    test("THEN it should render the title with the text 'Flight listings'", () => {
      const titleText = "Flight listings";

      render(<FlightItineraryList />);
      const title = screen.getByRole("heading", { name: titleText, level: 1 });

      expect(title).toBeInTheDocument();
    });

    test("THEN it should render the two FlightItinerary component", () => {
      mockFlightStore();

      render(<FlightItineraryList />);
      const flightItinerary = screen.getAllByTestId("flight-itinerary");

      expect(flightItinerary).toHaveLength(2);
    });

    test("THEN it should render the text 'Barcelona'", () => {
      const destinationAirportText = "Barcelona";
      const flights = mockFlightAirport({ city: destinationAirportText });
      mockFlightStore([flights]);

      render(<FlightItineraryList />);
      const destinationAirport = screen.getByText(destinationAirportText);

      expect(destinationAirport).toBeInTheDocument();
    });
  });
});
