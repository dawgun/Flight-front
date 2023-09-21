import mockUseGetFlightPosition from "../../testUtils/mockUseGetFlightPosition/mockUseGetFlightPosition";
import { mockServerStreamStore } from "../../testUtils/mockUseServerStreamStore/mockUseServerStreamStore";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LeafletMap from "./LeafletMap";
import { mockFlight } from "../../testUtils/mockFlight/mockFlight";
import { vi } from "vitest";

describe("GIVEN the LeafletMap component", () => {
  describe("WHEN it's rendered with a flight", () => {
    const flight = mockFlight();

    test("THEN should call setFlightPosition function with a position", () => {
      const { setPlanePosition } = mockServerStreamStore({});
      const expectedPosition = [
        flight.airplane.latitude,
        flight.airplane.longitude,
      ];

      render(<LeafletMap flight={flight} />);

      expect(setPlanePosition).toHaveBeenCalledWith(expectedPosition);
    });

    test("THEN should show the line of flight path", () => {
      const { container } = render(<LeafletMap flight={flight} />);

      const LeafletMapLine = container.getElementsByClassName("map-route");
      const lineRoute = LeafletMapLine.item(0);

      expect(lineRoute).toBeTruthy();
    });

    test("THEN should change the line for new flight path", () => {
      const secondFlight = mockFlight();
      const { container, rerender } = render(<LeafletMap flight={flight} />);

      const LeafletMapLine = container.getElementsByClassName("map-route");
      const firstLineRoute = LeafletMapLine.item(0)!.getAttribute("d");

      rerender(<LeafletMap flight={secondFlight} />);

      const secondLineRoute = LeafletMapLine.item(0)!.getAttribute("d");

      expect(firstLineRoute).not.toBe(secondLineRoute);
    });

    describe("AND event source is active", () => {
      test("THEN should call onmessage function", () => {
        const eventSourceSpy = vi.spyOn(global, "EventSource");
        const mockEventSource = new EventSource("http://www.invent.com/stream");
        const flightPosition = [0, 0];
        const { setPlanePosition } = mockServerStreamStore({
          eventSource: mockEventSource,
        });

        render(<LeafletMap flight={flight} />);

        const streamEventResponse = {
          data: '{"latitude": 0 , "longitude": 0}',
        } as MessageEvent<unknown>;
        const reader = eventSourceSpy.mock.instances[0];
        reader.onmessage!(streamEventResponse);

        expect(setPlanePosition).toHaveBeenCalledWith(flightPosition);
      });
    });

    describe("AND user clicks on play button", () => {
      describe("AND start button is enabled", () => {
        test("THEN should call startFlight function with the flight id", async () => {
          render(<LeafletMap flight={flight} />);
          const playButton = screen.getByRole("img", { name: "play icon" });

          await userEvent.click(playButton);

          expect(
            mockUseGetFlightPosition.startTrackFlight
          ).toHaveBeenCalledWith(flight.id);
        });
      });

      describe("AND start button is disabled", () => {
        test("THEN shouldn't call startFlight", async () => {
          mockServerStreamStore({ isPlayed: true });

          render(<LeafletMap flight={flight} />);
          const playButton = screen.getByRole("img", { name: "play icon" });

          await userEvent.click(playButton);

          expect(
            mockUseGetFlightPosition.startTrackFlight
          ).not.toHaveBeenCalled();
        });
      });
    });

    describe("AND user clicks on stop button", () => {
      describe("AND stop button is enabled", () => {
        test("THEN should call stopFlight function with the flight id", async () => {
          mockServerStreamStore({ isPlayed: true });

          render(<LeafletMap flight={flight} />);
          const stopButton = screen.getByRole("img", { name: "stop icon" });

          await userEvent.click(stopButton);

          expect(mockUseGetFlightPosition.stopTrackFlight).toHaveBeenCalledWith(
            flight.id
          );
        });
      });

      describe("AND stop button is disabled", () => {
        test("THEN shouldn't call stopFlight", async () => {
          render(<LeafletMap flight={flight} />);
          const stopButton = screen.getByRole("img", { name: "stop icon" });

          await userEvent.click(stopButton);

          expect(
            mockUseGetFlightPosition.stopTrackFlight
          ).not.toHaveBeenCalled();
        });
      });
    });

    describe("AND user clicks on pause button", () => {
      describe("AND pause button is enabled", () => {
        test("THEN should call pauseFlight function with the flight id", async () => {
          mockServerStreamStore({ isPlayed: true });
          render(<LeafletMap flight={flight} />);
          const pauseButton = screen.getByRole("img", { name: "pause icon" });

          await userEvent.click(pauseButton);

          expect(
            mockUseGetFlightPosition.pauseTrackFlight
          ).toHaveBeenCalledWith(flight.id);
        });
      });

      describe("AND pause button is disabled", () => {
        test("THEN shouldn't call pause button", async () => {
          render(<LeafletMap flight={flight} />);
          const pauseButton = screen.getByRole("img", { name: "pause icon" });

          await userEvent.click(pauseButton);

          expect(
            mockUseGetFlightPosition.pauseTrackFlight
          ).not.toHaveBeenCalled();
        });
      });
    });
  });
});
