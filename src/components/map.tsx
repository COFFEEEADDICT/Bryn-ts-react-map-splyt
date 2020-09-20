import React, { useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { DriversType } from '../App';


const containerStyle = {
  width: '100%',
  height: '600px',
};

const MyGoogleMapComponent = ({taxis}: any) => {
  
  const [selected, setSelected] = useState<DriversType | any>(null);
  
  return (
    <LoadScript googleMapsApiKey=" INSERT YOUR GOOGLE MAPS API KEY HERE " >
      
      <GoogleMap
        id="taxi-map"
        mapContainerStyle={containerStyle}
        center={{ lat: 51.5049375, lng: -0.0964509 }}
        zoom={14}
      >
          
        { taxis.drivers ? 
            taxis.drivers.map((taxi: DriversType, index: number) => {  
              return  <Marker 
                        key={`${taxi.driver_id}-${index}`} 
                        position={{ lat: taxi.location.latitude , lng: taxi.location.longitude }}
                        icon={require("../myTaxiLogo.png")}
                        onClick={() => { setSelected(taxi ? taxi : null) }}
                      >  

                      </Marker>
            }) 
        : null
        }

        { selected ?
          <InfoWindow  
            key={`${selected.lat}-${selected.lng}`} 
            position={{ lat: selected.location.latitude, lng: selected.location.longitude}}
            onCloseClick={() => {setSelected(null)} }
          >  
            <>
              <p>Driver: { selected.driver_id }</p> 
              <p>Bearing: { selected.location.bearing }</p> 
            </>
          </InfoWindow>
        : null
        }

      </GoogleMap>
    </LoadScript> 
  )
};
 
export default React.memo(MyGoogleMapComponent);