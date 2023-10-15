import { createContext, useCallback, useContext, useState } from 'react'
import { hooks } from '@snt/react-cores'
import { IResponseDataType } from '../../../types'
import { ICompany, ICompanyContext, IParamCompany, IRegisterCompany } from '../type'
import { createCompany, deleteCompany, getCompanies, updateCompany } from './api'

export const companiesContext = createContext<ICompanyContext>(null!)
export const CompaniesProvider: React.FC = ({ children }) => {
  const [companies, setCompanies] = useState<{ [key: string]: ICompany }>({})
  const [currentCompany, setCurrentCompany] = useState<ICompany | null>(null)
  const [loadingByCompany, setLoadingByCompany] = useState(false)
  const { enqueueSnackbar }: hooks.WithSnackbarProps = hooks.useNoti()

  const getCompaniesAction = useCallback((query: IParamCompany) => {
    setLoadingByCompany(true)
   void getCompanies(query)
      .then((response: IResponseDataType<ICompany>) => {
        setCompanies(response?.list)
      })
      .catch((error) => {
        enqueueSnackbar('Get companies fail', { variant: 'error' })
        throw error
      })
      .finally(() => {
        setLoadingByCompany(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createCompanyAction = useCallback(
    (data: IRegisterCompany) => {
      void createCompany(data)
        .then((response) => {
          if (response?.status !== 200 || !response?.data?.length) {
            setCompanies({
              [response?.data?.companyID]: response?.data,
              ...companies,
            })
            enqueueSnackbar('Create company success!', { variant: 'success' })

            return
          }
        })
        .catch((error) => {
          enqueueSnackbar('Create company fail', { variant: 'error' })
          throw error
        })
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    [companies]
  )

  const deleteCompanyAction = useCallback(
    (data: ICompany) => {
      deleteCompany(data)
        .then((response) => {
          if (!data) {
            enqueueSnackbar('Company not Found!', { variant: 'error' })

            return
          }
          const tempCompany = delete companies[(data?.companyID as string) || '']
          if (response && tempCompany) {
            setCompanies(companies)
            setCurrentCompany(null)
            enqueueSnackbar('Deleted success!', { variant: 'success' })

            return
          }
          enqueueSnackbar('Fail deleted company', { variant: 'error' })
        })
        .catch((error) => {
          enqueueSnackbar('Fail deleted company', { variant: 'error' })
          throw error
        })
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    [companies]
  )
  const updateCompanyAction = useCallback((companyID: string, value: IRegisterCompany) => {
    updateCompany(companyID, value).then((response) => {
      if (!response) {
        enqueueSnackbar('Updated company fail!', { variant: 'error' })

        return
      }
      const tempCompany: ICompany = {
        ...companies[companyID],
        ...value
      }

      if (response){
        setCompanies({
          ...companies,
          [companyID]: tempCompany,
        })
        enqueueSnackbar('Update company success!', { variant: 'success' })

        return
      }
    })
    .catch((error) => {
      enqueueSnackbar('Fail Update Company', { variant: 'error' })
      throw error
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies])

  return (
    <companiesContext.Provider
      value={{
        companies,
        setCompanies,
        getCompaniesAction,
        createCompanyAction,
        deleteCompanyAction,
        currentCompany,
        setCurrentCompany,
        updateCompanyAction,
        loadingByCompany,
        setLoadingByCompany
      }}
    >
      {children}
    </companiesContext.Provider>
  )
}
export default function useCompaniesContext() {
  const context = useContext(companiesContext)
  if (!context) {
    throw new Error('useCategoriesContext must be used within a CategoriesProvider')
  }

  return context
}
