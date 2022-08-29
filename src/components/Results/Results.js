import React from 'react'
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
  Text,
  Flex,
  Center,
  Divider,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { getCalculationList } from '../../utils/api'
import './Results.css'

function Results() {
  const [results, setResults] = React.useState([])
  const [user, setUser] = React.useState('')
  const navigate = useNavigate()

  React.useEffect(() => {
    const fetchResults = async () => {
      const resultsData = await getCalculationList()
      setResults(resultsData)
      setUser(resultsData[0].user)
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
    <Stack className='table-container'>
      {results.length > 0 ? (
        <>
          <Text className='steps'>
            Welcome {user}!
          </Text>
          <Divider h='5vh' variant='unstyled' />
          <TableContainer>
            <Table variant='striped' colorScheme={'brand'}>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Starting location</Th>
                  <Th>Ending location</Th>
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
                      <Td>{result.commute.start_location}</Td>
                      <Td>{result.commute.end_location}</Td>
                      <Td>{result.vehicle.mpg} mpg</Td>
                      <Td>${result.result.weekly}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Text className='steps'>
          You have no calculations, start using the app!
        </Text>
      )}
    </Stack>
  )
}

export default Results
