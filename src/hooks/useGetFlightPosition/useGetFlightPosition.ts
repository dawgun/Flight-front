import useServerStreamStore from "../../store/useServerStreamStore/useServerStreamStore.js";
import { toast } from "react-toastify";

const useGetFlightPosition = () => {
  const backend = import.meta.env.VITE_BACKEND_HOST;
  const { startFlight } = useServerStreamStore();

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

  return { startTrackFlight };
};

export default useGetFlightPosition;
