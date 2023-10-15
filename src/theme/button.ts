export const button = {
    button__default: {
      backgroundColor: '#F00',
      backgroundImage: 'none',
      color: 'red',
    },
    button__rounded: {
      varian: 'button__default',
      borderRadius: '100px'
    },
    button_icon_sidebar: {
      display: ['block', 'block', 'block', 'none'],
      position: 'absolute',
      top: '51px',
      right: '20px',
      fontSize: '30px',
      background: '#fff',
      cursor: 'pointer',
    },
    button__form_cancel: {
      cursor: 'pointer',
      background: 'none',
      color: '#000000d9',
      paddingTop: '5px',
      paddingBottom: '5px',
      border: '1px solid #d9d9d9',
      ':hover': {
        border: '1px solid rgb(33,131,255)',
        color: 'rgb(33,131,255)'
      }
    },
    button__form_submit: {
      cursor: 'pointer',
      paddingTop: '5px',
      paddingBottom: '5px',
      ':hover': {
        background: '#1890ff'
      }
    }
}
