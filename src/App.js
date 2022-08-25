import './App.css'
import React, { useState, createContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import LoginForm from './components/Login/Login'
import RegisterForm from './components/Register/Register'
import Details from './components/Details'
import { extendTheme, theme, ChakraProvider } from '@chakra-ui/react'

export const AppContext = createContext()

// const colors = {
//   brand: {
//     900: '#8BF5E5',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

const PrivateRoute = ({ children }) => {
  const urlParams = new URLSearchParams(window.location.search)

  const token = localStorage.getItem('token')
  if (token) {
    return children // ---> <Details />
  }
  if (urlParams.values()) {
    return <Navigate to='/login?fromDetails=true' />
  }
  return <Navigate to='/' />
}

// const theme = extendTheme({ colors })

function App() {
  const [resultCalculation, setResultCalculation] = useState({
    result: { weekly: '' },
  })

  return (
    <ChakraProvider theme={theme}>
      <AppContext.Provider
        value={{
          resultCalculation,
          setResultCalculation,
        }}
      >
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          {/* <Route path='/details/:id' element={<RegisterForm />} /> */}
          <Route
            path='/details/:id'
            element={
              <PrivateRoute>
                <Details />
              </PrivateRoute>
            }
          />
        </Routes>
      </AppContext.Provider>
    </ChakraProvider>
  )
}

export default App
