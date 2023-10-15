import { Box } from 'rebass'
import { CSSTransition } from 'react-transition-group'

interface IInitialProps {
  isOpen: boolean
  variant?: string
}

export const OptionShowMember: React.FC<IInitialProps> = ({
  isOpen,
  children,
  variant
}) => {

  return (
    <CSSTransition
      in={isOpen}
      timeout={0}
      unmountOnExit
    >
        <Box variant={variant}>
          {children}
        </Box>

    </CSSTransition>
  )
}
