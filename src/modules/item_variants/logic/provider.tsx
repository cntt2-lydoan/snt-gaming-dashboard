import { createContext, useCallback, useContext, useState } from 'react'
import { IResponseDataType } from '../../../types'
import { IItemVariant, IItemVariantContext } from '../types'
import { getItemVariantsFromApi } from './api'

export const itemVariantsContext = createContext<IItemVariantContext>(null!)

export const ItemVariantsProvider: React.FC = ({ children }) => {
    const [itemVariants, setItemVariants] = useState<{[key: string]: IItemVariant}>({})
    const [loadingByItemVariantID, setLoadingByItemVariantID] = useState(false)
    const getItemVariants = useCallback(() => {
        setLoadingByItemVariantID(true)
        void getItemVariantsFromApi().then((response: IResponseDataType<IItemVariant>) => {
            setItemVariants(response.list)
        })

        .catch((error) => {
            throw error
        })

        .finally(() => {
            setLoadingByItemVariantID(false)
        })
    }, [])

    return (
        <itemVariantsContext.Provider value={{
            itemVariants,
            setItemVariants,
            getItemVariants,
            loadingByItemVariantID,
            setLoadingByItemVariantID
        }}>
            {children}
        </itemVariantsContext.Provider>
    )
}

export default function useItemVariantsContext() {
    const context = useContext(itemVariantsContext)

    if (!context) {
        throw new Error('useItemVariantsContext must be used within a ItemVariantsProvider')
    }

    return context
}
