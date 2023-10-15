import { Box, Text } from 'rebass';
import { Modes } from '../../constants/modes';
import { usePermission } from '../../hooks/usePermission';
import useAuthContext from '../../modules/auth/logic/provider';
import { IAuthUser } from '../../modules/auth/types';
import { Loading } from '../loading/loading';

interface IProps {
    arrRoleAccess: string[],
    mode: Modes
}

interface IModeProps {
    componentMode: Modes
}

const LoadingComponent: React.FC<IModeProps> = ({componentMode}) => {
    if (componentMode === Modes.HIDE){
        return <Box variant='box_loading_skeleton'/>
    }

    return <Loading/>
}

const NoPermissionComponent: React.FC<IModeProps> = ({componentMode}) => {
    if (componentMode === Modes.HIDE){
        return <></>
    }

    return <Box sx={{marginTop: '10px'}}>
                <Text sx={{textAlign: 'center', fontSize: '16px', fontWeight: '300', color: '#536387'}}>
                You do not seem to have sufficient permissions to access this page.
                Please contact your manager to request more permissions.
                </Text>
            </Box>
}

export const RoleCheckHOC: React.FC<IProps> = ({children, arrRoleAccess, mode}) => {
    const {userInfo} : IAuthUser = useAuthContext()
    const [isValid] = usePermission([arrRoleAccess]) as boolean[]

    if (!userInfo){

      return <LoadingComponent componentMode={mode}/>
    }

    if (!isValid){

        return <NoPermissionComponent componentMode={mode}/>
    }

    return (
        <Box>
            {children}
        </Box>
    )
}