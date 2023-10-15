import { FormEventHandler } from 'react';
import { Box } from 'rebass';

export interface IFormProps{
  variant?: string
  handleSubmit: FormEventHandler<HTMLFormElement>
  handleReset: FormEventHandler<HTMLFormElement>
  children: JSX.Element
}

export function BaseForm(
  {
    handleSubmit,
    handleReset,
    variant,
    children,
  }: IFormProps) {

  return (
    <form key='base-form' onSubmit={handleSubmit} onReset={handleReset}>
        <Box variant={variant}>
          {children}
        </Box>
    </form>
  )
}
