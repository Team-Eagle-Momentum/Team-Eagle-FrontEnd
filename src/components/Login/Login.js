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
} from '@chakra-ui/react'

import './Login.css'
import { AppContext } from '../../App'

export const LoginForm = () => {
  const { resultCalculation } = useContext(AppContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
  }

  return (
    <>
      <Flex
        alignItems='center'
        direction='column'
        className='body'>
        <Divider m='25px' variant='unstyled' />
        <Stack
          bg='brand.yellow'
          align='center'
          w='500px'
          h='260px'
          borderRadius='lg'>
          <Box mt='10px' className='subtitle'>Login</Box>
          <form onSubmit={handleSubmit}>
            <Box className='login-field'>
              <label htmlFor='username-field'>Username: </label>
              <Input bg='white'></Input>
              <input
                id='username-field'
                onChange={(e) => setUsername(e.target.value)}
                type='text'
              />
            </Box>
            <Box className='login-field'>
              <label htmlFor='password-field'>Password: </label>
              <Input bg='white'></Input>
              <input
                id='password-field'
                onChange={(e) => setPassword(e.target.value)}
                type='password'
              />
            </Box>
            <Button variant='outline' colorScheme='black'>Log In</Button>
            <input type='submit' value='Log In' />
          </form>
          <Box>
            <Link to={'/register'}>New user? Click to create an account</Link>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}

export default LoginForm
