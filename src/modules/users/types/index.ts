export interface ITypeUser {
    [key: string] : string | ITypePermissions[] | boolean
}
export interface ITypePermissions {
    [key: string]: string | {[key: string]: string}
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DEACTIVATED = 'DEACTIVATED'
}

export enum PermissionStatus {
    ACCEPTED = 'ACCEPTED',
    DEACTIVATED = 'DEACTIVATED'
}

export interface IUser extends ITypeUser {
    userID: string
    country: string
    displayName: string
    firstName: string
    lastName: string
    status: string
    gender: string
    dateOfBirth: string
    createdAt: string
    updatedAt: string
    email: string
    accountName: string
    phoneNumber: string
    addressLine1: string
    theme: string
    summary: string
    emotion: string
    permissions: ITypePermissions[]
    actionDisable: boolean
}

export interface IUserContext {
    users: {[key: string] : IUser}
    setUsers: (users: {[key: string]: IUser}) => void
    getUsers: () => void
    updateUserStatus: (userID?: string, value?: string) => void
    loadingByUserID: boolean,
    setLoadingByUserID: (loadingByUserID: boolean) => void
}
