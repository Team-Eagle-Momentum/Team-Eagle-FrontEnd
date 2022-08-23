import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import LoginForm from './components/Login/Login'
import RegisterForm from './components/Register'
import { extendTheme, theme, ChakraProvider } from '@chakra-ui/react'

// const colors = {
//   brand: {
//     900: '#8BF5E5',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

// const theme = extendTheme({ colors })

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
      </ChakraProvider>
    </>
  )
}

// 1, check for auth token in state,
// 2, if token is valid return route
// 2, redirect to register form

export default App