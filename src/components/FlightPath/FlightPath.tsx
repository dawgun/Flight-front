import { Flight } from "../../store/useFlightsStore/types/flightTypes";
import "./FlightPath.css";

interface FlightPathProps {
  flight: Flight;
  title: string;
}

function FlightPath({ flight, title }: FlightPathProps) {
  const originAirport = flight?.route?.airports[0];
  const destinationAirport =
    flight?.route?.airports[flight?.route?.airports.length - 1];
  const cityAirport =
    title === "Departure" ? originAirport : destinationAirport;
  const dateTime =
    title === "Departure" ? flight?.departureDate : "Flight Delayed";
  const fixDateTime = new Date(dateTime).toUTCString();

  return (
    <div className={"flight-card"}>
      <h4 className={"flight-title"}>{title}</h4>
      <div className={"flight-info"}>
        <span className={"flight-data"}>
          <span className="bold-text">City:</span> {cityAirport?.city}
        </span>
        <span className={"flight-data"}>
          <span className="bold-text">Airport:</span> {cityAirport?.name}
        </span>
        <span className={"flight-data"}>
          <span className="bold-text">Time:</span> {fixDateTime}
        </span>
      </div>
    </div>
  );
}

export default FlightPath;
