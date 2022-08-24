import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import LoginForm from './components/Login/Login'
import RegisterForm from './components/Register'
import Footer from './components/Footer'
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

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          {/* <Route path='/details/:id' element={<RegisterForm />} /> */}
        </Routes>
        <Footer></Footer>
      </ChakraProvider>
    </>
  )
}

// 1, check for auth token in state,
// 2, if token is valid return route
// 2, redirect to register form

export default App