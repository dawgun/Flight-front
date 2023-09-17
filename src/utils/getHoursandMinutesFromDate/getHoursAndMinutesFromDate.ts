type TimeFix = `${string}:${string}`;

const getHoursAndMinutesFromDate = (date: Date): TimeFix => {
  const newDate = new Date(date);
  const hours = String(newDate.getUTCHours()).padStart(2, "0");
  const minutes = String(newDate.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};
export default getHoursAndMinutesFromDate;
