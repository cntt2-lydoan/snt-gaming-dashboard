import { ultis } from '@snt/react-cores'
import { convertArrayObjectToObject } from '../../../helpers/convert_array_to_object'
import { ITypePermissions, IUser } from '../types'

export const getUsersFromApi = async () => {
    try {
        const res = await ultis.api({
            path: 'users',
            method: 'GET',
            errorHandler: (error) => {throw(error)},
        })
        const formatData = convertArrayObjectToObject<string | ITypePermissions[] | boolean, IUser>(res?.data?.users, 'userID')

        return {
            list: formatData
        }
    }catch (error) {
        throw error
    }
}
export const updateUserFromApi = async (userID?: string, status?: string) => {
    try {
      const res = await ultis.api({
        path: `users/${userID}/${status}`,
        method: 'PUT',
        data: {},
        errorHandler: (error) => {throw(error)},
      })

      return  res
    } catch (error) {
      throw error
    }
  }
