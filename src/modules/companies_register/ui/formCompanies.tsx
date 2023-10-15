import { useFormik } from 'formik'
import { ICompany } from '../type'
import * as Yup from 'yup'
import { BaseForm } from '../../../components/form/form'
import { Button } from 'rebass'
import { Input } from '@rebass/forms'
import InputHOC from '../../../components/inputHOC/inputHOC'
import { getFormErrorMessage } from '../../../helpers/getFormErrorMessage'
export interface IFormCompanies {
  name: string
  phoneNumber: string
  email: string
  address: string
  description?: string
}
interface IProps {
  currentCompany: ICompany | null
  handleSubmit: (value: IFormCompanies) => void
}

const phoneRegExp = /^[+](1|7|49|64|81|82|84|86|850)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
const nameRegExp = /^\D[a-z A-Z0-9]\S+.*$/
const addressRegExp = /^[a-z A-Z0-9]\S+.*\D$/
export const FormCompany: React.FC<IProps> = ({ currentCompany, handleSubmit }) => {
  const initialValues: IFormCompanies = {
    name: currentCompany?.name || '',
    phoneNumber: currentCompany?.phoneNumber || '',
    email: currentCompany?.email || '',
    address: currentCompany?.address || '',
    description: currentCompany?.description || '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Field required!').matches(nameRegExp, 'Name is no valid!'),
    phoneNumber: Yup.string()
      .required('Field required!')
      .matches(phoneRegExp, 'Phone number is no valid!'),
    email: Yup.string().required('Field required!').email('Email is not valid!'),
    address: Yup.string().required('Field required!').matches(addressRegExp, 'Address is no valid!'),
    description: Yup.string(),
  })
  const formik = useFormik({
    initialValues,
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
           required
            name='name'
            placeholder='Enter Name'
            type='text'
            value={formik?.values?.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant='input_form'
          />
        </InputHOC>

        <InputHOC
          name='phoneNumber'
          id='phoneNumber'
          errorMessage={getFormErrorMessage({
            error: formik?.errors?.phoneNumber,
            touched: formik?.touched?.phoneNumber,
          })}
          errorVariant='text__form_valid_errors'
          labelVariant='label__form_input'
          label='Phone Number'
        >
          <Input
            required
            name='phoneNumber'
            placeholder='Enter Phone +84'
            type='text'
            value={formik?.values?.phoneNumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant='input_form'
          />
        </InputHOC>

        <InputHOC
          name='email'
          id='email'
          errorMessage={getFormErrorMessage({
            error: formik?.errors?.email,
            touched: formik?.touched?.email,
          })}
          errorVariant='text__form_valid_errors'
          labelVariant='label__form_input'
          label='Email'
        >
          <Input
            name='email'
            placeholder='Enter Email'
            type='text'
            value={formik?.values?.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant='input_form'
          />
        </InputHOC>

        <InputHOC
          name='address'
          id='address'
          errorMessage={getFormErrorMessage({
            error: formik?.errors?.address,
            touched: formik?.touched?.address,
          })}
          errorVariant='text__form_valid_errors'
          labelVariant='label__form_input'
          label='Address'
        >
          <Input
           required
            name='address'
            placeholder='Enter Address'
            type='text'
            value={formik?.values?.address}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant='input_form'
          />
        </InputHOC>
        <InputHOC
          name='description'
          id='description'
          errorMessage={getFormErrorMessage({
            error: formik?.errors?.description,
            touched: formik?.touched?.description,
          })}
          errorVariant='text__form_valid_errors'
          labelVariant='label__form_input'
          label='Description'
        >
          <Input
            name='description'
            placeholder='Enter Description'
            type='text'
            value={formik?.values?.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant='input_form'
          />
        </InputHOC>

        {currentCompany ? (
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
