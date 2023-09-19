import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { planeIcon, airportIcon } from "../../utils/mapConfig/markers.js";
import { Flight } from "../../store/useFlightsStore/types/flightTypes.js";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

interface MapProps {
  flight: Flight;
}

function Map({ flight }: MapProps) {
  const flightPosition: LatLngTuple = [
    flight.airplane.latitude,
    flight.airplane.longitude,
  ];

  return (
    <div className={"map-container"}>
      <MapContainer
        center={flightPosition}
        zoom={2}
        scrollWheelZoom={true}
        style={{ height: 600, width: 948 }}
        wheelPxPerZoomLevel={60}
        className={"map"}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={flightPosition} icon={planeIcon}></Marker>
        {flight.route.airports.map((airport) => (
          <Marker
            key={airport.id}
            position={[airport.latitude, airport.longitude]}
            icon={airportIcon}
          >
            <Popup>{`${airport.name} ${airport.city}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
