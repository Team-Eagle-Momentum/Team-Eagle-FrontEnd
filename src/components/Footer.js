import { Box, Flex, Divider, Link, Icon } from '@chakra-ui/react'
import { GoMarkGithub } from 'react-icons/go'

export default function Footer() {
  return (
    <div className='footer'>
      <Box
        bg='brand.aqua'
        alignItems='center'
        className='footer-content'
        gap='2'
      >
        <div>
          <Box>
            Made by Momentum Team 13 Eagles - August 2022{' '}
            <Link href='https://github.com/Team-Eagle-Momentum' isExternal>
              <Icon as={GoMarkGithub} mt='5px'></Icon>
            </Link>
          </Box>
          <p style={{ marginTop: '30px' }}>Commutilator</p>
        </div>
      </Box>
    </div>
  )
}
