import { Box, Image, Link, Text } from 'rebass'
import { BASE_URL, STATE, API_LOGIN, CLIENT_ID } from '../../../environments/.env.dev'

const redirectUrl = `${BASE_URL}/auth/google/callback&state=${STATE}`
  .split(':')
  .join('%3A')
  .split('/')
  .join('%2F')
const linkAPILogin = `${API_LOGIN}${CLIENT_ID}&redirect_uri=${redirectUrl}`

export const SignIn: React.FC = () => {

  return (
    <>
      <Box variant='box_all_signin'>
        <Box variant='box_all_children'>
          <Box variant='box_signin_left_welcome'>
            <Text variant='text_gaming_platform'>GAMING PLATFORM</Text>
            <Image
              src='https://store.cloudflare.steamstatic.com/public/shared/images/login/join_pc.png?v=1'
              sx={{ width: 320, marginRight: '25px' }}
              alt=''
            />
            <Link variant='link_signin' href={linkAPILogin}>
              <Image
                src='https://app.sntsolutions.io/signin-google.svg'
                alt=''
                sx={{ marginRight: '5px' }}
              />
              Sign In With Google
            </Link>
          </Box>

          <Box variant='box_signin_right'>
            <Box variant='box_welcome_back'>WELCOME BACK</Box>
            <Link variant='link_signin_no_responsive' href={linkAPILogin}>
              <Image
                src='https://app.sntsolutions.io/signin-google.svg'
                alt=''
                sx={{ marginRight: '5px' }}
              />
              Sign In With Google
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  )
}
