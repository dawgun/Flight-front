import { icon } from "leaflet";
import plane from "/assets/plane-with-marker.svg";
import airport from "/assets/airport.svg";

export const planeIcon = icon({
  iconUrl: plane,
  iconSize: [38, 50],
  iconAnchor: [0, 52],
  popupAnchor: [20, -50],
  shadowSize: [50, 64],
  shadowAnchor: [4, 62],
  className: "plane",
});

export const airportIcon = icon({
  iconUrl: airport,
  iconSize: [38, 50],
  popupAnchor: [-5, -20],
  shadowSize: [50, 64],
  shadowAnchor: [4, 62],
  className: "airport",
});

export const splineOptions = {
  color: "black",
  weight: 1,
  smoothing: 0.1,
  className: "map-route",
};
