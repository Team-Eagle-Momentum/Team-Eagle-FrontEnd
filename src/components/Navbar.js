import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Square,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AppContext } from '../App'
import LightLogoNav from '.././CommutilatorLogo2.png'
import DarkLogoNav from '.././CommutilatorLogoDark2.png'
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
  const hamburgerVariant = useColorModeValue('solid', 'outline')

  return (
    <Flex
      bg={useColorModeValue('brand.aqua', 'dark.darker')}
      pt='15px'
      shadow={useColorModeValue('md', '')}>
      <Square style={{ marginRight: width < breakPoint ? 'auto' : '' }}>
        <Image
          alt='CommutilatorLogo'
          borderRadius='full'
          boxSize='80px'
          m='5px'
          onClick={() => {
            setCurrentStep(1)
          }}
          src={logo}
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
                }}>
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
            }}>
            <Link to={'/'}>Commutilator</Link>
          </Box>
          <Box className='subtitle'>
            A Commute Calculator for Today's Driver
          </Box>
        </Box>
      )}
      <Flex className='subtitle' justify='center' wrap='wrap'>
        {!token ? (
          width < breakPoint ? (
            <Center style={{ marginRight: '20px' }}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<HamburgerIcon />}
                  variant={hamburgerVariant}
                />
                <MenuList>
                  <MenuItem>
                    <Button
                      color={buttonText}
                      fontWeight='500'
                      onClick={() => {
                        setCurrentStep(1)
                      }}
                      variant='link'>
                      <Link to={'/'}>New Calculation</Link>
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button color={buttonText} fontWeight='500' variant='link'>
                      <Link to={'/login'}>Login</Link>
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button color={buttonText} fontWeight='500' variant='link'>
                      <Link to={'/register'}>Register</Link>
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Center>
          ) : (
            <>
              <Button
                color={buttonText}
                fontWeight='500'
                m='10px'
                onClick={() => {
                  setCurrentStep(1)
                }}
                variant='link'>
                <Link to={'/'}>New Calculation</Link>
              </Button>
              <Button
                color={buttonText}
                fontWeight='500'
                m='10px'
                variant='link'>
                <Link to={'/login'}>Login</Link>
              </Button>
              <Button
                color={buttonText}
                fontWeight='500'
                m='10px'
                variant='link'>
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
                variant={hamburgerVariant}
              />
              <MenuList>
                <MenuItem>
                  <Button
                    color={buttonText}
                    fontWeight='500'
                    onClick={() => {
                      setCurrentStep(1)
                    }}
                    variant='link'>
                    <Link to={'/'}>New Calculation</Link>
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color={buttonText} fontWeight='500' variant='link'>
                    <Link to={'/results'}>My Results</Link>
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
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
                    variant='link'>
                    Logout
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          </Center>
        ) : (
          <>
            <Button
              color={buttonText}
              fontWeight='500'
              m='10px'
              onClick={() => {
                setCurrentStep(1)
              }}
              variant='link'>
              <Link to={'/'}>New Calculation</Link>
            </Button>
            <Button m='10px' variant='link' color={buttonText} fontWeight='500'>
              <Link to={'/results'}>My Results</Link>
            </Button>
            <Button
              color={buttonText}
              fontWeight='500'
              m='10px'
              onClick={() => {
                localStorage.clear()
                setResultCalculation({
                  result: { weekly: '' },
                })
                setCurrentStep(1)
                navigate('/')
              }}
              variant='link'>
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
