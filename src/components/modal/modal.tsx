import { Box, Button } from 'rebass'
import { CSSTransition } from 'react-transition-group'

interface IInitialProps {
  isOpen: () => void
  onclick: () => void
  isShow: boolean
}

export const BaseModel: React.FC<IInitialProps> = ({ onclick, isOpen, isShow }) => {

 const RenderModel = () => {
  return (
    <Box variant='box_all_model' >
      <Box>
        <Box variant='box_confirm'>
          Confirm
        </Box>
        <Box sx={{ color: '#637381', fontSize: '20px', paddingTop: '25px' }}>
          Are you sure want to delete?
        </Box>
      </Box>
      <Box variant='box_button_model' >
        <Button
          onClick={isOpen}
          key='form-btn-cancel'
          type='reset'
          my={2}
          mr='10px'
          width={80}
          variant='button__form_cancel'
        >
          Cancel
        </Button>
        <Button
          key='form-btn-submit'
          type='submit'
          my={2}
          width={80}
          variant='button__form_submit'
          onClick={onclick}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
 }

 return(
  <CSSTransition
  in={isShow}
  timeout={0}
  unmountOnExit>
  <Box
    css={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.6)',
      zIndex: 999999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    onClick={(event) => {
      event.stopPropagation()
    }}
  >
    <Box >
    <RenderModel/>
    </Box>

  </Box>
</CSSTransition>
 )
}
