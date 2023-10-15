import React from 'react'
import { Box, Image } from 'rebass'

export const Loading: React.FC = () => {

  return (
    <Box>
      <Image src='/assets/img/loading.gif' alt='loading' width='100px' height='100px'/>
    </Box>
  )
}
