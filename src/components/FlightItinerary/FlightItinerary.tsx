import getHoursAndMinutesFromDate from "../../utils/getHoursandMinutesFromDate/getHoursAndMinutesFromDate.ts";
import { Flight } from "../../store/useFlightsStore/types/flightTypes.ts";
import useFlightsStore from "../../store/useFlightsStore/useFlightsStore.ts";
import clock from "/assets/clock.svg";
import arrows from "/assets/arrows.svg";
import "./FlightItinerary.css";
import useServerStreamStore from "../../store/useServerStreamStore/useServerStreamStore.ts";
import useGetFlightPosition from "../../hooks/useGetFlightPosition/useGetFlightPosition.ts";

interface FlightItineraryProps {
  flight: Flight;
}

function FlightItinerary({ flight }: FlightItineraryProps) {
  const { selectFlight, selectedFlight, updateFlight } = useFlightsStore();
  const { eventSource, stopPlay } = useServerStreamStore();
  const { pauseTrackFlight } = useGetFlightPosition();

  const {
    route: { airports },
    departureDate,
  } = flight;
  const departureTime = getHoursAndMinutesFromDate(departureDate);
  const arrivalTime = getHoursAndMinutesFromDate(departureDate);
  const originAirport = airports[0]?.city;
  const selectedThisFlight =
    selectedFlight?.id === flight?.id ? " flight--selected" : "";
  const destinationAirport = airports[airports.length - 1]?.city;

  const handlerSelectFlight = async () => {
    if (eventSource?.url?.includes("stream")) {
      const newPosition = await pauseTrackFlight(flight.id);
      if (newPosition !== undefined) {
        updateFlight(flight.id, newPosition);
        stopPlay();
      }
    }
    selectFlight(flight);
  };

  return (
    <li
      onClick={handlerSelectFlight}
      className={`flight-itinerary${selectedThisFlight}`}
      data-testid={`flight-itinerary`}
    >
      <span className={"flight-itinerary__country"}>{originAirport}</span>
      <div className={"flight-itinerary__container"}>
        <div className={"flight-itinerary__time-container"}>
          <img src={clock} height={23} width={23} alt={"Icon of time"}></img>
          <span>{departureTime}</span>
        </div>
        <img src={arrows} height={30} width={30} alt={"Icon of arrows"} />
        <span className={"flight-itinerary__country"}>
          {destinationAirport}
        </span>
      </div>
      <div className={"flight-itinerary__time-container"}>
        <img src={clock} height={23} width={23} alt={"Icon of time"}></img>
        <span>{arrivalTime}</span>
      </div>
    </li>
  );
}

export default FlightItinerary;
