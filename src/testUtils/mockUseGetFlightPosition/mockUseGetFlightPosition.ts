import { vi } from "vitest";

const mockUseGetFlightPosition = {
  startTrackFlight: vi.fn(),
  stopTrackFlight: vi.fn(),
  pauseTrackFlight: vi.fn(),
};

vi.mock("../../hooks/useGetFlightPosition/useGetFlightPosition.ts", () => ({
  default: () => ({
    startTrackFlight: mockUseGetFlightPosition.startTrackFlight,
    stopTrackFlight: mockUseGetFlightPosition.stopTrackFlight.mockResolvedValue(
      {
        latitude: 1,
        longitude: 2,
      }
    ),
    pauseTrackFlight:
      mockUseGetFlightPosition.pauseTrackFlight.mockResolvedValue({
        latitude: 1,
        longitude: 2,
      }),
  }),
}));

export default mockUseGetFlightPosition;
