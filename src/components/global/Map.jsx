import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"

const Map = ({defaultZoom = 8, defaultCenter, markerPosition}) => {
  return (
    <div>
      <GoogleMap
          defaultZoom={defaultZoom}
          defaultCenter={{ lat: defaultCenter.lat, lng: defaultCenter.lng }}
        >
            <Marker
            //   icon={{
            //     url: 'https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png',
            //     scaledSize: new window.google.maps.Size(40, 40),
            //   }}
            //   position={{ lat: 21.027763, lng: 105.834160 }}
            position={{ lat: markerPosition.lat, lng: markerPosition.lng }}
            // defaultDraggable
          />
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));