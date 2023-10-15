import { IFormInviteMember } from '../ui/formInviteMember';

export interface ITypeInviteMember {
    [key: string]: string | IPermissionsInviteMember[] | boolean
}
export interface IPermissionsInviteMember{
    companyID: string
    permissionID: string
    projectID: string
    roleName: string
    status: string
    createAt: string
    userID?: string
    actionDisable?: boolean
    loadingUpdate?: boolean
}
export interface IInviteMember extends ITypeInviteMember{
    displayName: string
    email: string
    permissions: IPermissionsInviteMember[]
    userID: string,
    isShowInfoPermission: boolean
}
export interface IInviteContextProps {
    inviteMember: {[key: string]: IInviteMember}
    setInviteMember: (inviteMember: {[key: string]: IInviteMember}) => void
    getCompanyMember: (companyID: string, query: {[key: string]: string}) => void
    createMember: (data: IFormInviteMember, companyID: string) => void
    deletePermission: (permissionID: string, userID: string) => void
    updatePermission: (userID: string, permissionID: string, values: IFormInviteMember) => void
    loadingMember: boolean
    setLoadingMember: (loadingMember: boolean) => void
    deletingPermission: IPermissionsInviteMember | null
    setDeletingPermission: (deletingPermission: IPermissionsInviteMember) => void
    curIDPerUpdate: string | null
    setCurIDPerUpdate: (curIDPerUpdate: string) => void
    curIDUserUpdate: string
    setCurIDUserUpdate: (curIDUserUpdate: string) => void
    loadingInviteMember: boolean
    setLoadingInviteMember: (loadingInviteMember: boolean) => void
}