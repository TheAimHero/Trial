"use client";

import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { FC, useMemo, Fragment } from "react";
import styles from "../styles/MapView.module.css";
import { markerCoordinates } from "@/types/map";

interface MapViewInterface {
  markers?: markerCoordinates[];
}

const MapView: FC<MapViewInterface> = (props) => {
  const {} = props;
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(
    () => ({ lat: 27.672932021393862, lng: 85.31184012689732 }),
    [],
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    [],
  );

  function addMarker(event: google.maps.MapMouseEvent) {
    console.log(event.latLng?.toJSON());
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <GoogleMap
        options={mapOptions}
        zoom={14}
        onClick={addMarker}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "800px", height: "800px" }}
        onLoad={() => console.log("Map Component Loaded...")}
      />
    </Fragment>
  );
};

export default MapView;
