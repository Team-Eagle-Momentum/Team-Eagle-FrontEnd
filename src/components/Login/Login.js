import {
  useParams,
  useNavigate,
  useSearchParams,
  Link,
  Navigate,
} from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Center,
  colorScheme,
  Divider,
  Flex,
  Input,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

import './Login.css'
import { AppContext } from '../../App'

export const LoginForm = () => {
  const { resultCalculation } = useContext(AppContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorState, setErrorState] = useState(null)
  const [blankError, setBlankError] = useState(null)
  let [searchParams, setSearchParams] = useSearchParams()

  let navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post('https://commutilator-api.herokuapp.com/api/auth/token/login/', {
        username: username,
        password: password,
      })
      .then(async (res) => {
        const token = res.data.auth_token
        localStorage.setItem('token', token)
        if (searchParams.get('fromDetails') === 'true') {
          return navigate(`/details/${resultCalculation.id}`)
        }
        navigate('/')
      })
      .catch(function (error) {
        if (error.response) {
          console.log('response', error.response);
          if (error.response.data.non_field_errors) {
            setErrorState(error)
            // console.log('invalid input', error.response.data.non_field_errors);
            setBlankError(null)
          }
          if (error.response.data.username || error.response.data.password) {
            setBlankError(error)
            // console.log('blank error', error.response.data);
            setErrorState(null)
          }
        } else if (error.request) {
          console.log('request', error.request);
        } else {
          console.log('Error', error.message);
        }
      })
  }

  // === 'Unable to log in with provided credentials.'
  // error.response.data.password[0] === 'This field may not be blank.'

  return (
    <>
      <Flex
        alignItems='center'
        direction='column'
        className='description'>
        <Divider m='25px' variant='unstyled' />
        <Stack
          bg={useColorModeValue('brand.yellow', 'dark.darker')}
          align='center'
          w='400px'
          h='content'
          borderRadius='lg'
          shadow='md'>
          <Text mt='15px' className='steps'>Login</Text>
          <form onSubmit={handleSubmit}>
            <Box>
              <Text htmlFor='username-field'>Username:</Text>
              <Input
                id='username-field'
                type='text'
                shadow='sm'
                bg={useColorModeValue('white', 'dark.background')}
                onChange={(e) => setUsername(e.target.value)}
                required
              >
              </Input>
            </Box>
            <Box mt='5px'>
              <Text htmlFor='password-field'>Password:</Text>
              <Input
                id='password-field'
                type='password'
                shadow='sm'
                bg={useColorModeValue('white', 'dark.background')}
                onChange={(e) => setPassword(e.target.value)}
                required
              >
              </Input>
            </Box>
            {errorState &&
              <Box mt='10px' color='red'>
                <Text>Invalid username or password</Text>
              </Box>
            }
            {blankError &&
              <Box mt='10px' color='red'>
                <Text>Please enter a valid username or password</Text>
              </Box>
            }
            <Button
              type='submit'
              value='Log In'
              className='subtitle'
              shadow='md'
              mt='20px'
              bg={useColorModeValue('brand.aqua', 'dark.highlight')}
              variant='outline'
              colorScheme='black'>
              Log In
            </Button>
          </form>
          <Box pb='15px' pt='5px'>
            <Link to={'/register'}>New user? Click to create an account.</Link>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}

export default LoginForm