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
  Text,
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
          w='400px'
          h='350px'
          borderRadius='lg'
          shadow='base'>
          <Text mt='15px' className='description' textShadow='0.5px 0.5px #b9b9b9'>Create an Account</Text>
          <form onSubmit={handleSubmit}>
            <Box>
              <Text htmlFor='email-field'>Email:{' '}</Text>
              <Input
                id='email-field'
                type='text'
                onChange={(e) => setEmail(e.target.value)}
                shadow='sm'
                bg='white'>
              </Input>
            </Box>
            <Box mt='5px'>
              <Text htmlFor='username-field'>Username:{' '}</Text>
              <Input
                id='username-field'
                type='text'
                onChange={(e) => setUsername(e.target.value)}
                shadow='sm'
                bg='white'>
              </Input>
            </Box>
            <Box mt='5px'>
              <Text htmlFor='password-field'>Password:{' '}</Text>
              <Input
                id='password-field'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                shadow='sm'
                bg='white'>
              </Input>
            </Box>
            <Button className='subtitle' shadow='md' mt='25px' bg='brand.aqua' variant='outline' colorScheme='black'>Create Account</Button>
            <input type='submit' value='Create Account' />
          </form>
        </Stack>
      </Flex>
    </>
  )
}

export default RegisterForm
