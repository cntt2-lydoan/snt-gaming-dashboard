import { convertArrayObjectToObject } from '../../../helpers/convert_array_to_object'
import { IItem } from '../types'
import { ultis } from '@snt/react-cores'
import { IFormItem } from '../ui/formItem'
import { IProject } from '../../projects/types'
import { IUserInfo } from '../../auth/types'


export const getItemsFromApi = async () => {
  try {
    const res = await ultis.api({
      path: 'items',
      method: 'GET',
      params: {
        status: 'PENDING',
        sortBy: 'createdAt',
        sortDirection: 'DESC'
      },
    })
    const formatData = convertArrayObjectToObject<string | number | IProject | IUserInfo, IItem>(res?.data?.list, 'itemID')

    return {
      list: formatData,
    }
  } catch (error) {
    throw error
  }
}
export const createItemsFromApi = async (data: IFormItem) => {
  try {
    const res = await ultis.api({
      data,
      path: 'items',
      method: 'POST',
    })

    return res
  } catch (error) {
    throw error
  }
}
export const deleteItemsFromApi = async (data: IItem) => {
  try {
    if (!data?.itemID) {
      return
    }

    const res = await ultis.api({
      path: `items/${data?.itemID}`,
      method: 'DELETE',
      data: {},
    })

    return  res?.data
  } catch (error) {
    throw error
  }
}

export const updateItemsFromApi = async (itemID?: string, value?: IFormItem) => {
  try {
    const res = await ultis.api({
      path: `items/${itemID}`,
      method: 'PUT',
      data: value,
    })

    return res
  } catch (error) {
    throw error
  }
}