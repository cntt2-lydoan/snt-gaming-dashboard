import { hooks } from '@snt/react-cores'
import { useCallback, useState } from 'react'
import { Box, Text } from 'rebass'
import { Roles } from '../../../components/constants/roles'
import { Dialog } from '../../../components/dialog/dialog'
import { BaseDrawer } from '../../../components/drawer/drawer'
import { BaseHeaderCreate } from '../../../components/hearder_create'
import { BaseModel } from '../../../components/modal/modal'
import { RoleCheckHOC } from '../../../components/roleCheckHOC/roleCheckHOC'
import { viewMemberPage } from '../../../constants/checkPermission'
import { Modes } from '../../../constants/modes'
import { ICompany } from '../../companies_register/type'
import { IProject } from '../../projects/types'
import useInviteMemberContext from '../logic/provider'
import { IInviteContextProps, IInviteMember, IPermissionsInviteMember } from '../type'
import { FormInviteMember, IFormInviteMember } from './formInviteMember'
import { InfoMember } from './infoMember'

interface IProps {
    children?: React.ReactNode,
    currentCompanyID: string,
    companies: {[key: string] : ICompany},
    projects: {[key: string] : IProject},
    loadingInviteMember: boolean,
    inviteMember: {[key: string] : IInviteMember},
    curIDUserUpdate: string,
    curIDPerUpdate: string,
    permissionUpdate: IPermissionsInviteMember,
    setInviteMember: (inviteMember: {[key: string]: IInviteMember}) => void,
    deletingPermission: IPermissionsInviteMember
  }

  export enum TitleForm {
    INVITE_MEMBER = 'INVITE MEMBER',
    EDIT_PERMISSION = 'EDIT PERMISSION'
  }

  export const InviteMemberContent: React.FC<IProps> = ({
    currentCompanyID,
    companies,
    projects,
    loadingInviteMember,
    inviteMember,
    curIDUserUpdate,
    curIDPerUpdate,
    permissionUpdate,
    setInviteMember,
    deletingPermission,
    }) => {

      const {
        deletePermission,
        createMember,
        updatePermission,
        setDeletingPermission,
        setCurIDPerUpdate,
        setCurIDUserUpdate,
      }: IInviteContextProps = useInviteMemberContext()
      const [isShowDrawer, setIsShowDrawer] = useState(false)
      const [isShowDialogDel, setIsShowDialogDel] = useState(false)
      const { enqueueSnackbar }: hooks.WithSnackbarProps = hooks.useNoti()

      const handleInviteMember = (values: IFormInviteMember) => {
        if ([Roles.PROJECT_MANAGER, Roles.PROJECT_STAFF].includes(values?.roleName as Roles)){

          const valueInvite = {
            email: values?.email,
            projectID: values?.projectID,
            roleName: values?.roleName,
          }
          createMember(valueInvite, values?.companyID as string)
          setIsShowDrawer(false)

          return
        }

        const infoMemberInvite = {
          roleName: values?.roleName,
          email: values?.email
        }
        createMember(infoMemberInvite, values?.companyID as string)

        setIsShowDrawer(false)

      }

      const handleUpdatePer = (values: IFormInviteMember) => {
        if ([Roles.PROJECT_MANAGER, Roles.PROJECT_STAFF].includes(values?.roleName as Roles)){

          const valuePerUpdate = {
            roleName: values.roleName,
            projectID: values.projectID
          }
          updatePermission(
            curIDUserUpdate as string,
            curIDPerUpdate as string,
            valuePerUpdate
          )
          setIsShowDrawer(false)

          return
        }

        const valPerUpdate = {
          roleName: values.roleName
        }
        updatePermission(
          curIDUserUpdate as string,
          curIDPerUpdate as string,
          valPerUpdate
        )
        setIsShowDrawer(false)
      }

      const handelShowPermissions  = useCallback((currentIDMember: string) => {

        if (!currentIDMember){

          return
        }
        setInviteMember({
          ...inviteMember,
          [currentIDMember]: {
            ...inviteMember[currentIDMember],
            isShowInfoPermission: !inviteMember[currentIDMember].isShowInfoPermission
          }
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [inviteMember])

      const MemberInfo = useCallback(() => {
        return (
          <>
            {Object.values(inviteMember).map((member, idx) => (
                <Box key={idx}>
                    <InfoMember member={member}
                    handelShowPermissions={handelShowPermissions}
                    projects={projects}
                    setIsShowDrawer={setIsShowDrawer}
                    setIsShowDialogDel={setIsShowDialogDel}
                    setDeletingPermission={setDeletingPermission}
                    setCurIDPerUpdate={setCurIDPerUpdate}
                    setCurIDUserUpdate={setCurIDUserUpdate}
                    enqueueSnackbar={enqueueSnackbar}
                    loadingInviteMember={loadingInviteMember}/>
                </Box>
            ))}
          </>
        )
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [inviteMember])

      return (
        <>
          <Box variant='box'>
            <RoleCheckHOC arrRoleAccess={viewMemberPage.viewBtnCreate} mode={Modes.HIDE}>
              <BaseHeaderCreate
                variant='header'
                onClick={() => {
                  setCurIDPerUpdate('')
                  setIsShowDrawer(!isShowDrawer)
                }}
              />
            </RoleCheckHOC>
            <form>
              <Box sx={{
                 display: 'flex',
                 fontSize: '20px',
                 fontFamily: 'inherit',
                 fontWeight: '600px',
                 width: '100%',
                 justifyContent: 'space-between',
                 background: '#f7f7f7',
                 height: '40px',
                 alignItems: 'center'
              }}>
                <Text sx={{fontWeight: 'bold', color: '#0B4082', marginLeft: '10px'}}>{companies[currentCompanyID]?.name}</Text>
              </Box>
              <MemberInfo/>
            </form>
            <Dialog isOpen={isShowDrawer}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ background: '#fff', height: '100vh', width: '300px' }}>
                  <BaseDrawer
                    title={curIDPerUpdate ? TitleForm.EDIT_PERMISSION : TitleForm.INVITE_MEMBER}
                    onClick={() => setIsShowDrawer(false)}>
                      <FormInviteMember
                      companyID={currentCompanyID}
                      handleSubmit={curIDPerUpdate ? handleUpdatePer : handleInviteMember}
                      curIDPerUpdate={curIDPerUpdate}
                      projects={projects}
                      companies={companies}
                      permissionUpdate={permissionUpdate}
                      />
                  </BaseDrawer>
                </Box>
              </Box>
            </Dialog>
            <Dialog isOpen={isShowDialogDel}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <BaseModel
                  isShow={isShowDialogDel}
                  isOpen={() => setIsShowDialogDel(false)}
                  onclick={() => {
                    deletePermission(deletingPermission?.permissionID as string, deletingPermission?.userID as string);
                    setIsShowDialogDel(false)
                  }}
                />
              </Box>
            </Dialog>
          </Box>
        </>
      )
  }