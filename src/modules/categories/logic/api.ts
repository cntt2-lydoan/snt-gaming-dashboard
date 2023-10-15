import { ultis } from '@snt/react-cores'
import { convertArrayObjectToObject } from '../../../helpers/convert_array_to_object'
import { ICategory } from '../types'

export const getCategoriesFromApi = async () => {
    try {
          const res = await ultis.api({
              path: 'categories',
              method: 'GET',
        })
        const formatData = convertArrayObjectToObject<keyof ICategory, ICategory>(res?.data.list, 'categoryID')

        return {
            list: formatData
        }
    }
    catch (error) {
     throw error
    }

}
