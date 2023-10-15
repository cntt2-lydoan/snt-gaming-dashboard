import { createContext, useCallback, useContext, useState } from 'react'
import { getCategoriesFromApi } from './api'
import { ICategory, ICategoryContext } from '../types'
import { hooks } from '@snt/react-cores'

export const categoriesContext = createContext<ICategoryContext>(null!)
export const CategoriesProvider: React.FC = ({ children }) => {
  const [categories, setCategories] = useState({})
  const [currentCategories, setCurrentCategories] = useState<ICategory>(null!)
  const [loadingCategories, setLoadingCategories] = useState(false)
  const { enqueueSnackbar }: hooks.WithSnackbarProps = hooks.useNoti()

  const getCategories = useCallback(() => {
    setLoadingCategories(true)
    getCategoriesFromApi().then((response) => {
        setCategories(response.list)
      })
      .finally(() => {
        setLoadingCategories(false)
      })
      .catch((error) => {
        enqueueSnackbar('Get categories fail', { variant: 'error' })
        throw error
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
   [])

  return (
    <categoriesContext.Provider
      value={{
        categories,
        currentCategories,
        setCurrentCategories,
        setCategories,
        getCategories,
        loadingCategories,
        setLoadingCategories,
      }}
    >
      {children}
    </categoriesContext.Provider>
  )
}
export default function useCategoriesContext() {
  const context = useContext(categoriesContext)
  if (!context) {
    throw new Error('useCategoriesContext must be used within a CategoriesProvider')
  }

  return context
}
