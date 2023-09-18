import FlightPath from "../FlightPath/FlightPath.tsx";
import useFlightsStore from "../../store/useFlightsStore/useFlightsStore.js";
import countryAcronymTransform from "../../utils/countryAcronymTransform/countryAcronymTransform.ts";
import "./FlightStatus.css";

function FlightStatus() {
  const flight = useFlightsStore((state) => state.selectedFlight);
  const originAirport = countryAcronymTransform(flight?.route?.airports[0]);
  const destinationAirport = countryAcronymTransform(
    flight?.route?.airports[flight?.route?.airports?.length - 1]
  );
  const airplaneModel = flight?.airplane?.model ?? "Boeing 745";

  return (
    <section className={"flight-status-container"}>
      <h2 className={"flight-id"}>{airplaneModel}</h2>
      <h4
        className={"flight-journey"}
      >{`From: ${originAirport?.country} / To: ${destinationAirport?.country}`}</h4>
      <div className={"flight-path-container"}>
        <FlightPath title={"Departure"} flight={flight} />
        <FlightPath title={"Arrival"} flight={flight} />
      </div>
    </section>
  );
}

export default FlightStatus;
