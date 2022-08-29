import { AppContext } from '../App'
import { useContext } from 'react'
import Logo from '.././CommutilatorLogo.png'
import {
  Box,
  Flex,
  Image,
  Square,
  Spacer,
  Button,
  useColorMode,
  Center,
  useColorModeValue,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setResultCalculation, setCurrentStep } = useContext(AppContext)

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      bg={useColorModeValue('#99F0E0', '#2c2c2c')}
      className='nav-container'
    >
      <Square>
        <Image
          m='5px'
          boxSize='80px'
          borderRadius='full'
          src={Logo}
          alt='CommutilatorLogo'
        />
      </Square>
      <Box flexDirection='column' alignItems='left' w='50vw' m='5px'>
        <Box className='title'>
          <Link to={'/'}>Commutilator</Link>
        </Box>
        <Box className='subtitle'>A Commute Calculator for Today's Driver</Box>
      </Box>
      <Spacer />
      <ul className='nav-items'>
        <li
          onClick={() => {
            setCurrentStep(1)
          }}
          className='nav-item'
        >
          <Link to={'/'}>New Calculation</Link>
        </li>
        {!token ? (
          <>
            <li className='nav-item'>
              <Link to={'/login'}>Login</Link>
            </li>
            <li className='nav-item'>
              <Link to={'/register'}>Register</Link>
            </li>
          </>
        ) : (
          <>
            <li className='nav-item'>
              <Link to={'/results'}>My Results</Link>
            </li>
            <li className='nav-item'>
              <span
                onClick={() => {
                  localStorage.clear()
                  setResultCalculation({
                    result: { weekly: '' },
                  })
                  setCurrentStep(1)
                  navigate('/')
                }}
              >
                Logout
              </span>
            </li>
          </>
        )}
      </ul>
      <Center>
        <Button className='switch-item' onClick={toggleColorMode}>
          {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Center>
    </Flex>
  )
}
