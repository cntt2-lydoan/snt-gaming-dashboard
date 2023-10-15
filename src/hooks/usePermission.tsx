import { useMemo } from 'react'
import useAuthContext from '../modules/auth/logic/provider'
import { IAuthUser } from '../modules/auth/types'

export const usePermission = ([...arrPermission]) => {
    const { userInfo }: IAuthUser = useAuthContext()
    const isValid = useMemo(() => {
        const currentRole = userInfo?.access?.companyRoles as string[]
        const isAdmin = userInfo?.access?.isAdmin

        if (!arrPermission?.length){

            return
        }

        const result: boolean[] = arrPermission?.map((val) => {
            if (isAdmin){
                return true
            }

            return currentRole?.some(role => val?.includes(role))
        })

        return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    return isValid
}