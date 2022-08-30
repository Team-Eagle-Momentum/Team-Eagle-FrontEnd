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
    <Flex bg={useColorModeValue('brand.aqua', 'dark.darkest')}>
      <Square>
        <Image
          m='5px'
          boxSize='80px'
          borderRadius='full'
          src={Logo}
          alt='CommutilatorLogo'
        />
      </Square>
      <Box alignItems='left' w='50vw' m='5px'>
        <Box className='title'
          onClick={() => {
            setCurrentStep(1)
          }}>
          <Link to={'/'}>Commutilator</Link>
        </Box>
        <Box className='subtitle'>
          A Commute Calculator for Today's Driver
        </Box>
      </Box>
      <Spacer />
      <Flex justify='center' wrap='wrap' w='30vw' className='subtitle'>
        <Button m='10px' variant='link' color='black' fontWeight='500'
          onClick={() => {
            setCurrentStep(1)
          }}>
          <Link to={'/'}>New Calculation</Link>
        </Button>
        {!token ? (
          <>
            <Button m='10px' variant='link' color='black' fontWeight='500'>
              <Link to={'/login'}>Login</Link>
            </Button>
            <Button m='10px' variant='link' color='black' fontWeight='500'>
              <Link to={'/register'}>Register</Link>
            </Button>
          </>
        ) : (
          <>
            <Button m='10px' variant='link' color='black' fontWeight='500'>
              <Link to={'/results'}>My Results</Link>
            </Button>
            <Button m='10px' variant='link' color='black' fontWeight='500'
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
            </Button>
          </>
        )}
      </Flex>
      <Center>
        <Button className='switch-item' onClick={toggleColorMode}>
          {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Center>
    </Flex>
  )
}
