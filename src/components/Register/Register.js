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
  useColorModeValue
} from '@chakra-ui/react'

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)
  const [blankError, setBlankError] = useState(null)
  const navigateTo = useNavigate()

  const handleSubmit = (event) => {
    // console.log(email, password, username)
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
            // console.log('blank error', error.response.data);
            setPasswordError(null)
          }
        }

        if (error.response.data.password) {
          if (error.response.data.password[0] === 'The password is too similar to the username.') {
            setPasswordError(error)
            // console.log('password error', error.response.data);
            setBlankError(null)
          }
          if (error.response.data.password[0] === 'This field may not be blank.') {
            setBlankError(error)
            // console.log('blank error', error.response.data);
            setPasswordError(null)
          }
        }

        if (error.response) {
          // console.log('response', error.response);
        }
        if (error.request) {
          // console.log('request', error.request);
        }
        // console.log('Error', error.message);
      })
  }

  return (
    <>
      <Flex alignItems='center' direction='column' className='body' height={'50vh'}>
        <Divider m='25px' variant='unstyled' />
        <Stack
          bg={useColorModeValue('#ECF3B1', '#4a4a4a')}
          align='center'
          w='400px'
          h='360px'
          borderRadius='lg'
          shadow='base'
        >
          <Text
            mt='15px'
            className='description'
            textShadow='0.5px 0.5px #b9b9b9'
          >
            Create an Account
          </Text>
          <form onSubmit={handleSubmit}>
            <Box>
              <Text htmlFor='email-field'>Email: </Text>
              <Input
                id='email-field'
                type='email'
                value={email}
                shadow='sm'
                bg={useColorModeValue('#ffffff', '#7d7d7d')}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Input>
            </Box>
            <Box mt='5px'>
              <Text htmlFor='username-field'>Username: </Text>
              <Input
                id='username-field'
                type='text'
                value={username}
                shadow='sm'
                bg={useColorModeValue('#ffffff', '#7d7d7d')}
                onChange={(e) => setUsername(e.target.value)}
                minLength='8'
                required
              ></Input>
            </Box>
            <Box mt='5px'>
              <Text htmlFor='password-field'>Password: </Text>
              <Input
                id='password-field'
                type='password'
                value={password}
                shadow='sm'
                bg={useColorModeValue('#ffffff', '#7d7d7d')}
                onChange={(e) => setPassword(e.target.value)}
                minLength='8'
                required
              ></Input>
            </Box>
            {passwordError &&
              <Box mt='10px' color='red'>
                <Text>Password is too similar to the username</Text>
              </Box>
            }
            {blankError &&
              <Box mt='10px' color='red'>
                <Text>Input may not be blank</Text>
              </Box>
            }
            <Button
              type='submit'
              value='Create Account'
              className='subtitle'
              shadow='md'
              mt='20px'
              bg={useColorModeValue('#99F0E0', '#a456f0')}
              variant='outline'
              colorScheme='black'
            >
              Create Account
            </Button>
          </form>
        </Stack>
      </Flex>
    </>
  )
}

export default RegisterForm
