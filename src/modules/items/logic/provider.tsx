import React, { createContext, useCallback, useContext, useState } from 'react'
import { hooks } from '@snt/react-cores'
import { IResponseDataType } from '../../../types'
import { IItem, IItemsContextProps } from '../types'
import { IFormItem } from '../ui/formItem'
import { createItemsFromApi, deleteItemsFromApi, getItemsFromApi, updateItemsFromApi } from './api'

export const ItemsContext = createContext<IItemsContextProps>(null!)

export const ItemsProvider: React.FC = ({ children }) => {
  const { enqueueSnackbar }: hooks.WithSnackbarProps = hooks.useNoti()
  const [items, setItems] = useState<{ [key: string]: IItem }>({})
  const [currentItems, setCurrentItems] = useState<IItem | null>(null)
  const [loadingByItemID, setLoadingByItemID] = useState(false)

  const getItems = useCallback(() => {
    setLoadingByItemID(true)
    void getItemsFromApi()
      .then((response: IResponseDataType<IItem>) => {
        setItems(response.list)
      })
      .catch((error) => {
        enqueueSnackbar('Get item fail!', { variant: 'error' })
        throw error
      })
      .finally(() => {
        setLoadingByItemID(false)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createItems = useCallback(
    (data: IFormItem) => {
      setLoadingByItemID(true);
      void createItemsFromApi({...data})
        .then((response) => {
          if (response?.data) {
            setItems({
              [response?.data.itemID]: { ...response?.data, createdBy: data.createdBy},
              ...items,
            }
            )

            enqueueSnackbar('Create item success!', { variant: 'success' })

            return
          }
        })
        .catch((error) => {
          enqueueSnackbar('Fail create item', { variant: 'error' })
          throw error
        })
        .finally(() => {
          setLoadingByItemID(false)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  )

  const deleteItems = useCallback(
    (data: IItem | null) => {
      if (!data) {
        enqueueSnackbar('Item notFound!', { variant: 'error' })

        return
      }
      setLoadingByItemID(true)
      void deleteItemsFromApi(data)
        .then((response) => {
          const tempItems = delete items[data?.itemID || '']

          if (response && tempItems) {
            setItems(items)
            setCurrentItems(null)
            enqueueSnackbar('Deleted item success!', { variant: 'success' })

            return
          }

          enqueueSnackbar('Fail deleted item', { variant: 'error' })
        })
        .catch((error) => {
          enqueueSnackbar('Fail deleted item', { variant: 'error' })
          throw error
        })
        .finally(() => {
          setLoadingByItemID(false)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  )

  const updateItems = useCallback(
    (itemID?: string, value?: IFormItem) => {
      setLoadingByItemID(true)
      if (!itemID) {
        enqueueSnackbar('Item not found', { variant: 'error' })

        return
      }
      void updateItemsFromApi(itemID, value)
        .then((response) => {
          if (!response) {
            enqueueSnackbar('Updated items fail!', { variant: 'error' })

            return
          }

          const tempItem: IItem = {
            ...items[itemID],
            name: value?.name || '',
            categoryID: value?.categoryID || '',
            projectID: (value?.projectID as string) || '',
            companyID: value?.companyID || '',
          }
          if (response?.data) {
            setItems({
              ...items,
              [itemID]: tempItem,
            })
            enqueueSnackbar('Update items success!', { variant: 'success' })

            return
          }
        })
        .catch((error) => {
          enqueueSnackbar('Fail Update item', { variant: 'error' })
          throw error
        })
        .finally(() => {
          setLoadingByItemID(false)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  )

  return (
    <ItemsContext.Provider
      value={{
        items,
        setItems,
        currentItems,
        setCurrentItems,
        getItems,
        createItems,
        deleteItems,
        updateItems,
        loadingByItemID,
        setLoadingByItemID,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}

export default function useItemsContext() {
  const context = useContext(ItemsContext)
  if (!context) {
    throw new Error('useItemsContext must be used within a ItemsProvider')
  }

  return context
}