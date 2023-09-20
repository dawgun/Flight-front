import mockToastify from "../../testUtils/mockReactToastify/mockReactToastify.js";
import { renderHook } from "@testing-library/react";
import useGetFlightPosition from "./useGetFlightPosition.js";
import { mockServerStreamStore } from "../../testUtils/mockUseServerStreamStore/mockUseServerStreamStore.js";
import { Mock } from "vitest";

describe("GIVEN the custom hook useGetFlightPosition", () => {
  describe("WHEN call the startTrackFlight function with flight id '111'", () => {
    test("THEN should call runFlight function with a new event source", async () => {
      const flightId = "111";
      const { startFlight } = mockServerStreamStore({});

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.startTrackFlight(flightId);

      const expectedEventSourceUrl = (startFlight as Mock).mock.calls[0][0].url;

      expect(startFlight).toHaveBeenCalled();
      expect(expectedEventSourceUrl).toContain(flightId);
    });

    test("THEN should call toast success function with 'Tracking flight 111'", async () => {
      const flightId = "111";
      const expectedToastText = "Tracking flight 111";

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.startTrackFlight(flightId);

      expect(mockToastify.success).toHaveBeenCalledWith(expectedToastText);
    });
  });

  describe("WHEN call the startFlight function with flight id '112'", () => {
    test("THEN shouldn't call runFlight function with a new event source", async () => {
      const flightId = "112";
      const { startFlight } = mockServerStreamStore({});

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.startTrackFlight(flightId);

      expect(startFlight).not.toHaveBeenCalled();
    });

    test("THEN should call toast error function with a new event source", async () => {
      const flightId = "112";
      const expectedToastError = "Error tracking flight";

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.startTrackFlight(flightId);

      expect(mockToastify.error).toHaveBeenCalledWith(expectedToastError);
    });
  });
});
