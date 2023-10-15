import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowCircleLeft,
  faBars,
  faComment,
  faLaptopHouse,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '@rebass/forms'
import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, Text } from 'rebass'
import { Dialog } from '../dialog/dialog'
import { Modes } from '../../constants/modes'
import { RoleCheckHOC } from '../roleCheckHOC/roleCheckHOC'
import { viewUserPage } from '../../constants/checkPermission'

const ContentSidebar = [
  {
    title: 'Items',
    icon: faComment,
    link: 'items'
  },
  {
    title: 'Projects',
    icon: faComment,
    link: 'projects'
  },
  {
    title: 'Invite Member',
    icon: faComment,
    link: 'invite-member'
  },
  {
    title: 'Staffs',
    icon: faComment,
  },
  {
    title: 'Companies',
    icon: faComment,
    link: 'companies'
  },
  {
    title: 'Support Cases',
    icon: faComment
  },
  {
    title: 'User Manager',
    icon: faComment,
    link: 'users'
  },
  {
    title: 'Item Variants',
    icon: faComment,
    link: 'itemVariants'
  },
]

export const Sidebar: React.FC = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false)
  const history = useHistory()
  const logOut = useCallback(() => {
    localStorage.removeItem('access_token')
    history.replace('/signin')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const RenderSidebar = () => {
    return (
      <>
        <Box variant='box_all_sidebar'>
          {isShowSidebar && (
            <FontAwesomeIcon
              style={{ marginLeft: '280px', marginTop: '10px' }}
              fontSize='20px'
              color='#7c8bad'
              icon={faTimes as IconProp}
              onClick={() => setIsShowSidebar(false)}
            />
          )}
          <Box sx={{ paddingTop: '20px', width: '95%', paddingLeft: '10px' }}>
            <Box variant='box_text_name_project'>DashBoard</Box>

            <Box sx={{ borderBottom: '1px solid #cad1e2' }}>
              <Box sx={{ position: 'relative' }}>
                <Input
                  type='text'
                  placeholder='Search...'
                  sx={{
                    border: 'none',
                    background: '#f8f9ff',
                    padding: '15px 0 15px 20%',
                    borderRadius: '28px',
                    color: '#202d45',
                    '&:focus-visible': {
                      outline: 'none',
                    },
                    '&::placeholder': {
                      color: '#7d8db3',
                    },
                  }}
                />
                <Box variant='box_search'>
                  <FontAwesomeIcon fontSize='20px' color='#7c8bad' icon={faSearch as IconProp} />
                </Box>
              </Box>
              <Box variant='box_all_sidebar_child'>
                <Box variant='box_dash_board'>
                  <FontAwesomeIcon
                    fontSize='20px'
                    color={'#2183ff'}
                    icon={faLaptopHouse as IconProp}
                  />
                  <Text sx={{ fontWeight: '500', marginLeft: '10px', color: '#0b4082' }}>
                    DashBoard
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box variant='box_all_content'>
              {ContentSidebar.map((item, idx) => {
                if (item.title === 'User Manager'){
                  return <RoleCheckHOC key={idx}
                          arrRoleAccess={viewUserPage.viewListUser}
                          mode={Modes.HIDE}>
                          <Box variant='box_sidebar' sx={{ padding: '13px 23px' }} onClick={() => history.push(`${item.link}`)}>
                            <FontAwesomeIcon
                              fontSize='20px'
                              color={'rgba(57, 69, 99)'}
                              icon={item.icon as IconProp}
                              style={{ marginRight: '10px' }}
                            />
                            {item.title}
                          </Box>
                        </RoleCheckHOC>
                }

                return (
                  <Box
                    variant='box_sidebar'
                    key={idx}
                    sx={{ padding: '13px 23px' }}
                    onClick={() => history.push(`${item.link}`)}
                  >
                    <FontAwesomeIcon
                      fontSize='20px'
                      color={'rgba(57, 69, 99)'}
                      icon={item.icon as IconProp}
                      style={{ marginRight: '10px' }}
                    />
                    {item.title}
                  </Box>
                )
              })}
              <Box variant='box_sidebar' sx={{ padding: '13px 23px' }} onClick={logOut}>
                <FontAwesomeIcon
                  fontSize='20px'
                  color={'rgba(57, 69, 99)'}
                  icon={faArrowCircleLeft as IconProp}
                  style={{ marginRight: '10px' }}
                />
                Logout
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    )
  }

  return (
    <>
      <Box>
        <Button variant='button_icon_sidebar' onClick={() => setIsShowSidebar(!isShowSidebar)}>
          <FontAwesomeIcon color={'#0b3f7a'} icon={faBars as IconProp} />
        </Button>
        <Dialog isOpen={isShowSidebar}>
          <RenderSidebar />
        </Dialog>
      </Box>
      <Box sx={{ display: ['none', 'none', 'none', 'flex'] }}>
        <RenderSidebar />
      </Box>
    </>
  )
}
