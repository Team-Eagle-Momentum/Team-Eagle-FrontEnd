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
    <Stack>
      {results.length > 0 ? (
        <>
          <Text m='10px' className='steps'>
            Welcome, {user}!
          </Text>
          <Text m='10px' className='steps'>
            Here is a list of all your commute calculations. Please click the calculation to view more details.
          </Text>
          <Center>
          <TableContainer m='10px' whiteSpace='wrap'>
            <Table variant='striped' colorScheme={'teal'}>
              <Thead>
                <Tr>
                  <Th
                  fontFamily='Source Code Pro'
                  fontWeight='700'
                  fontSize='sm'
                  color='black'
                  textAlign='center'>
                    Created At
                  </Th>
                  <Th
                  fontFamily='Source Code Pro'
                  fontWeight='700'
                  fontSize='sm'
                  color='black'
                  textAlign='center'>
                    Starting location
                  </Th>
                  <Th
                  fontFamily='Source Code Pro'
                  fontWeight='700'
                  fontSize='sm'
                  color='black'
                  textAlign='center'>
                    Ending location
                  </Th>
                  <Th
                  fontFamily='Source Code Pro'
                  fontWeight='700'
                  fontSize='sm'
                  color='black'
                  textAlign='center'>
                    Days Commuting
                  </Th>
                  <Th
                  fontFamily='Source Code Pro'
                  fontWeight='700'
                  fontSize='sm'
                  color='black'
                  textAlign='center'>
                    Vehicle MPG
                  </Th>
                  <Th
                  fontFamily='Source Code Pro'
                  fontWeight='700'
                  fontSize='sm'
                  color='black'
                  textAlign='center'>
                    Weekly Cost
                  </Th>
                </Tr>
              </Thead>
              <Tbody className='description'>
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
                      <Td>{result.commute.days_per_week_commuting} day(s)/week</Td>
                      <Td>{result.vehicle.mpg} mpg</Td>
                      <Td>${result.result.weekly}/week</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
          </Center>
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
