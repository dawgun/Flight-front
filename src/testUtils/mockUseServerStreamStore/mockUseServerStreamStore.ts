import { vi } from "vitest";
import useServerStreamStore from "../../store/useServerStreamStore/useServerStreamStore.ts";
import { LatLngTuple } from "leaflet";
import { ServerStreamStore } from "../../store/useServerStreamStore/types/streamStoreTypes.ts";
import eventSource from "eventsource";

const mockEventSource = new eventSource("") as EventSource;
mockEventSource.close = vi.fn();

const mockUseServerStreamStore = (
  planePosition: LatLngTuple,
  eventSource: EventSource
): ServerStreamStore => ({
  eventSource,
  planePosition,
  startFlight: vi.fn(),
  setPlanePosition: vi.fn(),
});

const originalStore = useServerStreamStore.getState();

export const resetServerStreamStore = () =>
  useServerStreamStore.setState(originalStore);
export const mockServerStreamStore = ({
  planePosition = [0, 0],
  eventSource = mockEventSource,
}: Omit<Partial<ServerStreamStore>, "setPlanePosition">) => {
  const store = mockUseServerStreamStore(planePosition, eventSource);
  useServerStreamStore.setState(store);
  return store;
};
