import { Box, Button } from 'rebass'
interface IInitialProps {
    onClick: () => void
    variant?: string
  }

export const BaseHeaderCreate: React.FC<IInitialProps> = ({variant, onClick}) => {
    return(
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}} variant={variant}>
        <h3>GAMING PLATFORM DASHBOARD </h3>
        <Button
          sx={{ height: '35px', fontSize: '14px', cursor: 'pointer', marginTop: '5px' }}
          onClick={onClick}
        >
          Create new
        </Button>
      </Box>
    )
}