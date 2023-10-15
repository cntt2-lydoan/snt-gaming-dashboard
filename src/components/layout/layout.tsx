import { Box } from 'rebass'
import { Header } from '../header/header'
import { Sidebar } from '../sidebar/sidebar'

export const Layout: React.FC = ({ children }) => {

  return (
    <>
        <main style={{ display: 'flex', fontFamily: 'revert', height: '100vh' }}>
        <Sidebar />
        <Box
          sx={{ width: ['100%', '100%', '100%)'], padding: '0 2em', height: 'max-content', borderLeft: '1px solid rgba(0,0,0,0.12)'}}
        >
          <Header />
          <Box>{children}</Box>
        </Box>
      </main>
    </>
  )
}