import { ThemeProvider } from 'emotion-theming'
import { hoc, ultis } from '@snt/react-cores'
import { routes } from './routers'
import { providers } from './providers'
import { ErrorPage } from './modules/error/index.page'
import { baseConfig } from './ultis/base_config'
import { theme } from './theme'
import { convertAccess } from './helpers/convert_access'
import { Roles } from './components/constants/roles'
import { Layout } from './components/layout/layout'

ultis.firstSetup(baseConfig)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <hoc.SettingHOC
        routes={routes}
        ErrorPage={ErrorPage}
        providers={providers}
        baseConfig={baseConfig}
        Layout={Layout}
        onUserInfo={(result, context) => {
          // need to set result, what is response from endpoint users/me in baseConfig, to provider
          if (result?.status !== 200) {
            context?.setUserInfo({})

            return
          }

          const convertUser = convertAccess(result?.data)

          context?.setUserInfo(convertUser)
          if (
            convertUser?.access?.isAdmin  ||
            (convertUser?.access?.companyRoles as string[])?.includes(Roles.COMPANY_MANAGER) ||
            (convertUser?.access?.companyRoles as string[])?.includes(Roles.PROJECT_MANAGER)
          ) {

            return
          }
          localStorage.removeItem('access_token')
          window.location.href = '/signin'

        }}
      />
    </ThemeProvider>
  )
}

export default App
