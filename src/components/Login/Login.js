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
  Divider,
  Flex,
  Input,
  Stack,
  Text,
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
          w='400px'
          h='300px'
          borderRadius='lg'
          shadow='base'>
          <Text mt='15px' className='description' textShadow='0.5px 0.5px #b9b9b9'>Login</Text>
          <form onSubmit={handleSubmit}>
            <Box>
              <Text htmlFor='username-field'>Username: </Text>
              <Input
                id='username-field'
                onChange={(e) => setUsername(e.target.value)}
                type='text'
                shadow='sm'
                bg='white'>
              </Input>
            </Box>
            <Box mt='5px'>
              <Text htmlFor='password-field'>Password: </Text>
              <Input
                id='password-field'
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                shadow='sm'
                bg='white'>
              </Input>
            </Box>
            <Button
              type='submit'
              value='Log In'
              className='subtitle'
              shadow='md'
              mt='25px'
              bg='brand.aqua'
              variant='outline'
              colorScheme='black'>
              Log In
            </Button>
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