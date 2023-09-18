import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

test("THEN it should render the header component with the title 'Flight-Radar'", () => {
  const appTitle = "Flight-Radar";

  render(<Layout />);
  const title = screen.getByRole("heading", {
    name: appTitle,
    level: 1,
  });

  expect(title).toBeInTheDocument();
});
