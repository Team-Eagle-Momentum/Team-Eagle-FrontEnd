import Logo from '.././CommutilatorLogo.png'
import { Link } from 'react-router-dom'
import {
  Box,
  Flex,
  Image,
  Square,
  Spacer,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const token = localStorage.getItem('auth')
  const navigate = useNavigate()

  return (
    <>
      <Flex bg='brand.aqua' >
        <Square>
          <Image
            m='5px'
            boxSize='80px'
            borderRadius='full'
            src={Logo}
            alt='CommutilatorLogo' />
        </Square>
        <Box
          flexDirection='column'
          alignItems='left'
          w='50vw'
          m='5px'>
          <Box className='title'><Link to={'/'}>Commutilator</Link></Box>
          <Box className='subtitle'>A Commute Calculator for Today's Driver</Box>
        </Box>
        <Spacer />
        <Box
          align='right'
          m='5px'
          className='subtitle'>
          {!token ? (
            <>
              <Box>
                <Link to={'/login'}>Login</Link>
              </Box>
              <Box>
                <Link to={'/register'}>Register</Link>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <Link to={'/results'}>My Results</Link>
              </Box>
              <Box
                onClick={() => {
                  localStorage.clear()
                  // todo: need to clear useContext state
                  navigate('/')
                }}
              >
                Logout
              </Box>
            </>
          )}
        </Box>
      </Flex>
    </>
  )
}
