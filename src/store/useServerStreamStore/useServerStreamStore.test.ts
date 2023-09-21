import { LatLngTuple } from "leaflet";
import useServerStreamStore from "./useServerStreamStore.ts";

describe("GIVEN the function reducer setFlightPosition", () => {
  describe("WHEN it's called with a flight position", () => {
    test("THEN should return the same state with new flight position", () => {
      const newFlightPosition: LatLngTuple = [1, 1];

      useServerStreamStore.getState().setPlanePosition(newFlightPosition);
      const newFlights = useServerStreamStore.getState().planePosition;

      expect(newFlights).toStrictEqual(newFlightPosition);
    });
  });
});

describe("GIVEN the function reducer startFlight", () => {
  describe("WHEN it's called with a event source stream", () => {
    test("THEN should return the same state with new event source stream", () => {
      const eventSource = { url: "http://www.flightstream.com" } as EventSource;

      useServerStreamStore.getState().startFlight(eventSource);
      const newEventSource = useServerStreamStore.getState().eventSource;

      expect(newEventSource).toStrictEqual(eventSource);
    });
  });
});

describe("GIVEN the function reducer runPlay", () => {
  describe("WHEN it's called", () => {
    test("THEN should return the same state with isPlayed to be 'true'", () => {
      useServerStreamStore.getState().runPlay();
      const newIsPlayed = useServerStreamStore.getState().isPlayed;

      expect(newIsPlayed).toBe(true);
    });
  });
});

describe("GIVEN the function reducer stopPlay", () => {
  describe("WHEN it's called", () => {
    test("THEN should return the same state with isPlayed to be 'false'", () => {
      useServerStreamStore.getState().stopPlay();
      const newIsPlayed = useServerStreamStore.getState().isPlayed;

      expect(newIsPlayed).toBe(false);
    });
  });
});
