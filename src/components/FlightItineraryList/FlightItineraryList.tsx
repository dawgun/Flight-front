import FlightItinerary from "../FlightItinerary/FlightItinerary.tsx";
import useFlightsStore from "../../store/useFlightsStore/useFlightsStore.ts";
import "./FlightItineraryList.css";

function FlightItineraryList() {
  const listOfFlights = useFlightsStore((state) => state.flights);

  return (
    <section className={"flight-listing"}>
      <h1 className={"flight-listing__title"}>Flight listings</h1>
      <p className={"flight-listing__description"}>
        Find your flight in our list and select <strong>view on map </strong>
        to get more details of its trajectory on real time.
      </p>
      <div className={"flight-listing__direction-container"}>
        <span className={"flight-listing__from"}>From:</span>
        <span className={"flight-listing__to"}>To:</span>
      </div>
      <ul>
        {listOfFlights.map((flight) => (
          <FlightItinerary key={flight.id} flight={flight} />
        ))}
      </ul>
    </section>
  );
}

export default FlightItineraryList;
