import { createContext, useCallback, useContext, useState } from 'react'
import { hooks } from '@snt/react-cores'
import { IResponseDataType } from '../../../types'
import { IInviteContextProps, IInviteMember, IPermissionsInviteMember } from '../type'
import { IFormInviteMember } from '../ui/formInviteMember'
import { getMemberCompanyFromApi, deletePermissionFromApi, createMemberFromApi, updatePermissionFromApi } from './api'
import { Roles } from '../../../components/constants/roles'

export const InviteMemberContext = createContext<IInviteContextProps>(null!)
export const InviterMemberProvider: React.FC = ({ children }) => {
  const [inviteMember, setInviteMember] = useState<{ [key: string]: IInviteMember }>({})
  const [loadingMember, setLoadingMember] = useState(false)
  const [deletingPermission, setDeletingPermission] = useState<IPermissionsInviteMember | null>(null!)
  const [curIDPerUpdate, setCurIDPerUpdate] = useState<string | null>(null!)
  const [curIDUserUpdate, setCurIDUserUpdate] = useState<string>('')
  const [loadingInviteMember, setLoadingInviteMember] = useState(false)
  const { enqueueSnackbar }: hooks.WithSnackbarProps = hooks.useNoti()
  const getCompanyMember = useCallback(
    (companyID: string,
     query: {
      status?: string,
      sortBy?: string,
      sortDirection?: string
    }) => {
    setLoadingMember(true)
    if (!companyID){

      return
    }
    const params = {
      status: query.status || 'ACCEPTED',
      sortBy: query.sortBy || 'createdAt',
      sortDirection: query.sortDirection || 'DESC'
    }
    void getMemberCompanyFromApi(companyID, params).then((res: IResponseDataType<IInviteMember>) => {
      setInviteMember(res?.list)
    })

    .catch((error) => {
      enqueueSnackbar('There is something wrong when getting users!', { variant: 'error' })
      throw error
    })

    .finally(() => {
      setLoadingMember(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createMember = useCallback((data: IFormInviteMember, companyID: string) => {

    setLoadingInviteMember(true)

    void createMemberFromApi(data, companyID).then((res) => {
        if (res?.status !== 200) {
          enqueueSnackbar('Invite member fail!', { variant: 'error' })

          return
        }

        if (!res?.data){
          return
        }

        setInviteMember((prev) => {
          const existedMember = Object.values(prev).find((val) => val?.email === res?.data?.email)

          if (existedMember){
            return ({
              ...prev,
              [res?.data?.userID]: {
                ...prev[res?.data?.userID],
                permissions: [...existedMember.permissions, res?.data?.permission]
              }
            })
          }

          return ({
            [res?.data?.userID]:  {
              ...prev[res?.data?.userID],
              userID: res?.data?.userID,
              email: res?.data?.email || '',
              permissions: [
                res?.data?.permission
              ]
            },
            ...prev
          })
        })

        enqueueSnackbar('Invite member successfully!', { variant: 'success' })

    })
    .catch((error) => {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
      throw error
    })
    .finally(() => {
      setLoadingInviteMember(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [inviteMember])

  const deletePermission = useCallback((permissionID: string, userID: string) => {
    setInviteMember(() => {
      const newPermission = inviteMember[userID as string].permissions.map((item) => {
        if (item?.permissionID === permissionID) {
          return ({
            ...item,
            actionDisable: true
          })
        }

        return item
      })

      return ({
          ...inviteMember,
        [userID]: {
          ...inviteMember[userID],
          permissions: newPermission
        }
      })
    })
    void deletePermissionFromApi(permissionID).then((res) => {
      if (!userID) {
        enqueueSnackbar('Member not found!', { variant: 'error' })

        return
      }
      if (res?.status !== 200){
        enqueueSnackbar('Delete member fail!', { variant: 'error' })

        return
      }

      if (!res?.data){

        return
      }

      setInviteMember((prev) => {
        const permissionsAfterDelete = prev[userID as string].permissions.filter((item) => item.permissionID !== permissionID)

        return ({
          ...prev,
          [userID as string]: {
            ...prev[userID as string],
            permissions: permissionsAfterDelete,
          }
        })
      })
      enqueueSnackbar('Delete member successfully!', { variant: 'success' })

    })
    .catch((error) => {
      enqueueSnackbar('Delete member fail!', { variant: 'error' })
      throw error
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteMember])

  const updatePermission = useCallback((userID: string, permissionID?: string, values?: IFormInviteMember) => {
    setInviteMember((prev) => {
      const permissionUpdated = prev[userID as string].permissions.map(val => {

        if (val?.permissionID !== permissionID) {

            return val
        }

        return {
          ...val,
          loadingUpdate: true
        }
      })

      return({
        ...prev,
        [userID as string]: {
          ...prev[userID as string],
          permissions: permissionUpdated
        }
      })

    })
    void updatePermissionFromApi(permissionID as string, values as IFormInviteMember).then((res) => {
      if (!res){
        enqueueSnackbar('Member not found!', { variant: 'error' })

        return
      }

      setInviteMember((prev) => {
        const permissionUpdated = prev[userID as string].permissions.map(val => {
          if (val?.permissionID !== permissionID) {

              return val
          }

          if ([Roles.COMPANY_MANAGER, Roles.COMPANY_STAFF].includes(values?.roleName as Roles)){
            const perUpdate = {
              ...val,
              projectID: ''
            }

            return ({
              ...perUpdate,
              ...values
            })
          }

          return {
            ...val,
            ...values
          }
        })

        return({
          ...prev,
          [userID as string]: {
            ...prev[userID as string],
            permissions: permissionUpdated
          }
        })

      })

      enqueueSnackbar('Update member successfully!', { variant: 'success' })

    })
    .catch((error) => {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
      throw error
    })
    .finally(() => {
      setInviteMember((prev) => {
        const permissionUpdated = prev[userID as string].permissions.map(val => {
          if (val?.permissionID !== permissionID) {

              return val
          }

          return {
            ...val,
            loadingUpdate: false
          }
        })

        return({
          ...prev,
          [userID as string]: {
            ...prev[userID as string],
            permissions: permissionUpdated
          }
        })
      })
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteMember])

  return (
    <InviteMemberContext.Provider
      value={{
        inviteMember,
        setInviteMember,
        getCompanyMember,
        createMember,
        deletePermission,
        updatePermission,
        loadingMember,
        setLoadingMember,
        deletingPermission,
        setDeletingPermission,
        curIDPerUpdate,
        setCurIDPerUpdate,
        curIDUserUpdate,
        setCurIDUserUpdate,
        loadingInviteMember,
        setLoadingInviteMember
      }}
    >
      {children}
    </InviteMemberContext.Provider>
  )
}
export default function useInviteMemberContext() {
  const context = useContext(InviteMemberContext)
  if (!context) {
    throw new Error('useInviteMemberContext must be used within a InviterMemberProvider')
  }

  return context
}
