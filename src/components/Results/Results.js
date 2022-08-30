import React from 'react'
import {
  Box,
  Center,
  Stack,
  TableContainer,
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { getCalculationList } from '../../utils/api'
import './Results.css'

function Results() {
  const [results, setResults] = React.useState([])
  const [user, setUser] = React.useState('')
  const navigate = useNavigate()

  const headerTextColor = useColorModeValue('black', 'white')
  const tableRowColor = useColorModeValue("#99F0E0", "#a456f0")

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
    <Stack m='10px'>
      {results.length > 0 ? (
        <Box maxWidth='1200px' margin='0 auto'>
          <Text className='steps' mt='25px'>
            Welcome, {user}!
          </Text>
          <Text className='steps' mt='25px'>
            Here is a list of all your commute calculations. Please click the
            calculation to view more details.
          </Text>
          <Center mt='25px'>
            <TableContainer whiteSpace='wrap'>
              <Table className='results-table' variant="striped">
                <Thead>
                  <Tr>
                    {/* Tr cannot support desired style props, so these must be done at the Th level */}
                    <Th
                      fontFamily='Source Code Pro'
                      fontWeight='700'
                      fontSize='md'
                      color={headerTextColor}
                      textAlign='center'
                    >
                      Created At
                    </Th>
                    <Th
                      fontFamily='Source Code Pro'
                      fontWeight='700'
                      fontSize='md'
                      color={headerTextColor}
                      textAlign='center'
                    >
                      Starting location
                    </Th>
                    <Th
                      fontFamily='Source Code Pro'
                      fontWeight='700'
                      fontSize='md'
                      color={headerTextColor}
                      textAlign='center'
                    >
                      Ending location
                    </Th>
                    <Th
                      fontFamily='Source Code Pro'
                      fontWeight='700'
                      fontSize='md'
                      color={headerTextColor}
                      textAlign='center'
                    >
                      Days Commuting
                    </Th>
                    <Th
                      fontFamily='Source Code Pro'
                      fontWeight='700'
                      fontSize='md'
                      color={headerTextColor}
                      textAlign='center'
                    >
                      Vehicle MPG
                    </Th>
                    <Th
                      fontFamily='Source Code Pro'
                      fontWeight='700'
                      fontSize='md'
                      color={headerTextColor}
                      textAlign='center'
                    >
                      Weekly Cost
                    </Th>
                  </Tr>
                </Thead>
                <Tbody className='description'>
                  {results.map((result) => {
                    return (
                      <Tr
                        bg={tableRowColor}
                        onClick={() => navigateToDetails(result.id)}
                        className='results-item'
                        key={result.id}
                      >
                        <Td>{formatDate(result.result.created_at)}</Td>
                        <Td>{result.commute.start_location}</Td>
                        <Td>{result.commute.end_location}</Td>
                        <Td>
                          {result.commute.days_per_week_commuting} day(s)/week
                        </Td>
                        <Td>{result.vehicle.mpg} mpg</Td>
                        <Td>${result.result.weekly}/week</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Center>
        </Box>
      ) : (
        <Text
          maxWidth={'1000px'}
          style={{ margin: '0 auto', textAlign: 'center' }}
          className='steps'
        >
          You have no calculations, start using the app!
        </Text>
      )}
    </Stack>
  )
}

export default Results
