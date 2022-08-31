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
  useColorModeValue,
} from '@chakra-ui/react'

import { AiTwotoneCar } from 'react-icons/ai'
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

  return (
    <Flex direction='column' align='center' w='50%'>
      <Text flex='1'>
        {Object.keys(slides)[sliderValue]} Cost: $
        {Object.values(slides)[sliderValue]}
      </Text>
      <Box width='100%' flex='1'>
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
          <SliderTrack bg={useColorModeValue('brand.lilac', 'dark.dark')}>
            <SliderFilledTrack bg={useColorModeValue('brand.purple', 'dark.highlight')} />
          </SliderTrack>
          <SliderThumb boxSize={5}>
            <Box color='black' as={AiTwotoneCar} />
          </SliderThumb>
        </Slider>
      </Box>
    </Flex>
  )
}
