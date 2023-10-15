import React from  'react'
import { Box } from 'rebass'
interface IProps {
  children?: React.ReactNode
}

export const Home: React.FC<IProps> = () => {

  return (
    <Box sx={{display: 'flex', width: '100%'}}>
      Home
    </Box>
  )
}
