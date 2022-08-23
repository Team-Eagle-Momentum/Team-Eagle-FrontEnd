import { useParams, useNavigate, useSearchParams, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

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
      <div className='login-wrap'>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className='login-field'>
            <label htmlFor='username-field'>username: </label>
            <input
              id='username-field'
              onChange={(e) => setUsername(e.target.value)}
              type='text'
            />
          </div>
          <div className='login-field'>
            <label htmlFor='password-field'>password: </label>
            <input
              id='password-field'
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />
          </div>
          <div className='login-submit'>
            <input type='submit' value='Log In' />
            <Link className='login-new-user' to={'/register'}>
              New user? Create an Account
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginForm