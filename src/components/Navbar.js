import { AppContext } from '../App'
import { useContext } from 'react'
import Logo from '.././CommutilatorLogo.png'
import { Box, Flex, Image, Square, Spacer } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setResultCalculation, setCurrentStep } = useContext(AppContext)

  return (
    <Flex bg='brand.aqua' className='nav-container'>
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
      {/* <Box align='right' m='5px' className='subtitle'> */}
      <ul className='nav-items'>
        <li className='nav-item'>
          <Link to={'/'}>Home</Link>
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
                  // todo: need to clear useContext state
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
    </Flex>
  )
}
