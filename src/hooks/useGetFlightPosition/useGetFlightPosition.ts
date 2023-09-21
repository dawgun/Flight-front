import useServerStreamStore from "../../store/useServerStreamStore/useServerStreamStore.ts";
import { toast } from "react-toastify";

const useGetFlightPosition = () => {
  const backend = import.meta.env.VITE_BACKEND_HOST;
  const { startFlight, eventSource } = useServerStreamStore();

  const startTrackFlight = async (flightId: string) => {
    const serverStream = `${backend}/flights/${flightId}/stream`;

    const connectEventSource = new EventSource(serverStream);

    try {
      const response = await fetch(`${backend}/flights/${flightId}/start`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Error starting flight");
      }

      startFlight(connectEventSource);
      toast.success(`Tracking flight ${flightId}`);
    } catch (error) {
      toast.error("Error tracking flight");
    }
  };

  const stopTrackFlight = async (flightId: string) => {
    try {
      const responseStop = await fetch(`${backend}/flights/${flightId}/stop`, {
        method: "PUT",
      });

      if (!responseStop.ok) {
        throw new Error(`Error stop tracking flight ${flightId}`);
      }

      eventSource.close();

      const responseGetPositionFlight = await fetch(
        `${backend}/flights/${flightId}`
      );

      if (!responseGetPositionFlight.ok) {
        throw new Error(`Error getting position flight ${flightId}`);
      }

      const flightUpdated = await responseGetPositionFlight.json();

      toast.success(`Stopped tracking flight ${flightId}`);

      return {
        longitude: flightUpdated.airplane.longitude,
        latitude: flightUpdated.airplane.latitude,
      };
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }
  };

  return { startTrackFlight, stopTrackFlight };
};

export default useGetFlightPosition;
