import "./FlightItinerary.css";
import clock from "/assets/clock.svg";
import arrows from "/assets/arrows.svg";
import getHoursAndMinutesFromDate from "../../utils/getHoursandMinutesFromDate/getHoursAndMinutesFromDate.js";
import { Flight } from "../../store/useFlightsStore/types/flightTypes.js";

interface FlightItineraryProps {
  flight: Flight;
}

function FlightItinerary({ flight }: FlightItineraryProps) {
  const {
    route: { airports },
    departureDate,
  } = flight;
  const departureTime = getHoursAndMinutesFromDate(departureDate);
  const arrivalTime = getHoursAndMinutesFromDate(departureDate);

  const originAirport = airports[0]?.city;
  const destinationAirport = airports[airports.length - 1]?.city;

  return (
    <li data-testid={`flight-itinerary`} className={`flight-itinerary`}>
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
