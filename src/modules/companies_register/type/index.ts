export interface IRegisterCompany{
    companyID?: string
    name: string
    description?: string
    phoneNumber: string
    email: string
    address: string
}
export interface ITypeCompany {
    [key: string]: string | number
}
export interface ICompany extends ITypeCompany {
        companyID: string,
        name: string,
        description: string,
        phoneNumber: string,
        email: string,
        address: string,
        lat: number,
        lng: number,
        banner: string,
        logo: string,
        intro: string,
        status: string,
        createBy: string,
        createdAt: string,
        update: string
    }
export interface IParamCompany {
    companyID?: string,
    name?: string,
    createdBy?: string,
    email?: string
}
export interface ICompanyContext {
    companies: {[key: string]: ICompany},
    setCompanies: (companies: {[key: string]: ICompany}) => void
    getCompaniesAction: (query: IParamCompany) => void
    createCompanyAction: (data: IRegisterCompany) => void
    deleteCompanyAction: (data: ICompany) => void
    currentCompany:  ICompany | null
    setCurrentCompany: (currentCompany: ICompany | null) => void
    updateCompanyAction: (companyID: string, value: IRegisterCompany) => void
    loadingByCompany: boolean
    setLoadingByCompany: (loadingByCompany: boolean) => void
}