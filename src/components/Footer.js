import { Link } from 'react-router-dom'
import { Flex, ChakraProvider } from '@chakra-ui/react'

export default function Navbar() {
    const token = localStorage.getItem('auth')

    return (
        <>
            <ChakraProvider>
                <Flex bg='brand.aqua' className='footer'>
                </Flex>
            </ChakraProvider>
        </>
    )
}