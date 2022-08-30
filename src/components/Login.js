import axios from 'axios'
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useState, useContext } from 'react'
import {
  useNavigate,
  useSearchParams,
  Link,
} from 'react-router-dom'

import { AppContext } from '../App'

export const LoginForm = () => {
  const { resultCalculation } = useContext(AppContext)
  const [blankError, setBlankError] = useState(null)
  const [errorState, setErrorState] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  let [searchParams] = useSearchParams()
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
            setBlankError(null)
          }
          if (error.response.data.username || error.response.data.password) {
            setBlankError(error)
            setErrorState(null)
          }
        } else if (error.request) {
          console.log('request', error.request);
        } else {
          console.log('Error', error.message);
        }
      })
  }

  return (
    <Flex
      alignItems='center'
      className='description'
      direction='column'
      h='70vh'>
      <Divider m='25px' variant='unstyled' />
      <Stack
        align='center'
        bg={useColorModeValue('brand.yellow', 'dark.darker')}
        borderRadius='lg'
        h='content'
        shadow='md'
        w='400px'>
        <Text className='steps' mt='15px'>Login</Text>
        <form onSubmit={handleSubmit}>
          <Box>
            <Text htmlFor='username-field'>Username:</Text>
            <Input
              bg={useColorModeValue('white', 'dark.background')}
              id='username-field'
              onChange={(e) => setUsername(e.target.value)}
              required
              shadow='sm'
              type='text'>
            </Input>
          </Box>
          <Box mt='5px'>
            <Text htmlFor='password-field'>Password:</Text>
            <Input
              bg={useColorModeValue('white', 'dark.background')}
              id='password-field'
              onChange={(e) => setPassword(e.target.value)}
              required
              shadow='sm'
              type='password'>
            </Input>
          </Box>
          {errorState &&
            <Box color='red' mt='10px'>
              <Text>Invalid username or password</Text>
            </Box>
          }
          {blankError &&
            <Box color='red' mt='10px'>
              <Text>Please enter a valid username or password</Text>
            </Box>
          }
          <Button
            bg={useColorModeValue('brand.aqua', 'dark.highlight')}
            className='subtitle'
            colorScheme='black'
            mt='20px'
            shadow='md'
            type='submit'
            value='Log In'
            variant='outline'>
            Log In
          </Button>
        </form>
        <Box pb='15px' pt='5px'>
          <Link to={'/register'}>New user? Click to create an account.</Link>
        </Box>
      </Stack>
    </Flex>
  )
}

export default LoginForm