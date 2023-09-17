import getHoursAndMinutesFromDate from "./getHoursAndMinutesFromDate.js";

describe("GIVEN the function getHoursAndMinutesFromDate", () => {
    describe("WHEN it's called with the date '2021-09-01T10:00:00.000Z'", () => {
        test("THEN it should return '10:00'", () => {
            const date = new Date("2021-09-01T10:00:00.000Z");
            const expectedTime = "10:00";

            const fixedTime = getHoursAndMinutesFromDate(date);

            expect(fixedTime).toBe(expectedTime);
        })
    });
})
