import { ultis } from '@snt/react-cores'
import { convertArrayObjectToObject } from '../../../helpers/convert_array_to_object'
import { IRegisterCompany, ICompany, IParamCompany } from '../type'

export const getCompanies = async (params: IParamCompany) => {
  try {
    const res = await ultis.api({
      path: 'companies',
      method: 'GET',
      params
    })
    const formData = convertArrayObjectToObject<keyof ICompany, ICompany>(res?.data?.list, 'companyID')

    return {
      list: formData,
    }
  } catch (error) {
    throw error
  }
}

export const createCompany = async (data: IRegisterCompany) => {
  try {
    const res = await ultis.api({
      path: 'companies',
      method: 'POST',
      data,
    })

    return {
      status: res?.status,
      statusText: res?.statusText,
      data: res?.data,
    }
  } catch (error) {
    throw error
  }
}
export const deleteCompany = async (data: ICompany) => {
  try {
    if (!data?.companyID) {
      return
    }
    const res = await ultis.api({
      path: `companies/${data?.companyID}`,
      method: 'DELETE',
      data: {},
    })

    return {
      status: res?.status,
      statusText: res?.statusText,
      data: res?.data,
    }
  } catch (error) {
    throw error
  }
}
export const updateCompany = async (companyID: string, value: IRegisterCompany) => {
  try {
    const res = await ultis.api({
      path: `companies/${companyID}`,
      method: 'PUT',
      data: value,
    })

    return res
  } catch (error) {
    throw error
  }
}
