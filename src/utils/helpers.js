import { useState, useEffect } from 'react'

export const splitAddress = (addressText) => {
  const addressArray = addressText.split(',')
  let city = ''
  if (addressArray.length === 3) {
    city = addressArray[0]
  } else if (addressArray.length === 4) {
    city = addressArray[1]
  } else if (addressArray.length === 5) {
    city = addressArray[2]
  }
  return city.trim()
}

export const roundNumber = (numberVal) => {
  return (Math.round(numberVal * 100) / 100).toFixed(1)
}

const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight
const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth

export const useViewport = () => {
  const [windowDimensions, setWindowDimensions] = useState({ height, width })

  const deriveWindowDimensions = () => {
    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight

    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

    setWindowDimensions({ height, width })
  }

  useEffect(() => {
    deriveWindowDimensions()
    window.addEventListener('resize', deriveWindowDimensions)

    return () => {
      window.removeEventListener('resize', deriveWindowDimensions)
    }
  }, [])

  return [windowDimensions]
}
