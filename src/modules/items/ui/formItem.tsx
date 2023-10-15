import useCategoriesContext from '../../categories/logic/provider'
import { ICategoryContext } from '../../categories/types'
import useCompaniesContext from '../../companies_register/logic/provider'
import { ICompanyContext } from '../../companies_register/type'
import useProjectsContext from '../../projects/logic/provider'
import { IProject, IProjectsContextProps } from '../../projects/types'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button } from 'rebass'
import { BaseForm } from '../../../components/form/form'
import { Input } from '@rebass/forms'
import { IItem } from '../types'
import { IAuthUser, IUserInfo } from '../../auth/types'
import useAuthContext from '../../auth/logic/provider'
import InputHOC from '../../../components/inputHOC/inputHOC'
import {SelectHOC} from '../../../components/selectHOC/selectHOC'
import { getFormErrorMessage } from '../../../helpers/getFormErrorMessage'
import { useEffect, useMemo } from 'react'

export interface IFormItem {
  companyID: string
  projectID: IProject | string
  categoryID: string
  name: string
  createdBy: IUserInfo
}

export interface IProps {
  currentItem: IItem | null
  handleSubmit: (value: IFormItem, project: IProject) => void
}

export const FormItem: React.FC<IProps> = ({ currentItem, handleSubmit }) => {
  const { categories }: ICategoryContext = useCategoriesContext()
  const { companies }: ICompanyContext = useCompaniesContext()
  const {
    projects,
    setCurrentProject,
    getProjectsInCategories,
    projectInCategory,
  }: IProjectsContextProps = useProjectsContext()
  const { userInfo }: IAuthUser = useAuthContext()
  const dataProjectID = useMemo(
    () => currentItem?.projectID || Object.keys(projectInCategory)?.[0],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
    )

  const validationSchema = Yup.object().shape({
    companyID: Yup.string().required('Field required!'),
    projectID: Yup.string().required('Field required!'),
    categoryID: Yup.string().required('Field required!'),
    name: Yup.string().required('Field required!'),
  })

  const formik = useFormik({
    initialValues: {
      createdBy: currentItem?.createdBy || userInfo,
      companyID: currentItem?.companyID || Object.keys(companies)?.[0] || '',
      projectID: dataProjectID,
      categoryID: currentItem?.categoryID || Object.keys(categories)?.[0],
      name: currentItem?.name || '',
    },
    validationSchema,
    onSubmit: (values) => {
      const project = projects[(formik?.values?.projectID as string) || (values?.projectID as string)]
      handleSubmit(values, project)
      setCurrentProject(null)
    },
  })

  useEffect(() => {
    getProjectsInCategories({
      categoryID: currentItem?.categoryID || Object.keys(categories)?.[0],
      companyID: currentItem?.companyID || Object.keys(companies)?.[0] || '',
    })
      .then((data) => {
        if (currentItem?.categoryID) {
          return
        }

        formik.setFieldValue('projectID', Object.keys(data)?.[0])
      })
      .catch((e) => {
        throw e
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeCategory = (categoryID: string) => {
    if (!formik?.values?.categoryID) {
      return
    }
    getProjectsInCategories({ categoryID, companyID: Object.keys(companies)?.[0] })
      .then((data) => {
        formik.setFieldValue('projectID', Object.keys(data)?.[0])
      })
      .catch((e) => {
        throw e
      })
  }

  return (
    <BaseForm
      key='form-use-formik'
      handleSubmit={formik.handleSubmit}
      handleReset={formik.handleReset}
      variant='form_item'
    >
      <>
        <InputHOC
          name='name'
          id='name'
          errorMessage={getFormErrorMessage({
            error: formik?.errors?.name,
            touched: formik?.touched?.name,
          })}
          errorVariant='text__form_valid_errors'
          labelVariant='label__form_input'
          label='Name'
        >
          <Input
            name='name'
            placeholder='Enter name'
            type='text'
            value={formik?.values?.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant='input_form'
          />
        </InputHOC>

        <SelectHOC
          required
          name='categoryID'
          value={formik?.values?.categoryID}
          onBlur={formik.handleBlur}
          onChange={(event) => {
            formik.handleChange(event)
            onChangeCategory(event.target.value)
          }}
          variant=''
          labelVariant='select_label'
          contentVariant='input_form'
          label='Category'
          mb={0}
        >
          {Object.values(categories).map((item, idx) => {
            return (
              <option key={idx} value={item.categoryID}>
                {item.name}
              </option>
            )
          })}
        </SelectHOC>

        <SelectHOC
          required
          name='projectID'
          value={formik?.values?.projectID as string}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          variant=''
          labelVariant='select_label'
          contentVariant='input_form'
          label='Project'
          placeholder='Please select project'
          mb={0}
        >
          {Object.values(projectInCategory).map((item: IProject, idx) => {
            return (
              <option key={idx} value={item.projectID}>
                {item.name}
              </option>
            )
          })}
        </SelectHOC>

        {currentItem ? (
          <Button
            key='form-btn-submit'
            type='submit'
            my={2}
            ml='10px'
            width={80}
            variant='button__form_submit'
          >
            Submit
          </Button>
        ) : (
          <>
            <Button
              key='form-btn-cancel'
              type='reset'
              my={2}
              mr='10px'
              ml='10px'
              width={80}
              variant='button__form_cancel'
            >
              Cancel
            </Button>
            <Button
              key='form-btn-submit'
              type='submit'
              my={2}
              width={80}
              variant='button__form_submit'
            >
              Submit
            </Button>
          </>
        )}
      </>
    </BaseForm>
  )
}
