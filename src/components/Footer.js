import { Box, Flex, Divider, Link, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { GoMarkGithub } from 'react-icons/go'

export default function Footer() {

    return (
        <Box className='footer'>
            <Box
                bg={useColorModeValue('brand.aqua', 'dark.darker')}
                alignItems='center'
                className='footer-content'
                gap='2'>
                <Box>
                    <Box>
                        Made by Momentum Team 13 Eagles - August 2022{' '}
                        <Link href='https://github.com/Team-Eagle-Momentum' isExternal>
                            <Icon as={GoMarkGithub} mt='5px'></Icon>
                        </Link>
                    </Box>
                    <Box mt='30px'>Commutilator</Box>
                </Box>
            </Box>
        </Box>
    )
}
