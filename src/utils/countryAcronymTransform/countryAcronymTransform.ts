import { Airport } from "../../store/useFlightsStore/types/flightTypes";

const countryAcronymTransform = (airport: Airport) => {
  if (airport?.country === undefined) {
    return airport;
  }
  const countryFixer = new Intl.DisplayNames(["en"], { type: "region" });

  return { ...airport, country: countryFixer.of(airport.country) };
};

export default countryAcronymTransform;
