import mockUseFetchFlights from "../../testUtils/mockUseFetchFlight/mockUseFetchFlight.ts";
import { render, screen } from "@testing-library/react";
import App from "./App.js";

describe("GIVEN the App component", () => {
  describe("WHEN it's instanced", () => {
    test("THEN it should render the title of the flight itinerary list component with the text 'Flight listings'", () => {
      const titleText = "Flight listings";

      render(<App />);

      const title = screen.getByRole("heading", { name: titleText, level: 1 });

      expect(title).toBeInTheDocument();
    });

    test("THEN it should call the getFlight function with empty call", () => {
      render(<App />);

      expect(mockUseFetchFlights.getFlights).toHaveBeenCalledWith();
    });
  });
});
