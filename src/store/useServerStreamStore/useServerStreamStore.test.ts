import { LatLngTuple } from "leaflet";
import useServerStreamStore from "./useServerStreamStore.js";

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
