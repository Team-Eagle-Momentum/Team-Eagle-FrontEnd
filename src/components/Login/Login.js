import './Login.css'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import {} from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { fromDetails } = useParams()
  let navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(username)
    console.log(password)
    axios
      .post('https://commutilator-api.herokuapp.com/api/auth/token/login/', {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log('fromDetails query param', fromDetails)
        if (fromDetails) {
          navigate('/details')
        } else {
          navigate('/home')
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
