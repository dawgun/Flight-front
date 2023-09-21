import mockToastify from "../../testUtils/mockReactToastify/mockReactToastify.js";
import { renderHook } from "@testing-library/react";
import useGetFlightPosition from "./useGetFlightPosition.js";
import { mockServerStreamStore } from "../../testUtils/mockUseServerStreamStore/mockUseServerStreamStore.js";
import { Mock } from "vitest";
import { flightMSW } from "../../testUtils/mockServiceWorker/handlers.js";

beforeEach(() => {
  mockServerStreamStore({});
});

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

    test("THEN should call toast error function with 'Error tracking flight'", async () => {
      const flightId = "112";
      const expectedToastError = "Error tracking flight";

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.startTrackFlight(flightId);

      expect(mockToastify.error).toHaveBeenCalledWith(expectedToastError);
    });
  });

  describe("WHEN call the stopTrackFlight function with flight id '111'", () => {
    test("THEN should call eventSource.close function", async () => {
      const flightId = "111";
      const store = mockServerStreamStore({});

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.stopTrackFlight(flightId);

      expect(store.eventSource.close).toHaveBeenCalled();
    });

    test("THEN should return the new plane position", async () => {
      const flightId = "111";
      const expectNewPlanePosition = {
        longitude: flightMSW.airplane.longitude,
        latitude: flightMSW.airplane.latitude,
      };

      const { result } = renderHook(() => useGetFlightPosition());
      const newPlanePosition = await result.current.stopTrackFlight(flightId);

      expect(newPlanePosition).toStrictEqual(expectNewPlanePosition);
    });

    test("THEN should call toast success with 'Stopped tracking flight 111'", async () => {
      const flightId = "111";
      const expectedError = `Stopped tracking flight ${flightId}`;

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.stopTrackFlight(flightId);

      expect(mockToastify.success).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("WHEN call the stopTrackFlight function with flight id '112'", () => {
    test("THEN shouldn't call eventSource.close function", async () => {
      const flightId = "112";
      const store = mockServerStreamStore({});

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.stopTrackFlight(flightId);

      expect(store.eventSource.close).not.toHaveBeenCalled();
    });

    test("THEN should call toast error with 'Error stop tracking flight 112'", async () => {
      const flightId = "112";
      const expectedError = `Error stop tracking flight ${flightId}`;

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.stopTrackFlight(flightId);

      expect(mockToastify.error).toHaveBeenCalledWith(expectedError);
    });

    test("THEN should call toast error with 'Error getting flight position 113'", async () => {
      const flightId = "113";
      const expectedError = `Error getting position flight ${flightId}`;

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.stopTrackFlight(flightId);

      expect(mockToastify.error).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("WHEN call the pauseTrackFlight function with flight id '111'", () => {
    test("THEN should call eventSource.close function", async () => {
      const flightId = "111";
      const { eventSource } = mockServerStreamStore({});

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.pauseTrackFlight(flightId);

      expect(eventSource.close).toHaveBeenCalled();
    });

    test("THEN should return a new position", async () => {
      const flightId = "111";
      const expectNewPosition = {
        longitude: flightMSW.airplane.longitude,
        latitude: flightMSW.airplane.latitude,
      };

      const { result } = renderHook(() => useGetFlightPosition());
      const newPosition = await result.current.pauseTrackFlight(flightId);

      expect(newPosition).toStrictEqual(expectNewPosition);
    });

    test("THEN should call toast success with 'Paused tracking flight 111'", async () => {
      const flightId = "111";
      const expectedError = `Paused tracking flight ${flightId}`;

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.pauseTrackFlight(flightId);

      expect(mockToastify.success).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("WHEN call the pauseTrackFlight function with flight id '112'", () => {
    test("THEN shouldn't call eventSource.close function", async () => {
      const flightId = "112";
      const { eventSource } = mockServerStreamStore({});

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.pauseTrackFlight(flightId);

      expect(eventSource.close).not.toHaveBeenCalled();
    });

    test("THEN should return error with message 'Error starting Flight'", async () => {
      const flightId = "112";
      const expectedError = `Error pause tracking flight ${flightId}`;

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.pauseTrackFlight(flightId);

      expect(mockToastify.error).toHaveBeenCalledWith(expectedError);
    });

    test("THEN should return error with message 'Error getting flight position'", async () => {
      const flightId = "113";
      const expectedError = `Error getting position flight ${flightId}`;

      const { result } = renderHook(() => useGetFlightPosition());
      await result.current.pauseTrackFlight(flightId);

      expect(mockToastify.error).toHaveBeenCalledWith(expectedError);
    });
  });
});
