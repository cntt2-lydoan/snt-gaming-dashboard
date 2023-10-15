import React from 'react'
import { IProject, ProjectStatus, ProjectType } from '../types';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import useCategoriesContext from '../../categories/logic/provider';
import { ICategoryContext } from '../../categories/types';
import { Box, Button, Text } from 'rebass';
import { ProjectTag } from './projectTag';
import { ProjectInputForm } from './projectInputForm';
import { BaseForm } from '../../../components/form/form';
import { SelectHOC } from '../../../components/selectHOC/selectHOC';
import useCompaniesContext from '../../companies_register/logic/provider';
import { ICompanyContext } from '../../companies_register/type';

export interface IFormProject{
    companyID: string
    categoryID: string
    name: string
    email: string
    phoneNumber: string
    type: ProjectType,
    status: ProjectStatus,
    description: string,
    tags: string[],
    projectID?: string
  }

  export interface IProps {
    currentEditProject: IProject | IFormProject | null
    handleSubmit: (value: IFormProject) => void
  }

  const phoneRegExp = /^[+](1|7|49|64|81|82|84|86|850)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  const validationSchema = Yup.object().shape({
    companyID: Yup.string().required('Field required!'),
    categoryID: Yup.string().required('Field required!'),
    name: Yup.string().min(2, 'Must be 2 or more characters!').required('Field required!').matches(/[^\s*].*[^\s*]/g, 'This field cannot contain only blankspaces!').matches(/(.*[a-z]){2}/i, 'Must have at least 2 letters this field!'),
    email: Yup.string().required('Field required!').email('Email is not valid!'),
    phoneNumber: Yup.string().required('Field required!').matches(phoneRegExp, 'Phone number is no valid!'),
    type: Yup.string().required('Field required!'),
    description: Yup.string().matches(/(.*[a-z]){2}/i, 'Must have at least 2 letters this field!'),
})

export const FormProject: React.FC<IProps> = ({currentEditProject, handleSubmit}) => {
    const {categories} : ICategoryContext = useCategoriesContext()
    const {companies} : ICompanyContext = useCompaniesContext()

    const formik = useFormik({
        initialValues : currentEditProject as IFormProject,
        validationSchema,
        onSubmit: (values) => {
          handleSubmit(values)
          formik.setValues(formik.initialValues)
        },
    })

    return (
        <BaseForm
          key='form-use-formik'
          handleSubmit={formik.handleSubmit}
          handleReset={formik.handleReset}
          variant='box_form_project'
        >
          <>
              <Box variant='box_distance' sx={{display: 'flex'}}>
                Project Name
                <Text sx={{color: 'red'}}>*</Text>
              </Box>
              <ProjectInputForm
              name='name'
              placeholder='Enter name'
              type='text'
              value={formik?.values?.name || ''}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              variant='input_form'
              touched={formik.touched?.name}
              error={formik.errors as {[key: string] : string}}
              />

              <SelectHOC
                  required
                  label='Category'
                  name='categoryID'
                  value={formik?.values?.categoryID}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  contentVariant='input_form'
                  labelVariant='label__form_input'
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

              <Box variant='box_distance'>Tag</Box>
              <ProjectTag valuesFormik={formik?.values} setFieldValue={formik.setFieldValue}/>

              <Box variant='box_distance'>Description</Box>
              <ProjectInputForm
              name='description'
              placeholder='Enter description'
              type='text'
              value={formik?.values?.description || ''}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              variant='input_form'
              touched={formik.touched?.description}
              error={formik.errors as {[key: string] : string}}/>
              <SelectHOC
                  label='Status'
                  name='status'
                  value={formik?.values?.status}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  contentVariant='input_form'
                  labelVariant='label__form_input'
                  mb={0}
                >
                  {[ProjectStatus.PENDING, ProjectStatus.ACCEPTED].map((item, idx) => {
                    return (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    )
                  })}
              </SelectHOC>
              <Box variant='box_distance' sx={{display: 'flex'}}>
                Email
                <Text sx={{color: 'red'}}>*</Text>
              </Box>
              <ProjectInputForm name='email'
              placeholder='Enter email'
              type='text'
              value={formik?.values?.email || ''}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              variant='input_form'
              touched={formik.touched?.email}
              error={formik.errors as {[key: string] : string}}
              />

              <Box variant='box_distance' sx={{display: 'flex'}}>
                Phone number
                <Text sx={{color: 'red'}}>*</Text>
              </Box>
              <ProjectInputForm
              name='phoneNumber'
              placeholder='+(84)'
              type='text'
              value={formik?.values?.phoneNumber || ''}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              variant='input_form'
              touched={formik.touched?.phoneNumber}
              error={formik.errors as {[key: string] : string}}/>

              {!currentEditProject?.projectID && <>

              <SelectHOC
                  required
                  label='Type'
                  name='type'
                  value={formik?.values?.type}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  contentVariant='input_form'
                  labelVariant='label__form_input'
                  mb={0}
                >
                  {[ProjectType.ART, ProjectType.GAME].map((item, idx) => {
                    return (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    )
                  })}
              </SelectHOC>

              <SelectHOC
                  required
                  label='Company'
                  name='companyID'
                  value={formik?.values?.companyID}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  contentVariant='input_form'
                  labelVariant='label__form_input'
                  mb={0}
                >
                  {Object.values(companies).map((item, idx) => {
                    return (
                      <option key={idx} value={item.companyID}>
                        {item.name}
                      </option>
                    )
                  })}
              </SelectHOC>
              </>}
              {currentEditProject?.projectID ?
                <Button key='form-btn-submit' type='submit' my={2} ml='10px' width={80} variant='button__form_submit'>
                  Submit
                </Button>
                  : (
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
                    <Button key='form-btn-submit' type='submit' my={2} width={80} variant='button__form_submit'>
                      Submit
                    </Button>
                    </>
                  )
              }
          </>
        </BaseForm>
    );
}
