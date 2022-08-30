import { AppContext } from '../App'
import { useContext } from 'react'
import LightLogoNav from '.././CommutilatorLogo2.png'
import DarkLogoNav from '.././CommutilatorLogoDark2.png'
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'

import { useViewport } from '../utils/helpers'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setResultCalculation, setCurrentStep } = useContext(AppContext)
  const [windowDimensions] = useViewport()
  const { width } = windowDimensions
  const { colorMode, toggleColorMode } = useColorMode()
  const logo = useColorModeValue(LightLogoNav, DarkLogoNav)
  const buttonText = useColorModeValue('black', 'white')
  const breakPoint = 820
  const breakPointSm = 483

  return (
    <Flex
      bg={useColorModeValue('brand.aqua', 'dark.darker')}
      shadow={useColorModeValue('md', '')}
    >
      <Square style={{ marginRight: width < breakPoint ? 'auto' : '' }}>
        <Image
          m='5px'
          boxSize='80px'
          borderRadius='full'
          src={logo}
          alt='CommutilatorLogo'
        />
        {width <= breakPoint &&
          (width <= breakPointSm ? (
            ''
          ) : (
            <Box alignItems='left' m='5px'>
              <Box
                className='title'
                onClick={() => {
                  setCurrentStep(1)
                }}
              >
                <Link to={'/'}>Commutilator</Link>
              </Box>
            </Box>
          ))}
      </Square>
      {width < breakPoint ? (
        ''
      ) : (
        <Box alignItems='left' style={{ marginRight: 'auto' }} m='5px'>
          <Box
            className='title'
            onClick={() => {
              setCurrentStep(1)
            }}
          >
            <Link to={'/'}>Commutilator</Link>
          </Box>
          <Box className='subtitle'>
            A Commute Calculator for Today's Driver
          </Box>
        </Box>
      )}
      <Flex justify='center' wrap='wrap' className='subtitle'>
        {!token ? (
          width < breakPoint ? (
            <Center style={{ marginRight: '20px' }}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<HamburgerIcon />}
                  variant='outline'
                />
                <MenuList>
                  <MenuItem>
                    <Button
                      variant='link'
                      color={buttonText}
                      fontWeight='500'
                      onClick={() => {
                        setCurrentStep(1)
                      }}
                    >
                      <Link to={'/'}>New Calculation</Link>
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button variant='link' color={buttonText} fontWeight='500'>
                      <Link to={'/login'}>Login</Link>
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button variant='link' color={buttonText} fontWeight='500'>
                      <Link to={'/register'}>Register</Link>
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Center>
          ) : (
            <>
              <Button
                m='10px'
                variant='link'
                color={buttonText}
                fontWeight='500'
                onClick={() => {
                  setCurrentStep(1)
                }}
              >
                <Link to={'/'}>New Calculation</Link>
              </Button>
              <Button
                m='10px'
                variant='link'
                color={buttonText}
                fontWeight='500'
              >
                <Link to={'/login'}>Login</Link>
              </Button>
              <Button
                m='10px'
                variant='link'
                color={buttonText}
                fontWeight='500'
              >
                <Link to={'/register'}>Register</Link>
              </Button>
            </>
          )
        ) : width <= breakPoint ? (
          <Center style={{ marginRight: '20px' }}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
              />
              <MenuList>
                <MenuItem>
                  <Button
                    variant='link'
                    color={buttonText}
                    fontWeight='500'
                    onClick={() => {
                      setCurrentStep(1)
                    }}
                  >
                    <Link to={'/'}>New Calculation</Link>
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button variant='link' color={buttonText} fontWeight='500'>
                    <Link to={'/results'}>My Results</Link>
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    variant='link'
                    color={buttonText}
                    fontWeight='500'
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
                </MenuItem>
              </MenuList>
            </Menu>
          </Center>
        ) : (
          <>
            <Button
              m='10px'
              variant='link'
              color={buttonText}
              fontWeight='500'
              onClick={() => {
                setCurrentStep(1)
              }}
            >
              <Link to={'/'}>New Calculation</Link>
            </Button>
            <Button m='10px' variant='link' color={buttonText} fontWeight='500'>
              <Link to={'/results'}>My Results</Link>
            </Button>
            <Button
              m='10px'
              variant='link'
              color={buttonText}
              fontWeight='500'
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
