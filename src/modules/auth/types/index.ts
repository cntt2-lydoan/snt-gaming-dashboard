export interface IAuthUser {
  userInfo: IUserInfo
  setUserInfo: (userInfo: IUserInfo) => void
  loading: boolean
  setLoading: (isLoading: boolean) => void
}
export interface IPermissions {
  createdBy?: string
  companyID?: string
  projectID?: string
  roleName: string
  status: string
  userID?: string
  _id?: string
}
export interface IUserResult {
  avatar?: string
  country?: string
  displayName?: string
  email?: string
  gender?: string
  phoneNumber?: number
  status?: string
  userID?: string
  permissions?: IPermissions[]
}
export interface IUserInfo {
  avatar?: string
  country?: string
  displayName?: string
  email?: string
  gender?: string
  phoneNumber?: number
  status?: string
  userID?: string
  permissions?: IPermissions[]
  access?: {[key: string]: string[] | boolean}
}
