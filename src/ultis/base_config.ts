import { hoc } from '@snt/react-cores';
import { AuthContext } from '../modules/auth/logic/provider';

export const baseConfig: hoc.IBaseConfig = {
  base_url: process?.env?.BASE_URL as string || 'https://1xzplmn9ql.execute-api.ap-southeast-1.amazonaws.com',
  shouldUseCookie: false,
  publicPaths: ['/signin'],
  auth: {
    thirdPartyRedirect: '/',
    redirectPath: '/signin',
    userInfoApi: {
      path: 'users/me',
      method: 'GET'
    },
    // TODO: should change index for UserProvider, Example: 1 is ExampleProvider in providers file
    context: AuthContext,
  },
  baseRoute: '/',

  notiPosition: {
    vertical: 'top',
    horizontal: 'right',
  },
}