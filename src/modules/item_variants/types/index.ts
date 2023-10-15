import { ITypeIItem } from '../../items/types';
import { ITypeUser } from '../../users/types';

export enum ItemVariantCurrency {
    AUD = 'AUD',
    CENT = 'CENT',
    CHF = 'CHF',
    CNH = 'CNH',
    EUR = 'EUR',
    GBP = 'GBP',
    JPY = 'JPY',
    RUB = 'RUB',
    USD = 'USD',
    VND = 'VND'
}

export interface ITypeItemVariant {
    [key: string] : string | string[] | number | ItemVariantCurrency | ITypeUser | ITypeIItem}

export interface IItemVariant extends ITypeItemVariant{
    itemVariantID: string
    itemID: ITypeIItem
    userID: ITypeUser
    externalItemVariantID: string
    name: string
    description: string
    photo: string[]
    thumbnail: string[]
    price: number
    minimum: number
    discountPrice: number
    currency: ItemVariantCurrency
    likes: number
    purchased: number
    tags: string[]
    status: string
    tradingStatus: string
}

export interface IItemVariantContext{
    itemVariants: {[key: string] : IItemVariant}
    setItemVariants: (itemVariants: {[key: string]: IItemVariant}) => void
    getItemVariants: () => void
    loadingByItemVariantID: boolean,
    setLoadingByItemVariantID: (loadingByItemVariantID: boolean) => void
}
