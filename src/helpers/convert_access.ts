import { Roles } from '../components/constants/roles';
import { IPermissions, IUserInfo, IUserResult } from '../modules/auth/types';

export const convertAccess = (data: IUserResult) => {
  const access: {[key: string]: string[] | boolean | string} = {
        companyID: '',
        companyRoles: [],
        isAdmin: false,
      }

      if (!data.permissions?.length){
        return

      }

     data.permissions?.forEach((item: IPermissions) => {
       if (item?.roleName === Roles.ADMIN){
            access.isAdmin  = true

             return
       }

       if (!item.companyID){

        return
       }

       access.companyID = item.companyID as string
       (access?.companyRoles as string[]).push(item?.roleName)

       if (!item.projectID) {

         return
        }
        if (access[item?.projectID] === undefined){
          access[item?.projectID] = []
        }

        (access[item.projectID] as string[]).push(item.roleName)
      })

      const convert: IUserInfo = {
        ...data,
        access: {
          ...access,
          companyRoles: [...Array.from(new Set(access?.companyRoles as string[]))],
        },
      }

      return convert
}
