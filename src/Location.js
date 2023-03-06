import React from 'react'
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';


const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  // lat: -3.745,
  // lng: -38.523

  lat: 6.892667867474016 ,
  lng: 79.872582673611
};

function Location() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDT4dDtWWkOFsTnO_IxKzhaAWGlvbyzgOQ"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    
    //map.fitBounds(bounds);
    map.setCenter(center);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const centers = [
    {
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
      mapContainerStyle={containerStyle}
      //center={center}
      center={centers[0]}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
      
      <Marker
        // icon={{
        //   path: google.maps.SymbolPath.CIRCLE,
        //   scale: 7,
        // }}
        //icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
        icon={"mp.png"}
        position={centers[0]}
      />

    </GoogleMap>
) : <></>
}

export default React.memo(Location)