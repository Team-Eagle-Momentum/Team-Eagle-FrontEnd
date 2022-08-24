import Logo from '.././CommutilatorLogo.png'
import { Link } from 'react-router-dom'
import {
  Heading,
  Box,
  Flex,
  Image,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const token = localStorage.getItem('auth')
  const navigate = useNavigate()

  return (
    <>
      <Flex bg='brand.aqua'>
        <Box>
          <Image
            m='5px'
            boxSize='80px'
            borderRadius='full'
            src={Logo}
            alt='CommutilatorLogo' />
        </Box>
        <Box
          flexDirection='column'
          alignItems='left'
          w='50vw'
          m='5px'>
          <Box className='title'><Link to={'/'}>Commutilator</Link></Box>
          <Box className='tagline'>A Commute Calculator for Today's Driver</Box>
        </Box>
      </Flex>

      <div className='nav'>
        <div className='nav-content'>
          <div>
            <h1>Commutilator</h1>
          </div>
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
              <li className='nav-item'>
                <span
                  onClick={() => {
                    localStorage.clear()
                    // todo: need to clear useContext state
                    navigate('/')
                  }}
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>


    </>
  )
}