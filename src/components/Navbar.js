import { Link } from 'react-router-dom'
import { Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  return (
    <>
      <div className='nav'>
        <div className='nav-content'>
          <div>
            <h1>Commutilator</h1>
          </div>
          <ul className='nav-items'>
            <li className='nav-item'>
              <Link to={'/'}>Home</Link>
            </li>
            {!token ? (
              <>
                <li className='nav-item'>
                  <Link to={'/login'}>Login</Link>
                </li>
                <li className='nav-item'>
                  <Link to={'/register'}>Register</Link>
                </li>
              </>
            ) : (
              <li className='nav-item'>
                <span
                  onClick={() => {
                    localStorage.clear()
                    // todo: need to clear useContext state
                    navigate('/')
                  }}
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}
