import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  planeIcon,
  airportIcon,
  splineOptions,
} from "../../utils/mapConfig/mapConfig.js";
import { Flight } from "../../store/useFlightsStore/types/flightTypes.js";
import { LatLngTuple } from "leaflet";
import { useRef, useEffect, useState } from "react";
import { Spline, spline } from "leaflet-spline";
import useServerStreamStore from "../../store/useServerStreamStore/useServerStreamStore.js";
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";

interface MapProps {
  flight: Flight;
}

function LeafletMap({ flight }: MapProps) {
  const { planePosition, setPlanePosition } = useServerStreamStore();
  const [mapLeaflet, setMapLeaflet] = useState({} as L.Map);
  const splineRef = useRef({} as Spline);

  useEffect(() => {
    const newPlanePosition: LatLngTuple = [
      flight.airplane.latitude,
      flight.airplane.longitude,
    ];
    setPlanePosition(newPlanePosition);
  }, [setPlanePosition, flight.airplane.latitude, flight.airplane.longitude]);

  const pathFlight: LatLngTuple[] = flight.waypoints.map((waypoint) => {
    const latitude = waypoint?.latitude;
    const longitude = waypoint?.longitude;
    return [latitude, longitude];
  });

  if (Object.keys(splineRef.current).length > 0) {
    splineRef.current.removeFrom(mapLeaflet!);
  }

  if (Object.keys(mapLeaflet!).length > 0) {
    const pathLine = spline(pathFlight, splineOptions);
    pathLine.addTo(mapLeaflet!);
    splineRef.current = pathLine;
  }

  return (
    <div className={"map-container"}>
      <MapContainer
        ref={(map) => {
          if (map !== null) setMapLeaflet(map);
        }}
        center={planePosition}
        zoom={2}
        scrollWheelZoom={true}
        style={{ height: 600, width: 948 }}
        wheelPxPerZoomLevel={60}
        className={"map"}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={planePosition} icon={planeIcon}></Marker>
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

export default LeafletMap;
