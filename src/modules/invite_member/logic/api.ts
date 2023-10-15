import { ultis } from '@snt/react-cores'
import { convertArrayObjectToObject } from '../../../helpers/convert_array_to_object'
import { IInviteMember, IPermissionsInviteMember } from '../type'
import { IFormInviteMember } from '../ui/formInviteMember'

export const getMemberCompanyFromApi = async (companyID: string, param: {[key: string]: string}) => {
  try {
    const res = await ultis.api({path: `companies/${companyID}/members`, method: 'GET', params: param})

    const formData = convertArrayObjectToObject<string | IPermissionsInviteMember[] | boolean, IInviteMember>(res?.data?.list, 'userID')

    return {
      list: formData,
    }
  } catch (error) {
    throw error
  }
}
export const createMemberFromApi = async (data: IFormInviteMember, companyID: string) => {

  try{
    const res = await ultis.api({
      path: `companies/${companyID}/members/invite`,
      method: 'POST',
      data
    })

    return {
      status: res?.status,
      statusText: res?.statusText,
      data: res?.data,
    }

  }
  catch (error) {
    throw error

  }

}
export const deletePermissionFromApi = async (permissionID: string) => {

  try {
    if (!permissionID) {
      return
    }
      const res = await ultis.api({
        path: `permissions/${permissionID}`,
        method: 'DELETE',
        data: {}
      })

      return {
        status: res?.status,
        statusText: res?.statusText,
        data: res?.data,
      }
  }
  catch (error) {
    throw error
  }

}
export const updatePermissionFromApi = async(permissionID: string, values: IFormInviteMember) => {

  try {
        const res = await ultis.api({
          path: `permissions/${permissionID}`,
          method: 'PUT',
          data: values
        })

        return res
  }
  catch (error) {
    throw error
  }

}
