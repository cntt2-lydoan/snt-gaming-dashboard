import { FormikErrors } from 'formik'
import { Box, Text } from 'rebass'
import {  Label } from '@rebass/forms'

export interface IInputFieldProps<Values> {
  id: string
  isRequired?: boolean
  errorMessage?:
  | string
  | string[]
  | FormikErrors<Values>
  | FormikErrors<Values>[]
  label?: string
  name: string
  hidden?: boolean
  helperText?: string
  leading?: JSX.Element | string
  trailing?: JSX.Element
  inputVariant?: string
  labelVariant?: string
  errorVariant?: string
  contentVariant?: string
  children?: JSX.Element
  disabled?: boolean
  readOnly?: boolean
}

function InputHOC<Values>({
  id,
  isRequired,
  hidden,
  name,
  errorMessage,
  label,
  helperText,
  disabled = false,
  leading,
  trailing,
  readOnly = false,
  inputVariant,
  labelVariant,
  errorVariant,
  contentVariant,
  children
}: IInputFieldProps<Values>) {
  return (
    <Box id={id} variant={inputVariant} required={isRequired} hidden={hidden}>
      {label && <Label htmlFor={name} variant={labelVariant}>{label}</Label>}
      <Box variant={contentVariant}>
        {leading && (
          <Box color='gray.300' fontSize='1.2em' sx={{ pointerEvents: 'none' }}>
            {leading}
          </Box>
        )}
        {children}
        {trailing && !disabled && !readOnly && (
          <Box width='20%' mr={1} sx={{ placeContent: 'end' }}>
            {trailing}
          </Box>
        )}
      </Box>
      {helperText && <Text>{helperText}</Text>}
      <Text fontSize='xs' mt={1} variant={errorVariant}>{errorMessage}</Text>
    </Box>
  )
}

export default InputHOC
