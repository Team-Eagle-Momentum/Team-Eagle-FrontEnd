import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Autocomplete } from '@react-google-maps/api'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from '../App'
import Map from './Map'
import ProgressBar from './ProgressBar'
import ResultSlider from './ResultSlider'
import {
  createCalcData,
  createCommute,
  createVehicle,
  getCarModels,
  getGasPrice,
  getMakes,
  getVehicleSpecs,
  saveCalculationToUser,
} from '../utils/api'
import { YEARS } from '../utils/constants'
import { roundNumber, splitAddress, useViewport } from '../utils/helpers'

export default function Home() {
  const originRef = useRef()
  const destinationRef = useRef()
  const [selectYear, setSelectYear] = useState(0)
  const [carMakes, setCarMakes] = useState([])
  const [carMakeID, setCarMakeID] = useState('1')
  const [workDay, setWorkDay] = useState(1)
  const [carModels, setCarModels] = useState([])
  const [carTrimID, setCarTrimID] = useState('')
  const [combinedMPGVal, setCombinedMPGVal] = useState('')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [commuteId, setCommuteId] = useState(0)
  const [loadingButton, setLoadingButton] = useState(false)
  const [locationError, setLocationError] = useState(false)
  const [mpgError, setMpgError] = useState(false)
  const [avgGasError, setAvgGasError] = useState(false)
  const [windowDimensions] = useViewport()
  const { width } = windowDimensions

  const buttonColor = useColorModeValue('brand.aqua', 'dark.highlight')
  const inputColor = useColorModeValue('white', 'dark.background')
  const selectColor = useColorModeValue('white', 'dark.background')
  const detailsLink = useColorModeValue('brand.gray', 'dark.highlight')
  const fillColor = useColorModeValue('#9191CC', '#A456F0')
  const barColor = useColorModeValue('#CED3F5', '#4F494F')
  // Elements in HEX are not Chakra elements and therefore can't use the branding

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

  const resetFormState = () => {
    setProgressBar(0)
    setCommuteId(0)
    setResultCalculation({
      result: { weekly: '' },
    })
    setCombinedMPGVal('')
    setCurrentStep(1)
    setWorkDay(1)
    setMpgError(false)
    setLocationError(false)
    setCombinedMPGVal('')
    setLoadingButton(false)
  }

  const commutePostData = async (distanceValue, directions) => {
    let cityStart = splitAddress(originRef.current.value)
    let cityEnd = splitAddress(destinationRef.current.value)
    const startAvgGasLocation = await getGasPrice(cityStart)
    const endAvgGasLocation = await getGasPrice(cityEnd)
    const startGas = startAvgGasLocation.data.locationAverage
    const endGas = endAvgGasLocation.data.locationAverage
    if (
      (startGas === null && endGas === null) ||
      (startGas === 0 && endGas === 0) ||
      (startGas === null && endGas === 0) ||
      (endGas === null && startGas === 0)
    ) {
      throw Error
    }
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
    <Flex
      alignItems='center'
      className='description'
      direction='column'
      h='100vh'>
      {currentStep !== 1 && currentStep !== 4 && (
        <ProgressBar
          barColor={barColor}
          completed={progressBar}
          fillColor={fillColor}
          key={'p-bar'}
        />
      )}
      {currentStep === 1 && (
        <>
          <Box m='25px'>Welcome to Commutilator!</Box>
          <Divider h='10px' variant='unstyled' />
          <Box bg={barColor} borderRadius='full' h='1.5' w='80%' />
          <Divider h='10px' variant='unstyled' />
          <Box m='15px'>
            Commutilator helps you calculate the cost of your commute, whether
            to work, school, or even the grocery store, using your route, your
            personal vehicle information, and local gas prices. We hope you are
            able to use our app to make informed decisions about your drive!
          </Box>
        </>
      )}
      {currentStep === 2 && (
        <>
          <Box className='steps' m='25px'>
            Step 1 - Enter your route information.
          </Box>
          {locationError && (
            <Box color='red' mt='10px'>
              <Text>No routes found; please enter different location.</Text>
            </Box>
          )}
          {avgGasError && (
            <Box color='red' mt='10px'>
              <Text>Could not find gas prices for these locations.</Text>
            </Box>
          )}
          <Stack className='fields'>
            <Box>
              <Text htmlFor='starting-location-field' mt='15px'>Start:</Text>
              <Autocomplete>
                <Input
                  bg={inputColor}
                  placeholder='Enter a Location'
                  ref={originRef}
                  shadow='sm'
                  type='text'
                />
              </Autocomplete>
              <Text htmlFor='ending-location-field' mt='15px'>End: </Text>
              <Autocomplete>
                <Input
                  bg={inputColor}
                  placeholder='Enter a Location'
                  ref={destinationRef}
                  shadow='sm'
                  type='text'
                />
              </Autocomplete>
            </Box>
            <Box>
              <Text htmlFor='work-days-field' mt='15px'>Days per Week Commuting:</Text>
              <NumberInput
                bg={inputColor}
                min={1}
                max={7}
                onChange={(workDay) => setWorkDay(workDay)}
                precision={0}
                shadow='sm'
                value={workDay}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Stack>
        </>
      )}
      {currentStep === 3 && (
        <>
          <Divider h='10px' variant='unstyled' />
          <Box className='steps' m='10px'>
            Step 2 - Enter your vehicle information.
          </Box>
          {mpgError && (
            <Box color='red' mt='10px'>
              <Text>Please enter an MPG value greater than zero.</Text>
            </Box>
          )}
          <Stack>
            <Box className='fields'>
              <Text htmlFor='mpg-input-field'>MPG:</Text>
              <Input
                bg={inputColor}
                id='mpg-input-field'
                onChange={(e) => setCombinedMPGVal(e.target.value)}
                placeholder='Enter Miles Per Gallon'
                required
                shadow='sm'
                type='number'
                value={combinedMPGVal}
              />
            </Box>
            <Center className='steps' m='15px'>OR</Center>
            <Box className='fields'>
              <Text htmlFor='year-field'>Car Year:</Text>
              <Select
                bg={selectColor}
                defaultValue=''
                id='year-field'
                onChange={(e) => setSelectYear(e.target.value)}
                shadow='sm'
                width='487px'>
                <option value='' disabled hidden>
                  Select Car Year
                </option>
                {YEARS.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              <Text htmlFor='car-make-field' mt='15px'>Car Make:</Text>
              <Select
                bg={selectColor}
                defaultValue=''
                id='car-make-field'
                onChange={(e) => setCarMakeID(e.target.value)}
                shadow='sm'
                width='487px'>
                <option value='' disabled hidden>
                  Select Car Make
                </option>
                {carMakes.map((carMake, index) => (
                  <option key={index} value={carMake.Id}>
                    {carMake.Name}
                  </option>
                ))}
              </Select>
              <Text htmlFor='car-model-field' mt='15px'>Car Model:</Text>
              <Select
                bg={selectColor}
                defaultValue=''
                id='car-model-field'
                onChange={(e) => setCarTrimID(e.target.value)}
                shadow='sm'
                width='487px'>
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
                  <option>
                    No models found, please manually enter MPG in the field
                    above.
                  </option>
                )}
              </Select>
            </Box>
          </Stack>
        </>
      )}
      {currentStep === 4 && (
        <>
          {width < 780 ? (
            <>
              <Box className='steps' m='25px'>
                Commute Results
              </Box>
              <ResultSlider />
              <Box style={{ marginBottom: '50px' }} />
              <Map directionsResponse={directionsResponse} />
              <Box style={{ marginBottom: '10px' }} />
              <Button className='subtitle' color={detailsLink} variant='link'>
                <Link to={`/details/${resultCalculation.id}?fromDetails=true`}>
                  View More Details
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Box className='steps' m='25px'>
                Commute Results
              </Box>
              <SimpleGrid columns={2} w='80%'>
                <Box shadow='base'>
                  <Map directionsResponse={directionsResponse} />
                </Box>
                <Stack
                  alignItems='center'
                  justifyContent='center'
                  spacing={'60px'}>
                  <ResultSlider />
                  <Button className='subtitle' color={detailsLink} variant='link'>
                    <Link to={`/details/${resultCalculation.id}?fromDetails=true`}>
                      View More Details
                    </Link>
                  </Button>
                </Stack>
              </SimpleGrid>
            </>
          )}
        </>
      )}

      {/*buttons*/}
      {currentStep === 1 && (
        <Button
          bg={buttonColor}
          className='subtitle'
          colorScheme='black'
          mt='20px'
          onClick={() => {
            resetFormState()
            setCurrentStep(currentStep + 1)
          }}
          shadow='md'
          variant='outline'>
          Click to Begin
        </Button>
      )}
      {currentStep === 2 && (
        <Button
          bg={buttonColor}
          className='subtitle'
          colorScheme='black'
          isLoading={loadingButton}
          mt='20px'
          shadow='md'
          variant='outline'
          onClick={async () => {
            setLoadingButton(true)
            let distanceResult
            let commuteId
            try {
              distanceResult = await Promise.all([calculateRoute()])
            } catch (error) {
              setLocationError(true)
              setLoadingButton(false)
              return
            }
            try {
              ;[commuteId] = await Promise.all([
                commutePostData(distanceResult),
              ])
            } catch (error) {
              setAvgGasError(true)
              setLoadingButton(false)
              return
            }
            setProgressBar(50)
            setCommuteId(commuteId)
            setCurrentStep(currentStep + 1)
          }}
        >
          Next
        </Button>
      )}
      {currentStep === 3 && (
        <Button
          bg={buttonColor}
          className='subtitle'
          colorScheme='black'
          mt='20px'
          shadow='md'
          variant='outline'
          onClick={async (e) => {
            e.preventDefault()
            if (combinedMPGVal <= 0 || combinedMPGVal === '') {
              setMpgError(true)
              return
            }
            setProgressBar(100)
            let [vehicleId] = await Promise.all([createVehicle(combinedMPGVal)])
            console.log('COMMUTE ID', commuteId)
            let [data] = await Promise.all([
              createCalcData(commuteId, vehicleId),
            ])
            setResultCalculation(data)
            saveCalculationToUser(data.id)
            setCurrentStep(currentStep + 1)
          }}>
          Commutilate Route
        </Button>
      )}
      {currentStep === 4 && (
        <Button
          bg={buttonColor}
          className='subtitle'
          colorScheme='black'
          mt='20px'
          shadow='md'
          variant='outline'
          onClick={() => {
            resetFormState()
          }}>
          New Calculation
        </Button>
      )}
    </Flex >
  )
}
