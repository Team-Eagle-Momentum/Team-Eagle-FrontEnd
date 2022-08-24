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

import { getCalculationList } from '../../utils/api'

function Results() {
  const [results, setResults] = React.useState([])

  React.useEffect(() => {
    const fetchResults = async () => {
      const resultsData = await getCalculationList()
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

  return (
    <TableContainer>
      <Table variant='striped' colorScheme={'teal'}>
        <Thead>
          <Tr>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {results.map((result) => {
            return (
              <Tr key={result.id}>
                <Td>{formatDate(result.result.created_at)}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default Results
