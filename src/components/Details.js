import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import Map from './Map'
import { Box, Flex, Text, Spacer, Image } from '@chakra-ui/react'
import { jsPDF } from 'jspdf'
import Logo from '../CommutilatorLogo.png'

export default function Details() {
  const doc = new jsPDF()

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

  const generatePdf = () => {
    const centerWith = doc.internal.pageSize.getWidth() / 2 - 28
    const titleWidth = doc.internal.pageSize.getWidth()
    doc.addImage(Logo, 'PNG', centerWith, 5, 55, 55, null, 'center')
    doc.text('COMMUTILATOR DETAILS', 105, 60, null, null, 'center')
    doc.line(60, 65, 150, 65)

    doc.text('FACTORS', titleWidth - 40, 90, null, null, 'right')

    doc.text('COSTS', 40, 90, null, null, 'left')
    doc.text(
      `Daily: $${calcData.result.daily}`,
      40 - 8,
      102,
      null,
      null,
      'left'
    )
    doc.setLineWidth(0.05)
    doc.roundedRect(40 - 10, 95, 50, 50, 1, 1)
    doc.output('dataurlnewwindow')
  }

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
    generatePdf()
  }, [calcData])

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
            {directions.routes.length > 0 && (
              <Map directionsResponse={directions} />
            )}
          </Flex>
        </Box>
      </div>
    </>
  )
}
