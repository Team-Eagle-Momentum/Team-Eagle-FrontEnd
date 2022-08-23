import './Login.css'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import {} from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'

export const LoginForm = () => {
  const { resultCalculation } = useContext(AppContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { fromDetails } = useParams()
  let navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search)

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(username)
    // console.log(password)
    axios
      .post('https://commutilator-api.herokuapp.com/api/auth/token/login/', {
        username: username,
        password: password,
      })
      .then(async (res) => {
        const token = res.data.auth_token
        localStorage.setItem('token', token)
        console.log('fromDetails query param', fromDetails)

        if (urlParams.values()) {
          navigate(`/details/${resultCalculation.id}`)
        } else {
          navigate('/')
        }
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
          </div>
          <div className='login-submit'>
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
