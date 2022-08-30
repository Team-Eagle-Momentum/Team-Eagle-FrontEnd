import { Box, Flex } from '@chakra-ui/react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useState } from 'react';

function Map({ directionsResponse }) {
  const [map, setMap] = useState(/** @type google.maps.Map */(null));

  return (
    <Flex
      alignItems='left'
      flexDirection='column'
      h='50vh'
      position='relative'
      w='100%'>
      <Box left={0} h='100%' top={0} w='100%'>
        <GoogleMap
          mapContainerStyle={{ height: '100%' }}
          // options={{
          //   zoomControl: false,
          //   streetViewControl: false,
          //   mapTypeControl: false,
          //   fullscreenControl: false,
          // }}
          onLoad={(map) => setMap(map)}
          zoom={15}>
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
    </Flex>
  );
}

export default Map;
