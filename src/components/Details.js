import React from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import Map from './Map'
import {
  Box,
  Flex,
  Divider,
  Text,
  Spacer,
  Image,
  Stack,
  SimpleGrid,
  HStack,
  Center,
  useColorModeValue,
} from '@chakra-ui/react'
import LightLogo from '.././CommutilatorLogo.png'
import DarkLogo from '.././CommutilatorLogoDark.png'
import { saveCalculationToUser } from '../utils/api'
import { splitAddress } from '../utils/helpers'

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
      start_location: '',
      end_location: '',
      days_per_week_commuting: '',
      distance: '',
    },
    vehicle: {
      mpg: '',
    },
  })
  const { id } = useParams()
  const [directions, setDirections] = React.useState({ routes: [] })

  const logo = useColorModeValue(LightLogo, DarkLogo)

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
    <Stack h='100vh' align='center'>
      <Image
        mt='10px'
        boxSize='150px'
        src={logo}
        alt='CommutilatorLogo' />
      <Text
        className='subtitle'
        color={useColorModeValue('brand.purple', 'dark.highlight')}
        textShadow={useColorModeValue('0.5px 0.5px #B9B9B9', '' )}
      >
        COMMUTILATOR DETAILS
      </Text>
      <Divider variant='unstyled' h='5vh' />
      <SimpleGrid columns={2}>
        <Box ml='20px' alignItems='center'>
          <Text align='center' className='title'>
            Result Costs
          </Text>
          <Center>
            <Box className='description'>
              <Text mt='10px'>Daily:</Text>
              <Text mt='10px'>Weekly:</Text>
              <Text mt='10px'>Monthly:</Text>
              <Text mt='10px'>Annualy:</Text>
            </Box>
            <Box ml='20px' className='costs'>
              <Text mt='10px'>${calcData.result.daily}</Text>
              <Text mt='10px'>${calcData.result.weekly}</Text>
              <Text mt='10px'>${calcData.result.monthly}</Text>
              <Text mt='10px'>${calcData.result.annual}</Text>
            </Box>
          </Center>
        </Box>
        <Box ml='20px' alignItems='center'>
          <Text align='center' className='title'>
            Calculation Factors
          </Text>
          <Center>
            <Box className='description'>
              {calcData.commute.start_avg_gas &&
                (<Text>
                  Gas price in {splitAddress(calcData.commute.start_location)}:
                </Text>)}
              {calcData.commute.end_avg_gas &&
                (<Text>
                  Gas price in {splitAddress(calcData.commute.end_location)}:
                </Text>)}
              <Text>Overall Gas Average:</Text>
              <Text>Estimated MPG:</Text>
              <Text>Commute Distance (one-way):</Text>
              <Text>Days Commuting:</Text>
            </Box>
            <Box ml='20px' className='costs'>
              {calcData.commute.start_avg_gas &&
                (<Text>${calcData.commute.start_avg_gas}</Text>)}
              {calcData.commute.end_avg_gas &&
                (<Text>${calcData.commute.end_avg_gas}</Text>)}
              <Text>${calcData.commute.avg_gas_commute}</Text>
              <Text>{calcData.vehicle.mpg} mpg</Text>
              <Text>{calcData.commute.distance} miles</Text>
              <Text>{calcData.commute.days_per_week_commuting} days/week</Text>
            </Box>
          </Center>
        </Box>
      </SimpleGrid>
      <Divider variant='unstyled' h='5vh' />
      <Box
        shadow='md'
        mt='25px'
        alignItems='center'
        w='500px'
        borderRadius='lg'
      >
        {directions.routes.length > 0 && (
          <Map directionsResponse={directions} />
        )}
      </Box>
    </Stack>
  )
}
