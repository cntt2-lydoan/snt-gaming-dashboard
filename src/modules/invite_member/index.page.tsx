import { useCallback, useEffect, useMemo, useState } from 'react'
import useCompaniesContext from '../companies_register/logic/provider'
import { ICompanyContext } from '../companies_register/type'
import useProjectsContext from '../projects/logic/provider'
import { IProjectsContextProps } from '../projects/types'
import useInviteMemberContext from './logic/provider'
import { IInviteContextProps, IPermissionsInviteMember } from './type'
import useAuthContext from '../auth/logic/provider'
import { IAuthUser } from '../auth/types'
import { ListCompany } from './ui/listCompany'
import { usePermission } from '../../hooks/usePermission'
import { viewMemberPage } from '../../constants/checkPermission'
import { LoadingHOC } from '../../components/loadingHOC/loadingHOC'
import { useHistory, useLocation } from 'react-router-dom'
import { RoleCheckHOC } from '../../components/roleCheckHOC/roleCheckHOC'
import { Modes } from '../../constants/modes'
import { InviteMemberContent } from './ui/inviteMemberContent'

export const InviteMember = () => {
  const {
    loadingMember,
    setInviteMember,
    loadingInviteMember,
    getCompanyMember,
    inviteMember,
    curIDUserUpdate,
    curIDPerUpdate,
    deletingPermission,
  }: IInviteContextProps = useInviteMemberContext()
  const { userInfo }: IAuthUser = useAuthContext()
  const [companyIDRoleAdmin, setCompanyIDRoleAdmin] = useState('')
  const { getCompaniesAction, companies }: ICompanyContext = useCompaniesContext()
  const { getProjects, projects}: IProjectsContextProps = useProjectsContext()
  const [viewListCompany] = usePermission([viewMemberPage.viewListCompany]) as boolean[]
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    getCompaniesAction({})
    getProjects({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const permissionUpdate = useMemo(() =>
    inviteMember[curIDUserUpdate]?.permissions?.find((per) => per?.permissionID === curIDPerUpdate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  , [inviteMember, curIDUserUpdate, curIDPerUpdate])

  const permissionDelete = useMemo(() =>
    inviteMember[deletingPermission?.userID as string]?.permissions?.find((per) =>
            per?.permissionID === deletingPermission?.permissionID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  , [inviteMember, deletingPermission?.userID, deletingPermission?.permissionID])

  const currentCompanyID = useMemo(() => {
    const companyIDQuery =  new URLSearchParams(location?.state as string).get('companyID')

    if (viewListCompany){

        return companyIDQuery || companyIDRoleAdmin
    }

    return userInfo?.access?.companyID
  }, [userInfo, viewListCompany, companyIDRoleAdmin, location?.state])

  const handleCompanyChange = useCallback((companyID: string) => {
    setCompanyIDRoleAdmin(companyID)
    if (!companyID) return
    setInviteMember({})

    history.push({
      pathname: location.pathname,
      search: 'company',
      state: `?companyID=${companyID}`
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname])

  return (
      <>
        <RoleCheckHOC arrRoleAccess={viewMemberPage.viewPage} mode={Modes.NOTI_NO_PERMISSION}>
          <RoleCheckHOC arrRoleAccess={viewMemberPage.viewListCompany} mode={Modes.HIDE}>
            <ListCompany
            currentCompanyID={currentCompanyID as string}
            handleCompanyChange={handleCompanyChange}
            companies={companies}
            loadingInviteMember={loadingInviteMember}
            loadingPerUpdate={permissionUpdate?.loadingUpdate as boolean}
            loadingPerDelete={permissionDelete?.actionDisable as boolean}/>
          </RoleCheckHOC>

          {currentCompanyID &&
            <LoadingHOC
            loading={loadingMember || !Object.keys(inviteMember)?.length}
            value={currentCompanyID as string}
            callback={() => {
              if (viewListCompany || !Object.keys(inviteMember)?.length){
                getCompanyMember(currentCompanyID as string, {})
              }
            }}>
              <InviteMemberContent
              currentCompanyID={currentCompanyID as string}
              companies={companies}
              projects={projects}
              loadingInviteMember={loadingInviteMember}
              inviteMember={inviteMember}
              curIDUserUpdate={curIDUserUpdate}
              curIDPerUpdate={curIDPerUpdate as string}
              permissionUpdate={permissionUpdate as IPermissionsInviteMember}
              setInviteMember={setInviteMember}
              deletingPermission={deletingPermission as IPermissionsInviteMember}
              />
            </LoadingHOC>}
        </RoleCheckHOC>
      </>
  )
}