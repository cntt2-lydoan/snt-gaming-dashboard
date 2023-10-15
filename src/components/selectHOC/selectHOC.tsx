import { Label, Select } from '@rebass/forms'
import { AllHTMLAttributes, ChangeEventHandler} from 'react'
import { Box, Text } from 'rebass'

interface ISelectFieldProps extends Omit<AllHTMLAttributes<HTMLSelectElement>, 'hidden'> {
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  name: string
  label: string
  isLabelHidden?: boolean
  helperText?: string
  errorMessage?: string
  mb?: number;
  hidden?: boolean
  variant?: string
  labelVariant?: string
  errorVariant?: string
  contentVariant?: string
}

export const SelectHOC: React.FC<ISelectFieldProps> = ({
  name,
  label,
  value,
  hidden,
  helperText,
  errorMessage,
  disabled,
  children,
  onChange,
  onBlur,
  placeholder,
  mb = 8,
  required,
  variant,
  errorVariant,
  labelVariant,
  contentVariant,
}) => {
  return (
    <Box id={name} variant={variant} hidden={hidden}>
      <Label htmlFor={name} variant={labelVariant}>{label}</Label>
      <Select
        disabled={disabled}
        fontSize='sm'
        mb={mb}
        mt={1}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        variant={contentVariant}
      >
        {children}
      </Select>
      {helperText && <Text>{helperText}</Text>}
      <Text fontSize='xs' mt={1} variant={errorVariant}>{errorMessage}</Text>
    </Box>
  )
}
