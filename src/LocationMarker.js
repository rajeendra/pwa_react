// LocationMarker.js

import React from 'react'
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';


const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function LocationMarker() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDT4dDtWWkOFsTnO_IxKzhaAWGlvbyzgOQ"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


    const mapContainerStyle = {
        height: "400px",
        width: "800px"
    }

    const centers = [
        {
        // 116, Kirula Rd, Colombo 5.
        // 6.892667867474016, 79.872582673611
        lat: 6.892667867474016 ,
        lng: 79.872582673611
        },
        {
        lat: 37.772,
        lng: -122.214
        },
        {
        lat: 37.672,
        lng: -122.219
        },
        {
        lat: 37.832,
        lng: -122.424
        }
    ];

  return isLoaded ? (
    <GoogleMap
      id="marker-example"
      mapContainerStyle={mapContainerStyle}
      zoom={2}
      center={centers[0]}
    >
        <Marker
          // icon={{
          //   path: google.maps.SymbolPath.CIRCLE,
          //   scale: 7,
          // }}
          icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
          position={centers[0]}
        />
        <Marker
          icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
          position={centers[1]}
        />
        <Marker
          icon={{
            path:
              "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
            fillColor: "yellow",
            fillOpacity: 0.9,
            scale: 2,
            strokeColor: "gold",
            strokeWeight: 2,
          }}
          position={centers[2]}
        />
    </GoogleMap>
  ) : <></>

}

export default React.memo(LocationMarker)