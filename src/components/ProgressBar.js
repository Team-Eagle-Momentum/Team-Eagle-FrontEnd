import react from 'react'
// import theme from '../theme'
// import { AppContext } from '../App'
// import { useColorModeValue } from '@chakra-ui/react'

// const barColor = useColorModeValue('brand.lilac', 'dark.dark')

const ProgressBar = (props) => {
  const { bgcolor, completed } = props

  const containerStyles = {
    height: 6,
    width: '80%',
    backgroundColor: '#CED3F5',
    borderRadius: 50,
    marginTop: completed === '50' ? '317px' : '0',
  }

  const fillerStyles = {
    height: '6px',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
  }

  return (
    <>
      <div
        className='pg-bar'
        style={{
          ...containerStyles,
          marginTop:
            completed === 50 ? '128px' : completed === 0 ? '128px' : '0',
        }}
      >
        <div style={fillerStyles}></div>
      </div>
      <span className='steps'>{`${completed}%`}</span>
    </>
  )
}

export default ProgressBar
