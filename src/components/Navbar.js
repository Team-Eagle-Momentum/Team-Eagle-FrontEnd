import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../App'
import { Heading } from '@chakra-ui/react'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const { setResultCalculation, setCurrentStep } = useContext(AppContext)

  return (
    <>
      <div className='nav'>
        <div className='nav-content'>
          <div>
            <h1>Commutilator</h1>
          </div>
          <ul className='nav-items'>
            <li className='nav-item'>
              <Link to={'/test'}>Test</Link>
            </li>
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
                    setResultCalculation({
                      result: { weekly: '' },
                    })
                    setCurrentStep(1)
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