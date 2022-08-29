import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Input,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
  Text,
  Divider,
  SimpleGrid,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
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
  saveCalculationToUser,
} from "../utils/api";
import { roundNumber, splitAddress } from "../utils/helpers";
import { YEARS } from "../utils/constants";
import { AppContext } from "../App";

import ResultSlider from "./ResultSlider";
import ProgressBar from "./ProgressBar";

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
  // colo theme modes
  const buttonColor = useColorModeValue('#99F0E0', '#a456f0')
  const progressBarColor = useColorModeValue('#F0B199', '#a456f0')
  const inputColor = useColorModeValue('#ffffff', '#1A202C')
  const selectOptionColor = useColorModeValue('#b8b8b8', '#3B3B3B')


  const {
    resultCalculation,
    setResultCalculation,
    currentStep,
    setCurrentStep,
  } = useContext(AppContext);

  const [progressBar, setProgressBar] = useState(0);

  useEffect(() => {
    const getMakesAsync = async () => {
      const makes = await getMakes();
      setCarMakes(makes);
    };
    getMakesAsync();
    setCurrentStep(1);
  }, []);

  useEffect(() => {
    if (selectYear && carMakeID) {
      const getCarModelsAsync = async () => {
        const result = await getCarModels(selectYear, carMakeID);
        if (result.data.length === 0) {
          setCombinedMPGVal(0);
        }
        setCarModels(result.data);
      };
      getCarModelsAsync();
    }
  }, [selectYear, carMakeID]);

  useEffect(() => {
    if (selectYear && carTrimID) {
      const getMpg = async () => {
        const mpgValueData = await getVehicleSpecs(selectYear, carTrimID);
        if (mpgValueData) {
          const roundedMPGVal = roundNumber(mpgValueData);
          setCombinedMPGVal(roundedMPGVal);
        } else {
          setCombinedMPGVal(0.0);
        }
      };
      getMpg();
    }
  }, [selectYear, carTrimID]);

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    const distanceResult = results.routes[0].legs[0].distance.text;
    setDirectionsResponse(results);
    setDuration(results.routes[0].legs[0].duration.text);
    setDistance(distanceResult);
    return distanceResult;
  };

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
  }

  const commutePostData = async (distanceValue, directions) => {
    let cityStart = splitAddress(originRef.current.value);
    let cityEnd = splitAddress(destinationRef.current.value);
    const startAvgGasLocation = await getGasPrice(cityStart);
    const endAvgGasLocation = await getGasPrice(cityEnd);
    if (startAvgGasLocation === 0 || endAvgGasLocation === 0) {
      setAvgGasError(true)
      return
    }
    const startGas = startAvgGasLocation.data.locationAverage;
    const endGas = endAvgGasLocation.data.locationAverage;
    const avgGasLocation = roundNumber((startGas + endGas) / 2);
    const response = await createCommute(
      originRef.current.value,
      destinationRef.current.value,
      workDay,
      distanceValue,
      avgGasLocation,
      startGas,
      endGas,
      directions
    );
    return response.data.id;
  };

  return (
    <Flex
      height={'50vh'}
      className='description'
      direction='column'
      alignItems='center'
    >
      {currentStep !== 1 && currentStep !== 4 && (
        <ProgressBar
          key={'p-bar'}
          bgcolor={progressBarColor}
          completed={progressBar}
        />
      )}
      {currentStep === 1 && (
        <>
          <Box m='10px'>Welcome to Commutilator!</Box>
          <Divider h='2vh' variant='unstyled' />
          <Box
            w='80%'
            h='1.5'
            // bg={useColorModeValue('#F0B199', '#a456f0')}
            borderRadius='full'
          />
          <Divider h='2vh' variant='unstyled' />
          <Box m='10px'>
            Commutilator helps you calculate the cost of your commute, whether
            to work, school, or even the grocery store, using your route, your
            personal vehicle information, and local gas prices. We hope you are
            able to use our app to make informed decisions about your drive!
          </Box>
        </>
      )}
      {currentStep === 2 && (
        <>
          <Divider h='5vh' variant='unstyled' />
          <Box className='steps' m='10px'>
            Step 1 - Enter your route information.
          </Box>
          {locationError && (
            <p style={{ color: 'red', paddingBottom: '10px' }}>
              No routes found, please enter different location
            </p>
          )}
          {avgGasError && (
            <p style={{ color: 'red', paddingBottom: '10px' }}>
              Could not find gas prices for these locations.
            </p>
          )}
          <Stack className='fields'>
            <Box>
              <Text htmlFor='starting-location-field'>Start: </Text>
              <Autocomplete>
                <Input
                  shadow='sm'
                  bg={inputColor}
                  type='text'
                  placeholder='Enter a Location'
                  ref={originRef}
                />
              </Autocomplete>
              <Text htmlFor="ending-location-field">End: </Text>
              <Autocomplete>
                <Input
                  shadow='sm'
                  bg={inputColor}
                  type='text'
                  placeholder='Enter a Location'
                  ref={destinationRef}
                />
              </Autocomplete>
            </Box>
            <Box>
              <Text htmlFor="work-days-field">Days per Week Commuting:</Text>
              <NumberInput
                shadow='sm'
                bg={inputColor}
                min={1}
                max={7}
                precision={0}
                value={workDay}
                onChange={(workDay) => setWorkDay(workDay)}
              >
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
          <Divider h='5vh' variant='unstyled' />
          <Box className='steps' m='10px'>
            Step 2 - Enter your vehicle information.
          </Box>
          {mpgError && (
            <p style={{ color: 'red', paddingBottom: '10px' }}>
              Please enter an MPG value greater than zero.
            </p>
          )}
          <Stack>
            <Box className="fields">
              <Text htmlFor="mpg-input-field">MPG:</Text>
              <Input
                shadow='sm'
                bg={inputColor}
                placeholder='Enter Miles Per Gallon'
                id='mpg-input-field'
                type='number'
                value={combinedMPGVal}
                onChange={(e) => setCombinedMPGVal(e.target.value)}
                required
              />
            </Box>
            <Box m={5}>
              <Center>
                <b>OR</b>
              </Center>
            </Box>
            <Box className='fields'>
              <Text htmlFor='year-field'>Car Year:</Text>
              <select
                id='year-field'
                defaultValue=''
                style={{ backgroundColor: selectOptionColor }}
                onChange={(e) => setSelectYear(e.target.value)}
              >
                <option value="" disabled hidden>
                  Select Car Year
                </option>
                {YEARS.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <Text htmlFor="car-make-field">Car Make:</Text>
              <select
                id='car-make-field'
                style={{ backgroundColor: selectOptionColor }}
                defaultValue=''
                onChange={(e) => setCarMakeID(e.target.value)}
              >
                <option value="" disabled hidden>
                  Select Car Make
                </option>
                {carMakes.map((carMake, index) => (
                  <option key={index} value={carMake.Id}>
                    {carMake.Name}
                  </option>
                ))}
              </select>
              <Text htmlFor="car-model-field">Car Model:</Text>
              <select
                id='car-model-field'
                defaultValue=''
                style={{ backgroundColor: selectOptionColor }}
                onChange={(e) => setCarTrimID(e.target.value)}
              >
                <option value="" disabled hidden>
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
              </select>
            </Box>
          </Stack>
        </>
      )}
      {currentStep === 4 && (
        <>
          <Box className="steps" m="10px">
            Commute Results
          </Box>
          <SimpleGrid w="80%" columns={2}>
            <Box shadow="base">
              <Map directionsResponse={directionsResponse} />
            </Box>
            <Stack alignItems="center" className="description">
              <ResultSlider />
              <Spacer />
              <Link
                style={{ color: "#F0B199" }}
                to={`/details/${resultCalculation.id}?fromDetails=true`}
              >
                View More Details
              </Link>
            </Stack>
          </SimpleGrid>
        </>
      )}
      {/*buttons*/}
      {currentStep === 1 && (
        <Button
          className="subtitle"
          shadow="md"
          mt="20px"
          variant="outline"
          bg={buttonColor}
          colorScheme="black"
          onClick={() => {
            resetFormState()
            setCurrentStep(currentStep + 1)
          }}
        >
          Click to Begin
        </Button>
      )}
      {currentStep === 2 && (
        <Button
          className="subtitle"
          shadow="md"
          mt="20px"
          bg={buttonColor}
          isLoading={loadingButton}
          variant="outline"
          colorScheme="black"
          onClick={async () => {
            setLoadingButton(true)
            let distanceResult
            try {
              distanceResult = await Promise.all([calculateRoute()])
            } catch (error) {
              setLocationError(true)
              setLoadingButton(false)
              return
            }
            let [commuteId] = await Promise.all([
              commutePostData(distanceResult),
            ])
            setLoadingButton(false)
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
          className="subtitle"
          shadow="md"
          mt="20px"
          variant="outline"
          colorScheme="black"
          bg={buttonColor}
          onClick={async (e) => {
            e.preventDefault()
            if (combinedMPGVal <= 0 || combinedMPGVal === '') {
              setMpgError(true)
              return
            }
            setProgressBar(100)
            let [vehicleId] = await Promise.all([createVehicle(combinedMPGVal)])
            let [data] = await Promise.all([
              createCalcData(commuteId, vehicleId),
            ])
            setResultCalculation(data)
            saveCalculationToUser(data.id)
            setCurrentStep(currentStep + 1)
          }}
        >
          Commutilate Route
        </Button>
      )}
      {currentStep === 4 && (
        <Button
          className="subtitle"
          shadow="md"
          mt="20px"
          bg={buttonColor}
          onClick={() => {
            resetFormState()
          }}
          variant='outline'
          colorScheme='black'
        >
          New Calculation
        </Button>
      )}
    </Flex>
  )
}
