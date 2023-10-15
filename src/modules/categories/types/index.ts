
export interface ITypeCategory {
    [key: string] : string
}
export interface ICategory extends ITypeCategory{
    categoryID: string
    name: string
    description: string
    icon: string
    createAt: string
    updatedAt: string
}
export interface ICategoryContext {
    categories: {[key: string]: ICategory}
    currentCategories: ICategory,
    setCurrentCategories: (currentCategories: ICategory) => void
    setCategories: (categories: ICategory[]) => void
    getCategories: (categoryID: string) => void
    loadingCategories: boolean
    setLoadingCategories: (loadingCategories: boolean) => void
}
