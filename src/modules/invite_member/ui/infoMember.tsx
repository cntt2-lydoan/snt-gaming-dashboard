import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack'
import { useMemo } from 'react'
import { Box, Text } from 'rebass'
import { Roles } from '../../../components/constants/roles'
import { OptionShowMember } from '../../../components/option_member'
import { BaseTable } from '../../../components/table/table'
import { updatePermission, viewMemberPage } from '../../../constants/checkPermission'
import { usePermission } from '../../../hooks/usePermission'
import useAuthContext from '../../auth/logic/provider'
import { IAuthUser } from '../../auth/types'
import { IProject } from '../../projects/types'
import { IInviteMember, IPermissionsInviteMember } from '../type'

interface IProps {
  member: IInviteMember,
  handelShowPermissions: (currentIDMember: string) => void,
  projects: {[key: string]: IProject},
  setIsShowDrawer: (isShowDrawer: boolean) => void,
  setIsShowDialogDel: (temp: boolean) => void,
  setDeletingPermission: (item: IPermissionsInviteMember) => void,
  setCurIDPerUpdate: (curIDPerUpdate: string) => void,
  setCurIDUserUpdate: (curIDUserUpdate: string) => void,
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey,
  loadingInviteMember: boolean
}

interface IColumnType {
  projects: {[key: string]: IProject},
  viewActionColum: boolean,
  onEditPermission: (
    userID: string,
    roleName: string,
    actionDisable: boolean,
    permissionID: string,
  ) => void,
  onDeletePermission: (
    userID: string,
    actionDisable: boolean,
    permission: IPermissionsInviteMember,
    loadingUpdate: boolean,
  ) => void,
}

const columns  = ({
  projects,
  viewActionColum,
  onEditPermission,
  onDeletePermission
} : IColumnType) => ([
  {
    title: 'Project',
    dataIndex: 'projectID',
    key: 'projectID',
    width: 300,
    render: (projectID: string) => (<Box key={projectID}>{projects[projectID]?.name}</Box>),
  },
  {
    title: 'Role',
    dataIndex: 'roleName',
    key: 'roleName',
    width: 300,
    render: (item: string) => (<Box >{item}</Box>),
  },
  {
    title: 'Create At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 300,
    render: (item: string) => {
      const dateCreate = new Date().toISOString()

      return <Box>{(item ? item : dateCreate).slice(0, 10)}</Box>
    },
  },
  ...viewActionColum ? [{
    title: 'Actions',
    dataIndex: '',
    key: 'Actions',
    render: (item: IPermissionsInviteMember) => {

      return (
        <Box>
          <FontAwesomeIcon
            fontSize='20px'
            style={{ marginRight: '10px', cursor: 'pointer' }}
            color='rgb(33, 131, 255)'
            icon={faEdit as IconProp}
            onClick={() => onEditPermission(
              item?.userID as string,
              item?.roleName,
              item?.actionDisable as boolean,
              item?.permissionID,
            )}
          />
          <FontAwesomeIcon
            style={{ cursor: 'pointer' }}
            fontSize='20px'
            color='#808080'
            icon={faTrashAlt as IconProp}
            onClick={() => onDeletePermission(
              item?.userID as string,
              item?.actionDisable as boolean,
              item,
              item?.loadingUpdate as boolean,
            )}
          />
        </Box>
      )
    },
  }] : []
])

export const InfoMember: React.FC<IProps> = ({
  member,
  handelShowPermissions,
  projects,
  setIsShowDrawer,
  setIsShowDialogDel,
  setDeletingPermission,
  setCurIDPerUpdate,
  setCurIDUserUpdate,
  enqueueSnackbar,
}) => {
    const [viewActionColum, canEditCompanyManager] = usePermission([
      viewMemberPage.viewAction,
      updatePermission.companyManager,
    ]) as boolean[]

    const { userInfo }: IAuthUser = useAuthContext()

    const onEditPermission = (
      userID: string,
      roleName: string,
      actionDisable: boolean,
      permissionID: string,
    ) => {
      if (userInfo?.userID === userID){
        enqueueSnackbar('You can not update your permission!', { variant: 'warning'})

        return
      }

      if (!canEditCompanyManager && (roleName === Roles.COMPANY_MANAGER)){
        enqueueSnackbar('Your account can not update permission!', { variant: 'warning'})

        return
      }

      if (actionDisable){
        enqueueSnackbar('Permission is being removed!', { variant: 'warning'})

        return
      }

      setIsShowDrawer(true)
      setCurIDPerUpdate(permissionID)
      setCurIDUserUpdate(userID as string)
    }

    const onDeletePermission = (
      userID: string,
      actionDisable: boolean,
      permission: IPermissionsInviteMember,
      loadingUpdate: boolean,
    ) => {
      if (userInfo?.userID === userID){
        enqueueSnackbar('You can not delete your permission!', { variant: 'warning'})

        return
      }

      if (actionDisable){
        enqueueSnackbar('Permission is being removed!', { variant: 'warning'})

        return
      }

      if (loadingUpdate){
        enqueueSnackbar('Permission is being updated!', { variant: 'warning'})

        return
      }

      setIsShowDialogDel(true)
      setDeletingPermission(permission)
    }

    const memberPermission = useMemo(() => {
      return member?.permissions?.map((permission, index) => ({
        ...permission,
        userID: member?.userID,
        key: index,
      }))
    }, [member])

    return (
      <Box>
        {!!member?.permissions?.length &&
          <Box>
            <Box
              sx={{
                width: '100%s',
                display: 'flex',
                justifyContent: 'space-between',
                height: '80px',
                alignItems: 'center',
                border: '1px solid #f7f7f7',
                marginTop: '10px',
                boxShadow: '0px 2px 0px 0px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
              }}
              onClick={() => handelShowPermissions(member?.userID)}
            >
              <Box sx={{ marginLeft: '10px' }}>
                <Box sx={{display: 'flex'}}>
                  <Box sx={{fontWeight: 'bold'}}>
                    {
                      member?.displayName
                        ? member?.displayName
                        : <Text sx={{color: '#637492', fontWeight: 'normal'}}>(Account inactive)</Text>
                    }
                  </Box>
                  {member?.userID === userInfo?.userID &&
                    <Text sx={{color: '#637492', marginLeft: '5px'}}>(you)</Text>
                  }
                </Box>
                <Box sx={{ marginTop: '10px' }}>{member?.email}</Box>
              </Box>

              <FontAwesomeIcon
                style={{ marginRight: '10px' }}
                fontSize='20px'
                icon={faAngleDown as IconProp}
              />
            </Box>
            <OptionShowMember isOpen={member?.isShowInfoPermission}>
              <Box variant='box__project_container'>
                <BaseTable
                  columns={columns({
                    projects,
                    viewActionColum,
                    onEditPermission,
                    onDeletePermission,
                  })}
                  data={memberPermission}
                  className='table'
                  variant='box_table'
                  />
              </Box>
            </OptionShowMember>
          </Box>
        }
      </Box>
    )
}