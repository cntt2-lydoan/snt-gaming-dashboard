import { IUserInfo } from '../../auth/types';
import { IProject } from '../../projects/types';
import { IFormItem } from '../ui/formItem';

export interface IItemsContextProps {
    items: {[key: string] : IItem}
    setItems: (items: {[key: string]: IItem}) => void
    currentItems: IItem | null
    setCurrentItems: (currentItem: IItem | null) => void
    getItems: () => void
    createItems: (data: IFormItem, project: IProject) => void
    deleteItems: (data: IItem) => void
    updateItems: (itemID?: string, value?: IFormItem) => void
    loadingByItemID: boolean,
    setLoadingByItemID: (loadingByItemID: boolean) => void
  }
  export interface ITypeIItem {
    [key: string] : string | number | IProject | IUserInfo
}
  export interface IItem  extends ITypeIItem{
    itemID: string,
    companyID: string,
    projectID: IProject | string,
    categoryID: string,
    name: string,
    description: string,
    thumbnail: string,
    price: number,
    discountPrice: number,
    highestPrice: number,
    lowestPrice: number,
    createdAt: string,
    updatedAt: string,
    createdBy: IUserInfo
  }

  export interface IParamItem {
    limit?: string
    offset?: string
    categoryID?: string
  }
  export interface IResponseType<T> {
    data: {[key: string]: IItem}
    status?: boolean
    statusMessage?: string
  }