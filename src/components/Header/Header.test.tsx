import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("GIVEN the Header component", () => {
  describe("WHEN it's instanced", () => {
    test("THEN it should render the logo with the alt text 'Logo of flight-radar web'", () => {
      const altText = "Logo of flight-radar web";

      render(<Header />);
      const logo = screen.getByAltText(altText);

      expect(logo).toBeInTheDocument();
    });

    test("THEN it should render the title with the text 'Flight-Radar'", () => {
      const titleText = "Flight-Radar";

      render(<Header />);
      const title = screen.getByRole("heading", { name: titleText, level: 1 });

      expect(title).toBeInTheDocument();
    });
  });
});
