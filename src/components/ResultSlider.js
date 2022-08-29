import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
  Flex,
  Spacer,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

import { useState, useContext } from 'react'
import { AppContext } from '../App'

export default function ResultSlider() {
  const { resultCalculation } = useContext(AppContext)
  const [sliderValue, setSliderValue] = useState(1)
  const preVal = resultCalculation.result
  const slides = {
    Daily: preVal.daily,
    Weekly: preVal.weekly,
    Monthly: preVal.monthly,
    Annual: preVal.annual,
  }
  const labelStyles = {
    mt: '3',
    ml: '-3.5',
    fontSize: 'sm',
  }
  const labelStyles2 = {
    mt: '3',
    ml: '-6',
    fontSize: 'sm',
  }
  // before thumb
  // useColorModeValue('#99F0E0', '#a456f0')
  // after thumb
  // useColorModeValue('#E2E8F0', '##1A202C')
  return (
    <Flex direction='column' align='center'>
      <Text flex='1'>
        {Object.keys(slides)[sliderValue]} Cost: $
        {Object.values(slides)[sliderValue]}
      </Text>
      <Spacer />
      <Box pt={6} pb={6} width='35%' flex='1'>
        <Slider
          aria-label='slider-ex-6'
          defaultValue={1}
          min={0}
          max={3}
          step={1}
          onChange={(val) => setSliderValue(val)}
        >
          <SliderMark value={0} {...labelStyles}>
            Daily
          </SliderMark>
          <SliderMark value={1} {...labelStyles2}>
            Weekly
          </SliderMark>
          <SliderMark value={2} {...labelStyles2}>
            Monthly
          </SliderMark>
          <SliderMark value={3} {...labelStyles2}>
            Annually
          </SliderMark>
          <SliderTrack bg='#E2E8F0'>
            <SliderFilledTrack bg='#99F0E0'/>
          </SliderTrack >
          <SliderThumb boxSize={6}>
            <Box bg='red' />
          </SliderThumb>
        </Slider>
      </Box>
    </Flex>
  )
}
