import FlightPath from "./FlightPath.tsx";
import { render, screen } from "@testing-library/react";
import { mockFlight } from "../../testUtils/mockFlight/mockFlight.ts";

describe("GIVEN the FlightPath component", () => {
  describe("WHEN it's instanced with a flight and the title 'Departure'", () => {
    test("THEN it should render the title 'Departure'", () => {
      const titleText = "Departure";
      const flight = mockFlight();

      render(<FlightPath flight={flight} planeName={titleText} />);

      const title = screen.getByRole("heading", { name: titleText, level: 4 });

      expect(title).toBeInTheDocument();
    });

    test("THEN it should render the city of the origin airport", () => {
      const titleText = "Departure";
      const flight = mockFlight();
      const time = new Date(flight.departureDate).toUTCString();
      const originAirport = flight.route.airports[0];

      render(<FlightPath planeName={titleText} flight={flight} />);

      const cityElement = screen.getByText(originAirport.city);
      const airportElement = screen.getByText(originAirport.name);
      const timeElement = screen.getByText(time);

      expect(cityElement).toBeInTheDocument();
      expect(airportElement).toBeInTheDocument();
      expect(timeElement).toBeInTheDocument();
    });
  });

  describe("WHEN it's instanced with a flight and the title 'Arrival'", () => {
    test("THEN it should render the title 'Arrival'", () => {
      const titleText = "Arrival";
      const flight = mockFlight();

      render(<FlightPath flight={flight} planeName={titleText} />);

      const title = screen.getByRole("heading", { name: titleText, level: 4 });

      expect(title).toBeInTheDocument();
    });

    test("THEN it should render the city of the destination airport", () => {
      const titleText = "Arrival";
      const time = "Invalid Date";
      const flight = mockFlight();

      const destinationAirport =
        flight.route.airports[flight.route.airports.length - 1];

      render(<FlightPath planeName={titleText} flight={flight} />);

      const cityElement = screen.getByText(destinationAirport.city);
      const airportElement = screen.getByText(destinationAirport.name);
      const timeElement = screen.getByText(time);

      expect(cityElement).toBeInTheDocument();
      expect(airportElement).toBeInTheDocument();
      expect(timeElement).toBeInTheDocument();
    });
  });
});
