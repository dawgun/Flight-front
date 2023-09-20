import "@testing-library/jest-dom";
import { server } from "./src/testUtils/mockServiceWorker/server";
import { vi, beforeAll, beforeEach, afterAll, afterEach } from "vitest";
import { resetFlightStore } from "./src/testUtils/mockUseFlightsStore/mockUseFlightsStore";
import eventsource from "eventsource";

Object.defineProperty(window, "EventSource", {
  value: eventsource,
});

beforeAll(() => server.listen());

beforeEach(() => {
  resetFlightStore();
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  resetFlightStore();
  server.close();
});
