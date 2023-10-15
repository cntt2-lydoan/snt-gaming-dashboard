import { createContext, useCallback, useContext, useState } from 'react'
import { hooks } from '@snt/react-cores'
import { IResponseDataType } from '../../../types'
import { IUser, IUserContext } from '../types'
import { getUsersFromApi, updateUserFromApi} from './api'

export const usersContext = createContext<IUserContext>(null!)
export const UsersProvider: React.FC = ({ children }) => {
    const { enqueueSnackbar }: hooks.WithSnackbarProps = hooks.useNoti()
    const [users, setUsers] = useState<{[key: string]: IUser}>({})
    const [loadingByUserID, setLoadingByUserID] = useState(false)
    const getUsers = useCallback(() => {
        setLoadingByUserID(true)
        void getUsersFromApi().then((response: IResponseDataType<IUser>) => {
            setUsers(response.list)
        })
        .catch((error) => {
            enqueueSnackbar('There is something wrong when getting users!', { variant: 'error' })
            throw error
        })

        .finally(() => {
            setLoadingByUserID(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateUserStatus = useCallback((userID?: string, status?: string) => {
        if (!userID) {
          enqueueSnackbar('Users not found!', { variant: 'error' })

          return
        }

        setUsers({
          ...users,
          [userID]: {
            ...users[userID],
            actionDisable: true
          }
        })

        void updateUserFromApi(userID, status)
        .then((response) => {

            if (response?.status !== 200) {
              enqueueSnackbar('Update user fail!', { variant: 'error' })

              return
            }
            if (!response?.data){
              return
            }

            const tempUser: IUser = {
              ...users[userID],
              status: status || '',
              actionDisable: false
            }

            setUsers((preUsers) => ({
              ...preUsers,
              [userID]: tempUser
            }))
            enqueueSnackbar('Update user successfully!', { variant: 'success' })

            return

          })
          .catch((error) => {
            enqueueSnackbar('Update user fail!', { variant: 'error' })
            throw error
          })
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [users, enqueueSnackbar])

    return (
        <usersContext.Provider
        value={{
            users,
            setUsers,
            getUsers,
            updateUserStatus,
            loadingByUserID,
            setLoadingByUserID
        }}
        >
            {children}
        </usersContext.Provider>
    )
}
export default function useUsersContext() {
    const context = useContext(usersContext)
    if (!context) {
      throw new Error('useUsersContext must be used within a UsersProvider')
    }

    return context
}
