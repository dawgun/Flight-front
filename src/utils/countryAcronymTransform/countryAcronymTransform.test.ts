import { mockAirport } from "../../testUtils/mockFlight/mockFlight";
import countryAcronymTransform from "./countryAcronymTransform";

describe("GIVEN the countryAcronymTransform function", () => {
  describe("WHEN it's called with an airport with country 'ES'", () => {
    test("THEN should return the same airport with country changed to 'Spain'", () => {
      const countryAcronym = "ES";
      const airport = mockAirport({ country: countryAcronym });
      const expectedCountry = "Spain";

      const airportFixed = countryAcronymTransform(airport);

      expect(airportFixed.country).toBe(expectedCountry);
    });
  });
});
