import React from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import Map from './Map'
import { Box, Flex, Divider, Text, Spacer, Image, Stack, SimpleGrid } from '@chakra-ui/react'
import Logo from '.././CommutilatorLogo.png'
import { saveCalculationToUser } from '../utils/api'

export default function Details() {
  const [calcData, setCalcData] = React.useState({
    result: {
      weekly: '',
      daily: '',
      annual: '',
      monthly: '',
    },
    commute: {
      avg_gas_commute: '',
      end_avg_gas: '',
      start_avg_gas: '',
      directions_response: '{ "routes": [] }',
    },
  })
  const { id } = useParams()
  const [directions, setDirections] = React.useState({ routes: [] })

  const calculateRoute = async () => {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: calcData.commute.start_location,
      destination: calcData.commute.end_location,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirections(results)
  }

  React.useEffect(() => {
    const saveCalc = async () => {
      const data = await saveCalculationToUser(id)
      setCalcData(data)
    }
    saveCalc()
  }, [])

  React.useEffect(() => {
    calculateRoute()
  }, [calcData])

  return (
    <>
      <Stack align='center'>
        <Image
          mt='10px'
          boxSize='150px'
          src={Logo}
          alt='CommutilatorLogo'
        />
        <Text className='subtitle' color='brand.purple' textShadow='0.5px 0.5px #B9B9B9'>COMMUTILATOR DETAILS</Text>
        <Divider variant='unstyled' h='5vh' />

        <SimpleGrid w='600px' columns={2} bg='yellow'>

          <Box w='max-content' bg='purple'>

            <Text align='center' className='title'>
              Result Details
            </Text>

            <SimpleGrid alignItems='center' columns={2}>
              <Box ml='20px' className='description'>
                <Text bg='pink'>Daily:</Text>
                <Text>Weekly:</Text>
                <Text>Monthly:</Text>
                <Text>Annualy:</Text>
              </Box>

              <Box ml='20px' className='costs'>
                <Text bg='green'>${calcData.result.daily}</Text>
                <Text>${calcData.result.weekly}</Text>
                <Text>${calcData.result.monthly}</Text>
                <Text>${calcData.result.annual}</Text>
              </Box>
            </SimpleGrid>

          </Box>

          <Box w='max-content' alignItems='center' bg='blue'>

            <Text align='center' className='title'>
              Calculation Factors
            </Text>

            <SimpleGrid bg='red' alignItems='center' columns={2}>
              <Box ml='20px' className='description'>
                <Text bg='pink'>Starting Location Gas Price:</Text>
                <Text>Ending Location Gas Price</Text>
                <Text>Overall Gas Average:</Text>
                <Text>Commute Distance:</Text>
              </Box>

              <Box ml='20px' w='max-content' className='costs'>
                <Text bg='green'>${calcData.commute.start_avg_gas}</Text>
                <Text>${calcData.commute.end_avg_gas}</Text>
                <Text>${calcData.commute.avg_gas_commute}</Text>
                <Text>{calcData.commute.distance} miles</Text>
              </Box>
            </SimpleGrid>

          </Box>

        </SimpleGrid>

        <Divider variant='unstyled' h='5vh' />
        <Box shadow='base' mt='25px' alignItems='center' w='500px' borderRadius='lg'>
          {directions.routes.length > 0 && (
            <Map directionsResponse={directions} />
          )}
        </Box>
      </Stack>
    </>
  )
}
