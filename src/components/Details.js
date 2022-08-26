import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import Map from './Map'
import { Box, Flex, Text, Spacer, Image, Stack } from '@chakra-ui/react'
import Logo from '.././CommutilatorLogo.png'

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
  const token = localStorage.getItem('token')
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

  console.log('results', directions)
  React.useEffect(() => {
    if (token) {
      axios
        .put(
          `${BASE_URL}/detail/${id}`,
          {},
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((res) => {
          setCalcData(res.data)
        })
        .catch((err) => {
          console.log('ERROR', err)
        })
    }
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
          <Flex space-evenly alignItems={'center'} justifyContent='space-between'>
            <Spacer />
            <Box>
              <Text className='title'>
                Result Details:
              </Text>
              <Text fontSize={20}>
                <br />
                <Box>
                  <Flex>
                  <Text className='description'>Daily: </Text><Text className='steps'> ${calcData.result.daily}</Text>
                  </Flex>
                  <Text>Weekly: ${calcData.result.weekly}</Text>
                  <Text>Monthly: ${calcData.result.monthly}</Text>
                  <Text>Annualy: ${calcData.result.annual}</Text>
                </Box>
              </Text>
            </Box>
            <Spacer />
            <Box borderColor='black' p='3'>
              <Text fontSize={60} as='b'>
                Calculation Factors:
              </Text>
              <div>
                <br />
                <br />
                <Text fontSize={20}>
                  <p>
                    - Starting Location Gas Average:💲
                    {calcData.commute.start_avg_gas}
                  </p>
                  <p>
                    - Ending Location Gas Average:💲
                    {calcData.commute.end_avg_gas}
                  </p>
                  <p>
                    - The Commute Average:💲
                    {calcData.commute.avg_gas_commute}
                  </p>
                  <p>
                    - The Commute Distance:
                    {calcData.commute.distance} miles
                  </p>
                </Text>
              </div>
            </Box>
            <Spacer />
          </Flex>
          <Box>
            <Spacer />
            <Spacer />
            <Flex alignItems='center' w='100vw'>
              {directions.routes.length > 0 && (
                <Map directionsResponse={directions} />
              )}
            </Flex>
          </Box>
        </Stack>
    </>
  )
}
