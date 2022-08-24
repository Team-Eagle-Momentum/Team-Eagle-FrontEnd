import React from 'react'
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { getCalculationList } from '../../utils/api'
import './Results.css'

function Results() {
  const [results, setResults] = React.useState([])
  const navigate = useNavigate()

  React.useEffect(() => {
    const fetchResults = async () => {
      const resultsData = await getCalculationList()
      console.log('results', resultsData)
      setResults(resultsData)
    }
    fetchResults()
  }, [])

  const formatDate = (dateStr) => {
    var date = new Date(dateStr)
    var formattedDate =
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      ('00' + date.getDate()).slice(-2) +
      '/' +
      date.getFullYear() +
      ' ' +
      ('00' + date.getHours()).slice(-2) +
      ':' +
      ('00' + date.getMinutes()).slice(-2) +
      ':' +
      ('00' + date.getSeconds()).slice(-2)
    return formattedDate
  }

  const navigateToDetails = (id) => {
    navigate(`/details/${id}`)
  }

  return (
    <TableContainer className='table-container'>
      <Table variant='striped' colorScheme={'teal'}>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Average Gas Commute</Th>
            <Th>Vehicle MPG</Th>
            <Th>Weekly Cost</Th>
          </Tr>
        </Thead>
        <Tbody>
          {results.map((result) => {
            return (
              <Tr
                onClick={() => navigateToDetails(result.id)}
                className='results-item'
                key={result.id}
              >
                <Td>{formatDate(result.result.created_at)}</Td>
                <Td>${result.commute.avg_gas_commute}</Td>
                <Td>{result.vehicle.mpg} mpg</Td>
                <Td>${result.result.weekly}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default Results
