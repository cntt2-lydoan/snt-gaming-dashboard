import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from 'rebass'

interface IInitialProps {
  onClick: () => void
  variant?: string
  title: string
}
export const BaseDrawer: React.FC<IInitialProps> = ({ children, title, onClick,  variant }) => {

  return (
    <Box  variant={variant} sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'rgb(33, 131, 255)',
          height: '60px',
          alignItems: 'center',
          WebkitJustifyContent: 'space-between',
        }}
      >
        <Box sx={{ marginLeft: '10px', color: '#fff' }}>{title}</Box>
        <FontAwesomeIcon
          icon={faTimes as IconProp}
          onClick={onClick}
          style={{
            width: '20px',
            height: '20px',
            marginRight: '10px',
          }}
        />
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}
