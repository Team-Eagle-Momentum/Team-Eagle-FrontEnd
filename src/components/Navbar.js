import { Link } from 'react-router-dom'
import {
  Box,
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

export default function Navbar() {
  const token = localStorage.getItem('auth')

  return (
    <>
      <Box>
        "Hi"
      </Box>
    </>
  )
}