import './Register.css'
import { useState } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const navigateTo = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(email)
    // console.log(username)
    // console.log(password)
    axios.post('https://commutilator-api.herokuapp.com/api/auth/users/', {
      email: email,
      username: username,
      password: password,
    })
    // .then(() => {
    //     navigateTo('/login')
    // })
  }

  return (
    <>
      <div className='register-wrap'>
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className='register-field'>
            <label htmlFor='email-field' className='user-label'>
              email:{' '}
            </label>
            <input
              id='email-field'
              onChange={(e) => setEmail(e.target.value)}
              type='text'
            />
          </div>
          <div className='register-field'>
            <label htmlFor='username-field' className='user-label'>
              username:{' '}
            </label>
            <input
              id='username-field'
              onChange={(e) => setUsername(e.target.value)}
              type='text'
            />
          </div>
          <div className='register-field'>
            <label htmlFor='password-field' className='user-label'>
              password:{' '}
            </label>
            <input
              id='password-field'
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />
          </div>
          <div className='register-submit'>
            <input type='submit' value='Create Account' />
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterForm
