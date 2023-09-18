import { mockFlightStore } from "../../testUtils/mockUseFlightsStore/mockUseFlightsStore.ts";
import { render, screen } from "@testing-library/react";
import FlightStatus from "./FlightStatus.tsx";
import {
  mockFlight,
  mockFlightAirport,
} from "../../testUtils/mockFlight/mockFlight.ts";

describe("GIVEN the FlightStatus component", () => {
  describe("WHEN it's instantiated with route in store", () => {
    test("THEN should render a heading level 2 with 'Boeing_727'", () => {
      const titleText = "Boeing_727";
      const flight = mockFlight();
      flight.airplane.model = titleText;
      mockFlightStore({ selectedFlight: flight });

      render(<FlightStatus />);
      const title = screen.getByRole("heading", { name: titleText, level: 2 });

      expect(title).toBeInTheDocument();
    });

    test("THEN should render a heading level 4 with 'From: Spain / To: Portugal'", () => {
      const titleText = "From: Spain / To: Portugal";
      const flight = mockFlightAirport({ country: "ES" }, { country: "PT" });
      mockFlightStore({ selectedFlight: flight });

      render(<FlightStatus />);
      const title = screen.getByRole("heading", { name: titleText, level: 4 });

      expect(title).toBeInTheDocument();
    });

    test("THEN should render a heading level 4 with 'Departure'", () => {
      const titleText = "Departure";

      render(<FlightStatus />);
      const title = screen.getByRole("heading", { name: titleText, level: 4 });

      expect(title).toBeInTheDocument();
    });
  });
});
