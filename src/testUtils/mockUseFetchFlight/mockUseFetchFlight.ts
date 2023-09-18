import { vi } from "vitest";

const mockUseFetchFlights = {
  getFlights: vi.fn(),
};

vi.mock("../../hooks/useFetchFlights/useFetchFlights.ts", () => ({
  default: () => ({
    getFlights: mockUseFetchFlights.getFlights,
  }),
}));

export default mockUseFetchFlights;
