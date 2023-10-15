export const box = {
  box__default: {
    width: '100%',
    maxWidth: ['720px', '960px', '1140px'],
    fontSize: ['8px', '10px', '14px'],
    fontFamily: 'sans-serif',
    margin: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box_sidebar: {
    marginTop: '20px',
    boxSizing: 'border-box',
    fontSize: '16px',
    borderRadius: '25px',
    fontWeight: '300',
    cursor: 'pointer',
    color: '0d172a',
    '&:hover': {
      background: '#ebf5ff',
    },
  },
  box_all_signin: {
    display: 'flex',
    justifyContent: ['center', 'center', 'center', 'center'],
    alignItems: 'center',
    height: '100vh',
    backgroundImage:
      'url(https://store.cloudflare.steamstatic.com/public/shared/images/joinsteam/acct_creation_bg.jpg)',
  },
  box_all_children: {
    boxShadow: '0 3px 10px 5px rgba(0, 0, 0, 30)',
    width: ['350px', '500px', '745px', '1000px'],
    height: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box_signin_left_welcome: {
    backgroundImage:
      'url(https://store.cloudflare.steamstatic.com/public/shared/images/joinsteam/acct_creation_bg.jpg)',
    width: ['100%', '50%', '50%', '50%'],
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  box_signin_right: {
    width: ['0%', '50%', '50%', '50%'],
    display: ['none', 'flex', 'flex', 'flex'],
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#eceff1',
    height: '100%',
  },
  box_welcome_back: {
    fontSize: '30px',
    fontWeight: '700',
    marginBottom: '130px',
    fontFamily: 'unset',
  },
  box_all_header: {
    display: 'flex',
    marginTop: '20px',
    marginLeft: '40px',
    justifyContent: 'space-between',
  },
  box_all_sidebar: {
    height: '100vh',
    width: '370px',
    background: '#fff',
    display: ['block', 'block', 'block', 'flex'],
    justifyContent: 'center',
  },
  box_text_name_project: {
    color: 'black',
    fontSize: '47px',
    fontWeight: '700',
    marginBottom: '30px',
    paddingLeft: '9px',
  },
  box_search: {
    position: 'absolute',
    left: '20px',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
  },
  box_all_sidebar_child: {
    color: '#0b3f7a',
    borderRadius: '25px',
    cursor: 'pointer',
    '&:hover': {
      background: '#ebf5ff',
    },
  },
  box_dash_board: {
    color: '#0d172a',
    marginLeft: '12px',
    fontSize: '16px',
    fontWeight: 300,
    padding: '13px 23px',
    borderRadius: '25px',
    margin: '15px 0',
    display: 'flex',
  },
  box_all_content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  box_label_tag: {
    display: 'flex',
    width: '63%',
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '10px',
    paddingBottom: '6px',
    borderWidth: '3px',
    border: '0.5px solid #d9d9d9',
    borderRadius: '5px',
    position: 'relative',
    padding: '5px 10px',
    textAlign: 'center'
  },
  box_distance: {
    marginLeft: '10px',
    marginTop: '10px',
    fontWeight: '700'
  },
  box_model: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box_all_model: {
    background: '#fff',
    width: '400px',
    height: '190px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box_confirm: {
    fontFamily: 'sans-serif',
    fontSize: '35px',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',
  },
  box_button_model: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '40px',
    marginTop: '25px',
  },
  box_table: {
    '.rc-table th': {
      border: '1px solid #cad1e2',
      whiteSpace: 'normal',
      padding: '10px',
      backgroundColor: '#f7f7f7',
  },
  '.rc-table td': {
      border: '1px solid #cad1e2',
      whiteSpace: 'normal',
      padding: '10px',
  },
  '.table table': {
      borderCollapse: 'collapse',
      width: '100%',

  },
  '.rc-table-cell': {
      textAlign: 'center',
  },
  '.email': {
    width: '500px'
  },
  },
  box_form_project: {
    overflow: 'auto',
    height: 'calc(100vh - 60px)'
  },
  box__project_container: {
    variant: 'variants.box_table',
    '.rc-table-thead': {
      zIndex: '1',
      position: 'sticky',
      top: '-2px'
    },
    '.rc-table-content': {
      overflow: 'auto',
      maxHeight: '70vh',
      '&::-webkit-scrollbar': {
        height: '7px',
        width: '7px',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        backgroundColor: '#7C8E9F',
      },
    },
    '.rc-table-cell': {
      textAlign: 'none',
    },
    '.description_col': {
      minWidth: '400px'
    },
    '.email_col': {
      minWidth: '100px',
    },
    '.name_col': {
      minWidth: '130px'
    },
    '.role_col': {
      maxWidth: '300px'
    }
  },
  box_loading_form: {
    display: 'flex',
    justifyContent: 'center',
    'img': {
      width: '75px',
      height: '75px'
    }
  },
  box_loading_skeleton: {
      variant: 'variants.box_sidebar',
      padding: '13px 23px',
      marginLeft: '20px',
      width: '200px',
      background: 'linear-gradient( 120deg, #ebf5ff 30%, #FFFFFF 38%, #FFFFFF 40%, #ebf5ff 48%)',
      backgroundSize: '200% 100%',
      backgroundPosition: '100% 0',
      animation: 'load 0.75s infinite',
      '@keyframes load': {
          '100%': {
          backgroundPosition: '-100% 0'
        }
      }
  }
}
