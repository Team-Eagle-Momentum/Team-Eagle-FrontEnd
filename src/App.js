import './App.css'
import React, { useState, createContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Details from './components/Details'
import Footer from './components/Footer'
import Home from './components/Home'
import LoginForm from './components/Login/Login'
import Navbar from './components/Navbar'
import RegisterForm from './components/Register/Register'
import Results from './components/Results/Results'

import { extendTheme, ChakraProvider } from '@chakra-ui/react'

const colors = {
  brand: {
    lightBlue: '#C1F1F1',
    aqua: '#99F0E0',
    purple: '#CED3F5',
    orange: '#F0B199',
    yellow: '#ECF3B1'
  },
}

const theme = extendTheme({ colors })

export const AppContext = createContext()

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

function App() {
  const [resultCalculation, setResultCalculation] = useState({
    result: { weekly: '' },
  })

  return (
    <ChakraProvider theme={theme}>
      <AppContext.Provider value={{ resultCalculation, setResultCalculation }}>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route
            path='/details/:id'
            element={
              <PrivateRoute>
                <Details />
              </PrivateRoute>
            }
          />
          <Route
            path='/results'
            element={
              <PrivateRoute>
                <Results />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer></Footer>
      </AppContext.Provider>
    </ChakraProvider>
  )
}

export default App
