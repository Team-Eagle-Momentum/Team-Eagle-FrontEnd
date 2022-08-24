import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Details() {
  const [calcData, setCalcData] = React.useState({
    result: {
      weekly: '',
      daily: '',
      annual: '',
      monthly: '',
    },
    commute: {
      avg_gas_commute: '',
      end_avg_gas: '',
      start_avg_gas: '',
    },
  })

  const { id } = useParams()
  const token = localStorage.getItem('token')

  React.useEffect(() => {
    // ONLY IF USER IS LOGGED IN
    // update the object to attach the currently logged in user
    if (token) {
      axios
        .put(
          `${BASE_URL}/detail/${id}`,
          {},
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((res) => {
          setCalcData(res.data)
        })
        .catch((err) => {
          console.log('ERROR', err)
        })
    }
  }, [])

  console.log('data', calcData)

  return (
    <>
      <div>
        Details:
        <p> Daily: ${calcData.result.daily}</p>
        <p> Weekly: ${calcData.result.weekly}</p>
        <p> Monthly: ${calcData.result.monthly}</p>
        <p> Annualy: ${calcData.result.annual}</p>
      </div>
      <div>
        Calculation Factors:
        <p>
          {' '}
          Avergae Price of gas at starting location:
          {calcData.commute.start_avg_gas}
        </p>
        <p> Avergae Price of gas at ending location:{}</p>
        <p> Avergae Price of gas for the commute:{}</p>
      </div>
    </>
  )
}
