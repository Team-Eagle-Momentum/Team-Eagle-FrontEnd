import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import LoginForm from './components/Login/Login'
import RegisterForm from './components/Register'

const PrivateRoute = () => {
  const token = localStorage.get('auth_token')
  if (token) {
    return <Route />
  } else {
    Navigate('/')
  }
}

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/login' element={<LoginForm />} /> */}
        {/* <Route path='/register' element={<RegisterForm />} /> */}
        {/* <Route path='/details/:id' element={<RegisterForm />} /> */}
        {/* <PrivateRoute element={<Details />} />
        <PrivateRoute element={<SaveRoute />} /> */}
      </Routes>
    </>
  )
}

// 1, check for auth token in state,
// 2, if token is valid return route
// 2, redirect to register form

export default App
