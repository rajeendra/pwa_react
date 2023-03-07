import React from 'react'
import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import { test } from './test';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  // lat: -3.745,
  // lng: -38.523

  lat: 6.8912667867474016 ,
  lng: 79.8712582673611
};

const centers = [
  {
    lat: 6.8912667867474016 ,
    lng: 79.8712582673611
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

function Location(props) {

  const {values, setValues} = props

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDT4dDtWWkOFsTnO_IxKzhaAWGlvbyzgOQ"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    
    //map.fitBounds(bounds);
    //map.setCenter(center);

    setMap(map);
    setValues({position: center}) // Marker use this position
    
    // fetch the current location    
    // follow useEffect trigger on values?.position change
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        setValues({position: {lat:position.coords.latitude, lng: position.coords.longitude}});
      });
    } else {
      const x = "Geolocation is not supported by this browser.";
      //setValues({text: x});
    }

  }, [])

  useEffect(() => {
    center.lat = values?.position?.lat ? values?.position?.lat : center.lat
    center.lng = values?.position?.lng ? values?.position?.lng : center.lng

    //centers[0].lat = values?.position?.lat ? values?.position?.lat : centers[0].lat
    //centers[0].lng = values?.position?.lng ? values?.position?.lng : centers[0].lng
    
    map && values?.position && map.setCenter(center);

  }, [values?.position?.lat, values?.position?.lng]);    

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        //center={centers[0]}
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
          //position={centers[0]}
          position={values.position}
        />

      </GoogleMap>
  ) : <></>
}

export default React.memo(Location)