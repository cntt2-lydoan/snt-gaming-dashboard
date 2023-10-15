import { ultis } from '@snt/react-cores'
import { convertArrayObjectToObject } from '../../../helpers/convert_array_to_object'
import { IParamProject, IProject, ProjectStatus } from '../types'
import { IFormProject } from '../ui/formProject'

export const getProjectsFromApi = async ({
  address,
  categoryID,
  companyID,
  name,
  projectID,
  status,
}: IParamProject) => {
  try {
    const res = await ultis.api({
      path: 'projects',
      method: 'GET',
      params: {
        sortBy: 'createdAt',
        sortDirection: 'DESC',
        address,
        categoryID,
        companyID,
        name,
        projectID,
        status,
      },
      errorHandler: (error) => {
        throw error
      },
    })
    const formatData = convertArrayObjectToObject<string | string[] | ProjectStatus, IProject>(
      res?.data?.list,
      'projectID'
    )

    return {
      list: formatData,
    }
  } catch (error) {
    throw error
  }
}
export const createdProjectFromApi = async (data: IFormProject) => {
  try {
    const res = await ultis.api({
        data,
        path: 'projects',
        method: 'POST',
        errorHandler: (error) => {throw(error)}
    })

    return {
      res
  }
} catch (error) {
  throw error;
  }
}

export const deleteProjectFromApi = async (data: IProject) => {
  try {
    const res = await ultis.api({
      path: `projects/${data?.projectID}`,
      method: 'DELETE',
      data: {},
      errorHandler: (error) => {throw(error)},
    })
    const formatData = convertArrayObjectToObject<string | string[] | ProjectStatus, IProject>(res?.data?.list, 'projectID')

    return {
      list: formatData
    }
  } catch (error) {
    throw error
  }
}

export const updateProjectFromApi = async (projectID?: string, value?: IProject) => {
  try {
    const res = await ultis.api({
      path: `projects/${projectID}`,
      method: 'PUT',
      data: value,
      errorHandler: (error) => {throw(error)},
    })

    return  res
  } catch (error) {
    throw error
  }
}
