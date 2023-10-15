import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMemo } from 'react'
import { IPermissionsInviteMember } from '../type'
import { IProject } from '../../projects/types'
import { ICompany } from '../../companies_register/type'
import { BaseForm } from '../../../components/form/form'
import InputHOC from '../../../components/inputHOC/inputHOC'
import { Box, Button } from 'rebass'
import { SelectHOC } from '../../../components/selectHOC/selectHOC'
import { Input } from '@rebass/forms'
import { getFormErrorMessage } from '../../../helpers/getFormErrorMessage'
import { Roles } from '../../../components/constants/roles'
import { usePermission } from '../../../hooks/usePermission'
import { invitePermission } from '../../../constants/checkPermission'
import { Loading } from '../../../components/loading/loading'
import { RoleNameMember } from '../../../constants/rolesName'
export interface IFormInviteMember {
  companyID?:  string
  projectID?: string
  roleName?:  string
  createAt?: string
  email?: string
  displayName?: string
  userID?: string
}
interface IProp {
  handleSubmit: (values: IFormInviteMember) => void
  companyID: string
  curIDPerUpdate: string | null
  projects: {[key: string] : IProject},
  companies: {[key: string] : ICompany},
  permissionUpdate: IPermissionsInviteMember
}

const initialValues = (permissionUpdate: IPermissionsInviteMember, companyID: string, listProjectsInCompany: IProject[]) => {
    return {
        companyID: permissionUpdate?.companyID || companyID || '',
        projectID: permissionUpdate?.projectID || listProjectsInCompany[0].projectID || '',
        email: '',
        roleName: permissionUpdate?.roleName || RoleNameMember?.[0]?.roleName || ''
    }
}

export const FormInviteMember: React.FC<IProp> = ({
    handleSubmit,
    companyID,
    curIDPerUpdate,
    projects,
    companies,
    permissionUpdate
}) => {

    const listProjectsInCompany = useMemo(() =>
        Object.values(projects).filter((val) => val?.companyID === companyID)
    , [companyID, projects])

    const validationSchema = (() => {
        if (!curIDPerUpdate){
          return Yup.object().shape({
          companyID: Yup.string().required('Field required!'),
          email: Yup.string().required('Field required!').email('Email is not valid!'),
          roleName: Yup.string().required('Field required!')
          })
        }

        return Yup.object().shape({
          roleName: Yup.string().required('Field required!')
        })
    })

    const formik = useFormik({
        initialValues: initialValues(permissionUpdate, companyID, listProjectsInCompany),

        validationSchema,

        onSubmit: (values) => {
            handleSubmit(values)
        },
        enableReinitialize: true
    })

    const [canChangeRoleCompanyManager] = usePermission([invitePermission.companyManager]) as boolean[]

    const arrRoles = useMemo(() => {

        if (canChangeRoleCompanyManager){
            return RoleNameMember
        }
        const roleNameMember = RoleNameMember.filter((val) => val?.roleName !== Roles.COMPANY_MANAGER)

        return roleNameMember
    }, [canChangeRoleCompanyManager])

    if (permissionUpdate?.loadingUpdate){

        return <Box variant='box_loading_form'><Loading/></Box>
    }

    return (
        <BaseForm
        key='form-use-formik'
        handleSubmit={formik.handleSubmit}
        handleReset={formik.handleReset}
        variant='box_form_project'>
        <>
            <InputHOC
            name='company'
            id='company'
            errorMessage={getFormErrorMessage({
                error: formik?.errors?.companyID as string,
                touched: formik?.touched?.companyID as boolean,
            })}
            errorVariant='text__form_valid_errors'
            labelVariant='label__form_input'
            label='Company'
            >
                <Box key={companyID} sx={{marginLeft: '10px', marginTop: '10px', color: '#0B4082'}}>
                    {companies[companyID]?.name}
                </Box>
            </InputHOC>

            {!permissionUpdate &&
            <InputHOC
            name='email'
            id='email'
            errorMessage={getFormErrorMessage({
                error: formik?.errors?.email as string,
                touched: formik?.touched?.email as boolean
            })}
            errorVariant='text__form_valid_errors'
            labelVariant='label__form_input'
            label='Email'>
                <Input
                name='email'
                placeholder='Enter email'
                type='text'
                value={formik?.values?.email || ''}
                onChange={formik?.handleChange}
                variant='input_form'
                />
            </InputHOC>}

            <SelectHOC
            key={formik?.values?.roleName}
            required
            name='roleName'
            value={formik?.values?.roleName || ''}
            onChange={formik?.handleChange}
            variant=''
            labelVariant='select_label'
            contentVariant='input_form'
            label='Role Name'
            mb={0}
            >
                {Object.values(arrRoles).map((item, idx) => {

                    return (
                        <option key={idx} value={item.roleName}>
                            {item.roleName}
                        </option>
                    )
                })}
            </SelectHOC>

            {([Roles.PROJECT_MANAGER, Roles.PROJECT_STAFF].includes(formik?.values?.roleName as Roles)) &&
                <SelectHOC
                    name='projectID'
                    value={formik?.values?.projectID as string}
                    onChange={formik.handleChange}
                    variant=''
                    labelVariant='select_label'
                    contentVariant='input_form'
                    label='Project'
                    placeholder='Please select project'
                    mb={0}
                >
                    {Object.values(listProjectsInCompany).map((item, idx) => {
                        return (
                            <option key={idx} value={item.projectID}>
                                {item.name}
                            </option>
                        )
                    })}
                </SelectHOC>}

            <>
                <Button
                key='form-btn-cancel'
                type='reset'
                my={2}
                mr='10px'
                ml='10px'
                width={80}
                variant='button__form_cancel'>
                    Reset
                </Button>
                <Button key='form-btn-submit' type='submit' my={2} width={80} variant='button__form_submit'>
                    Submit
                </Button>
            </>
        </>
        </BaseForm>
    )
}