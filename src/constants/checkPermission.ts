export const deletePermission = {
    companyManager : ['ADMIN'],
    projectManager : ['ADMIN', 'COMPANY_MANAGER'],
    projectStaff : ['ADMIN', 'COMPANY_MANAGER'],
    companyStaff : ['ADMIN', 'COMPANY_MANAGER']
}

export const updatePermission = {
    companyManager : ['ADMIN'],
    projectManager : ['ADMIN', 'COMPANY_MANAGER'],
    projectStaff : ['ADMIN', 'COMPANY_MANAGER'],
    companyStaff : ['ADMIN', 'COMPANY_MANAGER']
}

export const invitePermission = {
    companyManager : ['ADMIN'],
    projectManager : ['ADMIN', 'COMPANY_MANAGER'],
    projectStaff : ['ADMIN', 'COMPANY_MANAGER'],
    companyStaff : ['ADMIN', 'COMPANY_MANAGER']
}

export const viewMemberPage = {
    viewAction : ['ADMIN', 'COMPANY_MANAGER'],
    viewBtnCreate : ['ADMIN', 'COMPANY_MANAGER'],
    viewListCompany : ['ADMIN'],
    viewPage: ['ADMIN', 'COMPANY_MANAGER', 'COMPANY_STAFF', 'PROJECT_MANAGER', 'PROJECT_STAFF']
}

export const viewUserPage = {
    viewListUser: ['ADMIN']
}
