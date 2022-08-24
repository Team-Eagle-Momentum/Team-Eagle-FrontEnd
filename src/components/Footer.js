import { Link } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'

export default function Navbar() {
    const token = localStorage.getItem('auth')

    return (
        <>
            <Flex bg='brand.aqua' className='footer'>
            </Flex>
        </>
    )
}