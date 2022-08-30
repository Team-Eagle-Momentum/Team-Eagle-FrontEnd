import './App.css'
import React, { useState, createContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Details from './components/Details'
import Footer from './components/Footer'
import Home from './components/Home'
import LoginForm from './components/Login/Login'
import Navbar from './components/Navbar'
import RegisterForm from './components/Register/Register'
import theme from './theme'
import { ChakraProvider } from '@chakra-ui/react'
import Results from './components/Results/Results'
// import NotFound from './components/NotFound'


export const AppContext = createContext()

const PrivateRoute = ({ children }) => {
  const urlParams = new URLSearchParams(window.location.search)

  const token = localStorage.getItem('token')
  if (token) {
    return children
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
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <ChakraProvider theme={theme}>
      <AppContext.Provider
        value={{
          resultCalculation,
          setResultCalculation,
          currentStep,
          setCurrentStep,
        }}
      >
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
          <Route path='*'  />
          {/* element={<NotFound />} */}
        </Routes>
        <Footer></Footer>
      </AppContext.Provider>
    </ChakraProvider>
  )
}

export default App
