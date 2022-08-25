import './Register.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigateTo = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post('https://commutilator-api.herokuapp.com/api/auth/users/', {
        email: email,
        username: username,
        password: password,
      })
      .then(() => {
        navigateTo('/login')
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
          h='200px'
          borderRadius='lg'>
          <Box mt='10px' className='subtitle'>Create an Account</Box>
          <form onSubmit={handleSubmit}>
            <Box className='register-field'>
              <label htmlFor='email-field' className='user-label'>
                Email:{' '}
              </label>
              <input
                id='email-field'
                onChange={(e) => setEmail(e.target.value)}
                type='text'
              />
            </Box>
            <Box className='register-field'>
              <label htmlFor='username-field' className='user-label'>
                Username:{' '}
              </label>
              <input
                id='username-field'
                onChange={(e) => setUsername(e.target.value)}
                type='text'
              />
            </Box>
            <Box className='register-field'>
              <label htmlFor='password-field' className='user-label'>
                Password:{' '}
              </label>
              <input
                id='password-field'
                onChange={(e) => setPassword(e.target.value)}
                type='password'
              />
            </Box>
            <Box>
              <Button variant='outline' colorScheme='black'>Create Account</Button>
              <input type='submit' value='Create Account' />
            </Box>
          </form>
        </Stack>
      </Flex>
    </>
  )
}

export default RegisterForm
