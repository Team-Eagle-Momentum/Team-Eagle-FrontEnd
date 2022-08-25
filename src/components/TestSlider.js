import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Box,
    Flex,
    Spacer,
    Text
} from '@chakra-ui/react'

import { useState, useContext } from 'react'
import { AppContext } from '../App'

export default function TestSlider() {

    const { resultCalculation } = useContext(AppContext)

    const [sliderValue, setSliderValue] = useState(1)
    // console.log(sliderValue)

    const preVal = resultCalculation.result
    const slides = { "Daily": preVal.daily, "Weekly": preVal.weekly, "Monthly": preVal.monthly, "Annual": preVal.annual }
    // console.log(Object.values(slides)[0])


    // const [sliderValue, setSliderValue] = useState(20)
    // console.log(sliderValue)
    // let slideIndex = 0;
    // const handleChange = () => {
    //     if (sliderValue === 20) {
    //         slideIndex = 0;
    //     } else if (sliderValue === 40) {
    //         slideIndex = 1;
    //     } else if (sliderValue === 60) {
    //         slideIndex = 2;
    //     } else if (sliderValue === 80) {
    //         slideIndex = 3;
    //     }
    //     return slideIndex
    // }
    // console.log(handleChange())
    // handleChange()


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

    // borderWidth='1.5px' borderRadius='lg'

    return (
        <Flex direction='column' align='center'>
            <Text flex='1'>
                {Object.keys(slides)[sliderValue]} Cost: ${Object.values(slides)[sliderValue]}
            </Text>
            <Spacer />
            <Box pt={6} pb={6} width='50%' flex='1'>
                <Slider aria-label='slider-ex-6' defaultValue={1} min={0} max={3} step={1} onChange={(val) => setSliderValue(val)}>
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
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb>
                    </SliderThumb>
                </Slider>

                {/* <Slider aria-label='slider-ex-6' defaultValue={20} min={20} max={80} step={20} onChange={(val) => setSliderValue(val)}>
                    <SliderMark value={20} {...labelStyles}>
                        Daily
                    </SliderMark>
                    <SliderMark value={40} {...labelStyles2}>
                        Weekly
                    </SliderMark>
                    <SliderMark value={60} {...labelStyles3}>
                        Monthly
                    </SliderMark>
                    <SliderMark value={80} {...labelStyles3}>
                        Annually
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb>
                    </SliderThumb>
                </Slider> */}
            </Box>
        </Flex>
    )

}