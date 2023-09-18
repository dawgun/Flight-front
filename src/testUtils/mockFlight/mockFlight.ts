import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import {
  Airport,
  Flight,
  Waypoint,
} from "../../store/useFlightsStore/types/flightTypes";

const numberOfFlights = 2;

const airportFactory = Factory.define<Airport>(() => ({
  id: faker.database.mongodbObjectId(),
  name: faker.airline.airport().name,
  city: faker.location.city(),
  country: faker.location.countryCode(),
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
}));

const waypointFactory = Factory.define<Waypoint>(() => ({
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
}));

const flightFactory = Factory.define<Flight>(() => ({
  id: faker.database.mongodbObjectId(),
  airplane: {
    model: faker.airline.airplane().name,
    icao24: faker.airline.airplane().iataTypeCode,
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  },
  departureDate: faker.date.anytime(),
  route: { airports: airportFactory.buildList(2) },
  waypoints: waypointFactory.buildList(2),
}));

export const mockAirport = (airport?: Partial<Airport>) =>
  airportFactory.build(airport);
export const mockFlight = () => flightFactory.build();
export const mockCustomFlight = (flight: Partial<Flight>) =>
  flightFactory.build(flight);
export const mockFlights = () => flightFactory.buildList(numberOfFlights);
export const mockFlightAirport = (
  originAirport: Partial<Airport>,
  destinationAirport?: Partial<Airport>
) =>
  flightFactory.build({
    route: {
      airports: [
        airportFactory.build(originAirport),
        airportFactory.build(destinationAirport),
      ],
    },
  });
