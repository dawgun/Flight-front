/* eslint-disable prefer-rest-params */
import "@testing-library/jest-dom";
import { server } from "./src/testUtils/mockServiceWorker/server";
import { vi, beforeAll, beforeEach, afterAll, afterEach } from "vitest";
import { resetFlightStore } from "./src/testUtils/mockUseFlightsStore/mockUseFlightsStore";
import { resetServerStreamStore } from "./src/testUtils/mockUseServerStreamStore/mockUseServerStreamStore";
import eventsource from "eventsource";

global.EventSource = eventsource;

beforeAll(() => server.listen());

beforeEach(() => {
  resetFlightStore();
  resetServerStreamStore();
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  resetFlightStore();
  resetServerStreamStore();
  server.close();
});

const createElementNSOrig = global.document.createElementNS;
global.document.createElementNS = function (namespaceURI, qualifiedName) {
  if (
    namespaceURI === "http://www.w3.org/2000/svg" &&
    qualifiedName === "svg"
  ) {
    const element = createElementNSOrig.apply(this, arguments);
    element.createSVGRect = function () {};
    return element;
  }
  return createElementNSOrig.apply(this, arguments);
};
