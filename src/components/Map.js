import { Box, Flex } from '@chakra-ui/react'
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api'
import { useState } from 'react'

function Map({ directionsResponse }) {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='left'
      h='50vh'
      w='100vw'
    >
      <Box left={0} top={0} h='100%' w='100%'>
        <GoogleMap
          zoom={15}
          mapContainerStyle={{ width: '50%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
    </Flex>
  )
}
export default Map
