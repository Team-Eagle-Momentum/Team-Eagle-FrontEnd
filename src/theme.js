import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    aqua: '#99F0E0',
    lilac: '#CED3F5',
    purple: '#9191CC',
    orange: '#F0B199',
    yellow: '#ECF3B1',
    gray: '#B9B9B9',
  },
  dark: {
    darkest: '#2B282B',
    darker: '#3D383D',
    dark: '#4F494F',
    background: '#191719',
    highlight: '#A456F0',
  },
}

const theme = extendTheme({ config, colors })

export default theme