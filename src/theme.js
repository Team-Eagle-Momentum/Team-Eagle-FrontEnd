// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    aqua: '#99F0E0',
    purple: '#CED3F5',
    blue: '#93C7F5',
    orange: '#F0B199',
    yellow: '#ECF3B1',
    gray: '#B9B9B9',
  },
}

// 3. extend the theme
const theme = extendTheme({ config, colors })

export default theme