import { Box, Flex, Divider, Link, Icon } from '@chakra-ui/react'
import { } from '@chakra-ui/icons'
import { GoMarkGithub } from 'react-icons/go'

export default function Footer() {
    return (
        <>
            <Divider
                h='100px'>
            </Divider>
            <Flex
                bg='brand.aqua'
                className='footer'
                alignItems='center'
                gap='2'>
                <Box>
                    Made by Momentum Team 13 Eagles - August 2022
                </Box>


                <Link href='https://github.com/Team-Eagle-Momentum' isExternal>
                    <Icon
                        as={GoMarkGithub}
                        mt='5px'>
                    </Icon>
                </Link>
            </Flex>
        </>
    )
}