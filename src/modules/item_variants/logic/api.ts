import { ultis } from '@snt/react-cores'
import { convertArrayObjectToObject } from '../../../helpers/convert_array_to_object'
import { ITypeIItem } from '../../items/types'
import { ITypeUser } from '../../users/types'
import { IItemVariant, ItemVariantCurrency } from '../types'

export const getItemVariantsFromApi = async () => {
    try {
        const res = await ultis.api({
            path: 'itemVariants',
            method: 'GET',
            errorHandler: (error) => {throw(error)},
        })
        const formatData = convertArrayObjectToObject<string | string[] | number | ItemVariantCurrency | ITypeUser | ITypeIItem,
        IItemVariant>(res?.data?.list, 'itemVariantID')

        return {
            list: formatData
        }
    }catch (error) {
        throw error;
    }
}
