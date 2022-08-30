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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const RegisterForm = () => {
  const [blankError, setBlankError] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)
  const [username, setUsername] = useState('')
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
      .catch(function (error) {

        if (error.response.data.username) {
          if (error.response.data.username[0] === 'This field may not be blank.') {
            setBlankError(error)
            setPasswordError(null)
          }
        }

        if (error.response.data.password) {
          if (error.response.data.password[0] === 'The password is too similar to the username.') {
            setPasswordError(error)
            setBlankError(null)
          }
          if (error.response.data.password[0] === 'This field may not be blank.') {
            setBlankError(error)
            setPasswordError(null)
          }
        }

        if (error.response) {
        }

        if (error.request) {
        }
      })
  }

  return (
    <Flex
      className='description'
      alignItems='center'
      direction='column'
      h='70vh'>
      <Divider m='25px' variant='unstyled' />
      <Stack
        align='center'
        bg={useColorModeValue('brand.yellow', 'dark.darker')}
        borderRadius='lg'
        h='content'
        pb='15px'
        shadow='md'
        w='400px'>
        <Text className='steps' mt='15px'>Register New Account</Text>
        <form onSubmit={handleSubmit}>
          <Box>
            <Text htmlFor='email-field'>Email:</Text>
            <Input
              bg={useColorModeValue('white', 'dark.background')}
              id='email-field'
              onChange={(e) => setEmail(e.target.value)}
              required
              shadow='sm'
              type='email'
              value={email}>
            </Input>
          </Box>
          <Box mt='5px'>
            <Text htmlFor='username-field'>Username:</Text>
            <Input
              bg={useColorModeValue('white', 'dark.background')}
              id='username-field'
              minLength='8'
              onChange={(e) => setUsername(e.target.value)}
              required
              shadow='sm'
              type='text'
              value={username}>
            </Input>
          </Box>
          <Box mt='5px'>
            <Text htmlFor='password-field'>Password:</Text>
            <Input
              bg={useColorModeValue('white', 'dark.background')}
              id='password-field'
              minLength='8'
              onChange={(e) => setPassword(e.target.value)}
              required
              shadow='sm'
              type='password'
              value={password}>
            </Input>
          </Box>
          {passwordError &&
            <Box color='red' mt='10px'>
              <Text>Password is too similar to the username</Text>
            </Box>
          }
          {blankError &&
            <Box color='red' mt='10px'>
              <Text>Input may not be blank</Text>
            </Box>
          }
          <Button
            bg={useColorModeValue('#99F0E0', '#a456f0')}
            className='subtitle'
            colorScheme='black'
            mt='20px'
            shadow='md'
            type='submit'
            value='Create Account'
            variant='outline'>
            Create Account
          </Button>
        </form>
      </Stack>
    </Flex>
  )
}

export default RegisterForm