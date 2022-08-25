import react from 'react'

const ProgressBar = (props) => {
  const { bgcolor, completed } = props

  const containerStyles = {
    height: 6,
    width: '80%',
    backgroundColor: '#CED3F5',
    borderRadius: 50,
    // margin: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
  }

  const labelStyles = {
    padding: 1,
    color: 'white',
    fontWeight: 'bold',
  }

  return (
    <>
      <span className='pg-bar-text'>{`${completed}%`}</span>
      <div className='pg-bar' style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
    </>
  )
}

export default ProgressBar
