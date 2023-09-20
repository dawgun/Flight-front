import { create } from "zustand";
import { ServerStreamStore } from "./types/types";

const useServerStreamStore = create<ServerStreamStore>((set) => ({
  planePosition: [0, 0],
  setPlanePosition: (newFlightPosition) =>
    set((state) => ({ ...state, planePosition: newFlightPosition })),
}));

export default useServerStreamStore;
