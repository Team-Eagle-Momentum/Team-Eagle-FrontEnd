import { Link } from 'react-router-dom'
import { Box, Flex, IconButton } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

export default function Navbar() {
  const token = localStorage.getItem('auth')

  return (
    <>
      <Flex bg='brand.aqua' className="nav">

        <Box bg='brand.purple'>
          <h1><Link to={'/'}>Commutilator</Link></h1>
        </Box>

        <Box>
          <button
            className="navigation__toggle--open"
            aria-haspopup="true"
            aria-expanded="false"
            color='black'
            aria-label='Menu'
          >
            <HamburgerIcon />
          </button>
            <Box class>
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>Register</Link>
            </Box>
        </Box>


      </Flex>
    </>
  )
}