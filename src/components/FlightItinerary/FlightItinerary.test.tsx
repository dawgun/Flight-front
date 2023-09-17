import { render, screen } from "@testing-library/react";
import {
  mockFlightAirport,
  mockFlight,
  mockCustomFlight,
} from "../../testUtils/mockFlight/mockFlight.ts";
import FlightItinerary from "./FlightItinerary.tsx";

describe("GIVEN the FlightItinerary component", () => {
  describe("WHEN it's instanced with a flight", () => {
    test("THEN it should render the originAirport with the text 'Madrid'", () => {
      const originAirportText = "Lisboa";
      const flight = mockFlightAirport({ city: originAirportText });

      render(<FlightItinerary flight={flight} />);

      const originAirport = screen.getByText(originAirportText);

      expect(originAirport).toBeInTheDocument();
    });

    test("THEN it should render the destinationAirport with the text 'Barcelona'", () => {
      const destinationAirportText = "Barcelona";
      const flight = mockFlightAirport({}, { city: destinationAirportText });

      render(<FlightItinerary flight={flight} />);

      const destinationAirport = screen.getByText(destinationAirportText);

      expect(destinationAirport).toBeInTheDocument();
    });

    test("THEN it should render the departureTime with the text '06:45'", () => {
      const departureDate = "2023-08-09T06:45:00.000Z" as unknown as Date;
      const departureTimeText = "06:45";
      const flight = mockCustomFlight({ departureDate: departureDate });

      render(<FlightItinerary flight={flight} />);

      const departureTime = screen.getAllByText(departureTimeText);

      expect(departureTime[0]).toBeInTheDocument();
    });

    test("THEN it should render the arrivalTime with the text '06:45'", () => {
      const departureDate = "2023-08-09T06:45:00.000Z" as unknown as Date;
      const arrivalTimeText = "06:45";
      const flight = mockCustomFlight({ departureDate: departureDate });

      render(<FlightItinerary flight={flight} />);

      const arrivalTime = screen.getAllByText(arrivalTimeText);

      expect(arrivalTime[1]).toBeInTheDocument();
    });

    test("THEN it should render the two clock icons with the alt text 'Icon of time'", () => {
      const altText = "Icon of time";
      const flight = mockFlight();

      render(<FlightItinerary flight={flight} />);

      const clockIcons = screen.getAllByAltText(altText);

      expect(clockIcons).toHaveLength(2);
    });

    test("THEN it should render the arrow icon with the alt text 'Icon of arrows'", () => {
      const altText = "Icon of arrows";
      const flight = mockFlight();

      render(<FlightItinerary flight={flight} />);

      const arrowIcons = screen.getByAltText(altText);

      expect(arrowIcons).toBeInTheDocument();
    });
  });
});
