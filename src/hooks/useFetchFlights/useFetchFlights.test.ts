import "../../testUtils/mockReactTostify/mockReactTostify";
import { mockFlightStore } from "../../testUtils/mockUseFlightsStore/mockUseFlightsStore";
import { renderHook } from "@testing-library/react";
import useFetchFlights from "./useFetchFlights.js";
import useFlightsStore from "../../store/useFlightsStore/useFlightsStore.js";
import { Mock } from "vitest";
import { toast } from "react-toastify";

beforeEach(() => {
  mockFlightStore();
});

describe("GIVEN the useFetchFlights custom hook", () => {
  describe("WHEN call the getFlights function with fetch error", () => {
    test("THEN shouldn't call loadFlights function the list of flights received", async () => {
      const { loadFlights } = useFlightsStore.getState();

      const { result } = renderHook(() => useFetchFlights());
      await result.current.getFlights();

      expect(loadFlights).not.toHaveBeenCalled();
    });

    test("THEN shouldn't call loadFlights function the list of flights received", async () => {
      const expectedToastError = "Error loading flights";

      const { result } = renderHook(() => useFetchFlights());
      await result.current.getFlights();

      expect(toast.error).toHaveBeenCalledWith(expectedToastError);
    });
  });

  describe("WHEN call the getFlights function with correct fetch", () => {
    test("THEN should call loadFlights function the list of flights received", async () => {
      const { loadFlights } = useFlightsStore.getState();

      const { result } = renderHook(() => useFetchFlights());
      await result.current.getFlights();

      const expectedFlights = (loadFlights as Mock).mock.calls[0][0];

      expect(loadFlights).toHaveBeenCalledWith(expectedFlights);
    });

    test("THEN should call toast with 'Flights Loaded'", async () => {
      const expectedSuccessToast = "Flights Loaded";

      const { result } = renderHook(() => useFetchFlights());
      await result.current.getFlights();

      expect(toast.success).toHaveBeenCalledWith(expectedSuccessToast);
    });
  });
});
