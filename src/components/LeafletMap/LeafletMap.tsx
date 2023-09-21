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
import useGetFlightPosition from "../../hooks/useGetFlightPosition/useGetFlightPosition.js";
import play from "/assets/play-button.svg";
import stop from "/assets/stop-button.svg";
import pause from "/assets/pause-button.svg";
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";
import useFlightsStore from "../../store/useFlightsStore/useFlightsStore.js";

interface MapProps {
  flight: Flight;
}

function LeafletMap({ flight }: MapProps) {
  const { startTrackFlight, stopTrackFlight, pauseTrackFlight } =
    useGetFlightPosition();
  const {
    planePosition,
    setPlanePosition,
    eventSource,
    isPlayed,
    runPlay,
    stopPlay,
  } = useServerStreamStore();
  const { updateFlight } = useFlightsStore();

  const [mapLeaflet, setMapLeaflet] = useState({} as L.Map);
  const splineRef = useRef({} as Spline);
  const flightID = flight.id;

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
    splineRef.current.removeFrom(mapLeaflet);
  }

  if (Object.keys(mapLeaflet).length > 0) {
    const pathLine = spline(pathFlight, splineOptions);
    pathLine.addTo(mapLeaflet);
    splineRef.current = pathLine;
  }

  if (eventSource?.url?.includes("stream")) {
    eventSource.onmessage = (event) => {
      const flightApi = JSON.parse(event.data);
      setPlanePosition([flightApi.latitude, flightApi.longitude]);
    };
  }

  const startFlightHandler = () => {
    startTrackFlight(flightID);
    runPlay();
  };

  const stopFlightHandler = async () => {
    const newPosition = await stopTrackFlight(flightID);
    if (newPosition !== undefined) {
      setPlanePosition([newPosition.latitude, newPosition.longitude]);
      updateFlight(flightID, newPosition);
      stopPlay();
    }
  };

  const pauseFlightHandler = async () => {
    const newPosition = await pauseTrackFlight(flightID);
    if (newPosition !== undefined) {
      updateFlight(flightID, newPosition);
      stopPlay();
    }
  };

  return (
    <div className={"map-container"}>
      <button onClick={startFlightHandler} disabled={isPlayed}>
        <img src={play} height={30} width={30} alt={"play icon"}></img>
      </button>
      <button onClick={stopFlightHandler} disabled={!isPlayed}>
        <img src={stop} height={30} width={30} alt={"stop icon"}></img>
      </button>
      <button onClick={pauseFlightHandler} disabled={!isPlayed}>
        <img src={pause} height={30} width={30} alt={"pause icon"}></img>
      </button>
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
