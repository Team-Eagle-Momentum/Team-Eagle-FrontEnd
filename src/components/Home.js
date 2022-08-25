import {
  Box,
  Button,
  ChakraProvider,
  colorScheme,
  Divider,
  Flex,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { Link } from 'react-router-dom'
import Map from './Map'
import {
  createCalcData,
  createCommute,
  createVehicle,
  getCarModels,
  getGasPrice,
  getMakes,
  getVehicleSpecs,
} from '../utils/api'
import { roundNumber, splitAddress } from '../utils/helpers'
import { YEARS, WORK_DAYS } from '../utils/constants'
import { AppContext } from '../App'

import ResultSlider from './ResultSlider'
import ProgressBar from './ProgressBar'

export default function Home() {
  const originRef = useRef()
  const destinationRef = useRef()
  const [selectYear, setSelectYear] = useState(0)
  const [carMakes, setCarMakes] = useState([])
  const [carMakeID, setCarMakeID] = useState('1')
  const [workDay, setWorkDay] = useState(3)
  const [carModels, setCarModels] = useState([])
  const [carTrimID, setCarTrimID] = useState('')
  const [combinedMPGVal, setCombinedMPGVal] = useState('')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [commuteId, setCommuteId] = useState(0)
  const dayLabelStyles = {
    mt: '3',
    ml: '-1',
    fontSize: 'sm',
  }

  const {
    resultCalculation,
    setResultCalculation,
    currentStep,
    setCurrentStep,
  } = useContext(AppContext)

  const [progressBar, setProgressBar] = useState(0)

  useEffect(() => {
    const getMakesAsync = async () => {
      const makes = await getMakes()
      setCarMakes(makes)
    }
    getMakesAsync()
    setCurrentStep(1)
  }, [])

  useEffect(() => {
    if (selectYear && carMakeID) {
      const getCarModelsAsync = async () => {
        const result = await getCarModels(selectYear, carMakeID)
        if (result.data.length === 0) {
          setCombinedMPGVal(0)
        }
        setCarModels(result.data)
      }
      getCarModelsAsync()
    }
  }, [selectYear, carMakeID])

  useEffect(() => {
    if (selectYear && carTrimID) {
      const getMpg = async () => {
        const mpgValueData = await getVehicleSpecs(selectYear, carTrimID)
        if (mpgValueData) {
          const roundedMPGVal = roundNumber(mpgValueData)
          setCombinedMPGVal(roundedMPGVal)
        } else {
          setCombinedMPGVal(0.0)
        }
      }
      getMpg()
    }
  }, [selectYear, carTrimID])

  const calculateRoute = async () => {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })

    const distanceResult = results.routes[0].legs[0].distance.text
    setDirectionsResponse(results)
    setDuration(results.routes[0].legs[0].duration.text)
    setDistance(distanceResult)
    return distanceResult
  }

  const commutePostData = async (distanceValue, directions) => {
    let cityStart = splitAddress(originRef.current.value)
    let cityEnd = splitAddress(destinationRef.current.value)
    const startAvgGasLocation = await getGasPrice(cityStart)
    const endAvgGasLocation = await getGasPrice(cityEnd)
    const startGas = startAvgGasLocation.data.locationAverage
    const endGas = endAvgGasLocation.data.locationAverage
    const avgGasLocation = roundNumber((startGas + endGas) / 2)
    const response = await createCommute(
      originRef.current.value,
      destinationRef.current.value,
      workDay,
      distanceValue,
      avgGasLocation,
      startGas,
      endGas,
      directions
    )
    return response.data.id
  }

  return (
    <ChakraProvider>
      <Flex className='body' direction='column' alignItems='center'>
        <Box mt='10px' mb='10px'>
          Welcome to Commutilator! Commutilator helps you calculate your commute
          cost based on the route, your personal vehicle information, and local
          gas prices.
        </Box>
        {/* <Box> */}
        {currentStep === 1 && (
          <>
            <ProgressBar
              key={'p-bar'}
              bg='brand.purple'
              completed={progressBar}
            />
            <Box mb='10px'>
              Step {currentStep} - Enter the starting and ending location of
              your commute.
            </Box>
            <Stack spacing={5}>
              <Box>
                <label htmlFor='starting-location-field'>
                  Starting Location:{' '}
                </label>
                <Autocomplete>
                  <Input
                    type='text'
                    placeholder='Enter a Location'
                    ref={originRef}
                  />
                </Autocomplete>
              </Box>
              <Box>
                <label htmlFor='ending-location-field'>Ending Location: </label>
                <Autocomplete>
                  <Input
                    type='text'
                    placeholder='Enter a Location'
                    ref={destinationRef}
                  />
                </Autocomplete>
              </Box>
              <div>
                <label htmlFor='work-days-field'>
                  Days per Week Commuting:{' '}
                </label>
                <Box pt={6} pb={6}>
                  <Slider
                    aria-label='slider-ex-6'
                    defaultValue={3}
                    min={1}
                    max={5}
                    step={1}
                    onChange={(val) => setWorkDay(val)}
                  >
                    <SliderMark value={1} {...dayLabelStyles}>
                      1
                    </SliderMark>
                    <SliderMark value={2} {...dayLabelStyles}>
                      2
                    </SliderMark>
                    <SliderMark value={3} {...dayLabelStyles}>
                      3
                    </SliderMark>
                    <SliderMark value={4} {...dayLabelStyles}>
                      4
                    </SliderMark>
                    <SliderMark value={5} {...dayLabelStyles}>
                      5
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb></SliderThumb>
                  </Slider>
                </Box>
              </div>
            </Stack>
          </>
        )}
        {currentStep === 2 && (
          <>
            <ProgressBar
              key={'p-bar'}
              bgcolor={'#6a1b9a'}
              completed={progressBar}
            />
            <Box className='body'>
              Step {currentStep} - Enter your vehicle MPG (or select vehicle
              information)
            </Box>
            <Box>
              <Box>Enter MPG</Box>
              <Box>
                {carModels.length === 0 ? (
                  <p>No models found, please enter MPG</p>
                ) : combinedMPGVal === 0.0 ? (
                  <p>No MPG found, please enter MPG</p>
                ) : (
                  ''
                )}

                {combinedMPGVal === 0.0 && (
                  <p>No MPG found, please enter MPG</p>
                )}
                <label htmlFor='mpg-input-field'>Combined MPG: </label>
                <input
                  id='mpg-input-field'
                  type='text'
                  value={combinedMPGVal}
                  onChange={(e) => setCombinedMPGVal(e.target.value)}
                  required
                />
              </Box>
              <Box>
                <b>OR</b>
              </Box>
              <Box>
                <b>Select Vehicle Information to Auto-Populate MPG Value</b>
              </Box>
              <Box>
                <label htmlFor='year-field'>Year: </label>
                <select
                  id='year-field'
                  defaultValue=''
                  onChange={(e) => setSelectYear(e.target.value)}
                >
                  <option value='' disabled hidden>
                    Select Year
                  </option>
                  {YEARS.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </Box>
              <Box>
                <label htmlFor='car-make-field'>Car Make: </label>
                <select
                  id='car-make-field'
                  defaultValue=''
                  onChange={(e) => setCarMakeID(e.target.value)}
                >
                  <option value='' disabled hidden>
                    Select Car Make
                  </option>
                  {carMakes.map((carMake, index) => (
                    <option key={index} value={carMake.Id}>
                      {carMake.Name}
                    </option>
                  ))}
                </select>
              </Box>
              <Box>
                <label htmlFor='car-model-field'>Car Model: </label>
                <select
                  id='car-model-field'
                  defaultValue=''
                  onChange={(e) => setCarTrimID(e.target.value)}
                >
                  <option value='' disabled hidden>
                    Select Car Model
                  </option>
                  {carModels.length > 0 ? (
                    carModels.map((carModel, index) => (
                      <option key={index} value={carModel.TrimId}>
                        {carModel.ModelName} {carModel.TrimName}
                      </option>
                    ))
                  ) : (
                    <option>No models found</option>
                  )}
                </select>
              </Box>
            </Box>
          </>
        )}
        {currentStep === 3 && (
          <>
            <ProgressBar
              key={'p-bar'}
              bgcolor={'#6a1b9a'}
              completed={progressBar}
            />
            <div className='map-container'>
              <Map directionsResponse={directionsResponse} />
              <div className='slider-container'>
                <ResultSlider />
                <Link
                  style={{ zIndex: 100000 }}
                  to={`/details/${resultCalculation.id}?fromDetails=true`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </>
        )}

        {/*buttons*/}
        {currentStep === 3 ? (
          <Button
            className='body'
            colorScheme='teal'
            onClick={() => {
              setProgressBar(0)
              setCommuteId(0)
              setResultCalculation({
                result: { weekly: '' },
              })
              setCombinedMPGVal('')
              setCurrentStep(1)
              setWorkDay(3)
            }}
          >
            New Calculation
          </Button>
        ) : currentStep === 2 ? (
          <Button
            className='body'
            colorScheme='teal'
            onClick={async (e) => {
              e.preventDefault()
              setProgressBar(100)
              let [vehicleId] = await Promise.all([
                createVehicle(combinedMPGVal),
              ])
              let [data] = await Promise.all([
                createCalcData(commuteId, vehicleId),
              ])
              setResultCalculation(data)
              setCurrentStep(currentStep + 1)
            }}
          >
            Commutilate Route
          </Button>
        ) : currentStep === 1 ? (
          <Button
            className='body'
            colorScheme='teal'
            onClick={async () => {
              setProgressBar(50)
              let [distanceResult] = await Promise.all([calculateRoute()])
              let [commuteId] = await Promise.all([
                commutePostData(distanceResult),
              ])
              setCommuteId(commuteId)
              setCurrentStep(currentStep + 1)
            }}
          >
            Next
          </Button>
        ) : (
          ''
        )}
        {/* </Box> */}
      </Flex>
    </ChakraProvider>
  )
}
