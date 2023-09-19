import { useCallback } from "react";
import useFlightsStore from "../../store/useFlightsStore/useFlightsStore.js";
import { toast } from "react-toastify";
import { Flight } from "../../store/useFlightsStore/types/flightTypes.js";

const useFetchFlights = () => {
  const { loadFlights, selectFlight } = useFlightsStore();
  const backend = import.meta.env.VITE_BACKEND_HOST;

  const getFlights = useCallback(async () => {
    try {
      const response = await fetch(`${backend}/flights`);

      if (!response.ok) {
        throw new Error("Error fetching flights");
      }

      const flights: Flight[] = await response.json();

      loadFlights(flights);
      selectFlight(flights[0]);
      toast.success("Flights Loaded");
    } catch (error) {
      toast.error("Error loading flights");
    }
  }, [backend, loadFlights, selectFlight]);

  return { getFlights };
};

export default useFetchFlights;
