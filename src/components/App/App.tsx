import { useEffect } from "react";
import useFetchFlights from "../../hooks/useFetchFlights/useFetchFlights";
import FlightItineraryList from "../FlightItineraryList/FlightItineraryList";
import "./App.css";
import FlightStatus from "../FlightStatus/FlightStatus";

function App() {
  const { getFlights } = useFetchFlights();

  useEffect(() => {
    getFlights();
  }, [getFlights]);

  return (
    <main className={"flight-app"}>
      <FlightStatus />
      <FlightItineraryList />
    </main>
  );
}

export default App;
