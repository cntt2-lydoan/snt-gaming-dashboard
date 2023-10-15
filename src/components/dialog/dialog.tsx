import { Box } from 'rebass'
import { CSSTransition } from 'react-transition-group'

interface IInitialProps {
  isOpen: boolean
  variant?: string
}

export const Dialog: React.FC<IInitialProps> = ({
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
      <Box
        css={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          zIndex: 999999,
        }}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <Box variant={variant}>
          {children}
        </Box>

      </Box>
    </CSSTransition>
  )
}
