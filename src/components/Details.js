import {
  Box,
  Divider,
  Text,
  Image,
  Stack,
  SimpleGrid,
  Center,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'

import '../App.css'
import LightLogo from '.././CommutilatorLogo.png'
import DarkLogo from '.././CommutilatorLogoDark.png'
import Map from './Map'
import { saveCalculationToUser } from '../utils/api'
import { splitAddress } from '../utils/helpers'
import { useViewport } from '../utils/helpers'

export default function Details() {
  const [windowDimensions] = useViewport()
  const { width } = windowDimensions
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
    <Stack h='150vh' align='center'>
      <Image
        alt='CommutilatorLogo'
        boxSize='150px'
        mt='10px'
        src={logo}
      />
      <Text
        className='subtitle'
        color={useColorModeValue('brand.purple', 'dark.highlight')}
        textShadow={useColorModeValue('0.5px 0.5px #B9B9B9', '')}>
        COMMUTE DETAILS
      </Text>
      <Divider h='5vh' variant='unstyled' />
      <SimpleGrid className='description' columns={width < 780 ? '1' : '2'}>
        <Box alignItems='center' ml='20px'>
          <Text align='center' className='title'>
            Result Costs
          </Text>
          <Center>
            <Box>
              <Text mt='10px'>Daily:</Text>
              <Text mt='10px'>Weekly:</Text>
              <Text mt='10px'>Monthly:</Text>
              <Text mt='10px'>Annualy:</Text>
            </Box>
            <Box className='costs' ml='20px'>
              <Text mt='10px'>${calcData.result.daily}</Text>
              <Text mt='10px'>${calcData.result.weekly}</Text>
              <Text mt='10px'>${calcData.result.monthly}</Text>
              <Text mt='10px'>${calcData.result.annual}</Text>
            </Box>
          </Center>
        </Box>
        <Box alignItems='center' ml='20px'>
          <Text align='center' className='title'>
            Calculation Factors
          </Text>
          <Center>
            <Box>
              {calcData.commute.start_avg_gas && (
                <Text>
                  Gas price in {splitAddress(calcData.commute.start_location)}:
                </Text>
              )}
              {calcData.commute.end_avg_gas && (
                <Text>
                  Gas price in {splitAddress(calcData.commute.end_location)}:
                </Text>
              )}
              <Text>Overall Gas Average:</Text>
              <Text>Estimated MPG:</Text>
              <Text>Commute Distance (one-way):</Text>
              <Text>Days Commuting:</Text>
            </Box>
            <Box className='costs' ml='20px'>
              {calcData.commute.start_avg_gas && (
                <Text>${calcData.commute.start_avg_gas}</Text>
              )}
              {calcData.commute.end_avg_gas && (
                <Text>${calcData.commute.end_avg_gas}</Text>
              )}
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
        alignItems='center'
        mt='25px'
        shadow='md'
        w='500px'>
        {directions.routes.length > 0 && (
          <Map directionsResponse={directions} />
        )}
      </Box>
    </Stack>
  )
}
