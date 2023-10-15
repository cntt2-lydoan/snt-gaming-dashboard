import { Box, Image, Text } from 'rebass'
import useAuthContext from '../../modules/auth/logic/provider'
import { IAuthUser} from '../../modules/auth/types'
import { Loading } from '../loading/loading'

export const Header: React.FC = () => {
  const {userInfo, loading} : IAuthUser = useAuthContext()


  return (
    <Box variant='box_all_header'>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              width: ['90px'],
              height: ['100px'],
            }}
          >
          {loading ? <Loading/> :
            <Image src={userInfo?.avatar} alt='' variant='img_header' />
          }
          </Box>
          <Box sx={{ lineHeight: 1.4, marginLeft: '20px', paddingTop: '1px' }}>
            <Text sx={{ fontSize: '40px' }}>{userInfo?.displayName}</Text>
            <Text sx={{ fontSize: '16px', fontWeight: 300, color: '#536387' }}>
              Here are your stats for Today, 24 Aug 2022
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
