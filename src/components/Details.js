import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import Map from './Map'
import { Box, Flex, Text, Spacer, Image } from '@chakra-ui/react'

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

  return (
    <>
      <div className='detail-container'>
        <Box>
          <Flex>
            <Box w='70px' h='10' />
            <Spacer />
            <Box w='170px' align='center' boxSize='lg'>
              <Image src='/comm-logo.jpeg' alt='logo' />
            </Box>
            <Spacer />
            <Box w='180px' h='10' />
          </Flex>
        </Box>
        <Flex space-evenly alignItems={'center'} justifyContent='space-between'>
          <Spacer />
          <Box borderColor='black' p='3'>
            <Text fontSize={60} as='b'>
              Result Details:
            </Text>
            <Text fontSize={20}>
              <br />
              <div>
                <p> - Daily: 💲{calcData.result.daily} </p>
                <p> - Weekly: 💲{calcData.result.weekly} </p>
                <p> - Monthly: 💲{calcData.result.monthly}</p>
                <p> - Annualy: 💲{calcData.result.annual}</p>
              </div>
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
            <Map
              directionsResponse={JSON.parse(
                calcData.commute.directions_response
              )}
              originRef={calcData.commute.start_location}
              destinationRef={calcData.commute.end_location}
            />
          </Flex>
        </Box>
      </div>
    </>
  )
}
