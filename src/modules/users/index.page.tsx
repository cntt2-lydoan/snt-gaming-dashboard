import { Switch } from '@rebass/forms'
import React, { useCallback, useEffect, useMemo } from 'react'
import { Box, Image, Text } from 'rebass'
import { Loading } from '../../components/loading/loading'
import { RoleCheckHOC } from '../../components/roleCheckHOC/roleCheckHOC'
import { BaseTable } from '../../components/table/table'
import { viewUserPage } from '../../constants/checkPermission'
import { Modes } from '../../constants/modes'
import { convertValueStringFromArrObjectByKey } from '../../helpers/convert_value_to_object'
import useAuthContext from '../auth/logic/provider'
import { IAuthUser, IUserInfo } from '../auth/types'
import useUsersContext from './logic/provider'
import { ITypePermissions, IUser, IUserContext, PermissionStatus, UserStatus } from './types'

interface IProps {
    children?: React.ReactNode,
}
interface IColumnType {
    users: {[key: string] : IUser},
    userInfo: IUserInfo,
    toggleSwitch: (currentStatus: string , userID: string) => void
}

const columns = ({users, userInfo, toggleSwitch}: IColumnType) => {
    return [
        {
            title: 'No.',
            render: (value: IUser, record: IUser, index: number) => {
                return (
                    <span>{index + 1}</span>
                )
            },
        },
        {
            title: 'User Name',
            dataIndex: 'userID',
            key: 'name',
            render: (userID: string) => {
                return (
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Text>
                            {users[userID]?.displayName}
                        </Text>
                        {userID === userInfo?.userID &&
                            <Text sx={{color: '#637492', marginLeft: '5px'}}>(you)</Text>
                        }
                    </Box>
                )
            },
            className: 'name_col'
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar: string) => {
                return (
                    <Box>
                        <Image src={(avatar)}/>
                    </Box>
                )
            }
        },
        {
            title: 'User Role',
            dataIndex: 'permissions',
            key: 'permissions',
            render: (permissions: ITypePermissions[]) => {

                function isActive(item: ITypePermissions): boolean {
                    const isvalid = item.status === PermissionStatus.ACCEPTED

                    return isvalid
                }

                const permissionsValue = convertValueStringFromArrObjectByKey<string |
                ITypePermissions, ITypePermissions>(permissions, 'roleName', isActive)

                return (
                    <Box>{(permissionsValue || []).join(', ')}</Box>
                )
            },
            className: 'role_col'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            className: 'email_col'
        },
        {
            title: 'Status',
            dataIndex: '',
            key: 'status',
            render: (user: IUser) => {
                const currentStatus = user?.status

                return (
                    <Box key={user?.userID}>
                        <Switch
                        disabled={(user?.userID === userInfo?.userID) || user?.actionDisable}
                        variant='switch_status'
                        name='status'
                        checked={currentStatus?.toUpperCase() === UserStatus.ACTIVE}
                        onClick={() => toggleSwitch(currentStatus , user?.userID)}
                        />
                    </Box>
                )
            }
        }
    ]
}

const UserContent : React.FC<IProps> = () => {
    const { users , getUsers, updateUserStatus, loadingByUserID } : IUserContext = useUsersContext()
    const {userInfo} : IAuthUser = useAuthContext()
    useEffect(() => {

        getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleSwitch = useCallback((currentStatus: string , userID: string) => {
        const curEditStatus = (currentStatus?.toUpperCase() === UserStatus.ACTIVE ? 'deactivate' : 'active')
        updateUserStatus(userID, curEditStatus)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users])

    const data = useMemo(() => {
         return Object.values(users).map((each, idx) => {
             return {
                ...each,
                key: idx.toString()
            }
        })
    }, [users])

    if (loadingByUserID){
        return <Loading/>
    }

    return (
        <Box variant='box__project_container' >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>GAMING PLATFORM DASHBOARD USERS</h3>
            </Box>
            <BaseTable columns={columns({users, userInfo, toggleSwitch})} data={data} className='table' variant='box_table' />
        </Box>
    );
}

export const User = () => (
    <RoleCheckHOC
    arrRoleAccess={viewUserPage.viewListUser}
    mode={Modes.NOTI_NO_PERMISSION}>
        <UserContent/>
    </RoleCheckHOC>
)