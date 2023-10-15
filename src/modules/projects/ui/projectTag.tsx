
import React from 'react';
import { Input, Label } from '@rebass/forms';
import { Box, Button, Text } from 'rebass';
import { FormikErrors, useFormik } from 'formik';
import { IFormProject } from './formProject';
import * as Yup from 'yup'


export interface IProps {
    valuesFormik: IFormProject,
    setFieldValue: (field: string, value: string | string[], shouldValidate?: boolean | undefined) => Promise<void>
                    | Promise<FormikErrors<IFormProject>>

}
export const ProjectTag: React.FC<IProps> = ({valuesFormik, setFieldValue}) => {
    const validationSchema = Yup.object().shape({
      tag: Yup.string()
      .matches(/[^\s*].*[^\s*]/g, 'This field cannot contain only blankspaces!')
      .matches(/(.*[a-z]){2}/i, 'Must have at least 2 letters this field!')
      .test('Exist tag!', 'Exist tag!', (newTag?: string) => {
        const tag = valuesFormik.tags?.find((value) => newTag === value)
        if (tag) {
          return false
        }

        return true
      })
    })

    const formik = useFormik({
      initialValues : {
        tag: ''
      },
      validationSchema,
      onSubmit: () => {
        onSaveTag()
        formik.handleReset({ tag: ''})
      },
    })

    const onSaveTag = () : void => {
      if (formik?.values?.tag){
        setFieldValue('tags', [...valuesFormik.tags || [], formik?.values?.tag])
      }
    }

    const onDeleteTag = (tagDelete : string) : void => {
      const tagDeleted = valuesFormik.tags?.filter((tag) => tagDelete !== tag)
      setFieldValue('tags', tagDeleted || [])
    }

    return (
             <Box >
                {valuesFormik?.tags?.map((tag, index) =>
                  <Box variant='box_label_tag' key={index}>
                      <Label sx={{width: '95%'}}>{tag}</Label>
                      <Text
                      sx={{position: 'absolute', right: '10px', color: 'red', cursor: 'pointer'}}
                      onClick={() => onDeleteTag(tag)}>
                      x</Text>
                  </Box>)}
                    <Box sx={{display: 'flex'}}>
                      <Input sx={{width: '63%'}}
                      name='tag'
                      placeholder='Tag'
                      type='text'
                      value={formik?.values?.tag || ''}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      variant='input_form'
                      />
                      <Button variant='button__form_submit'
                      sx={{marginTop: '10px', marginLeft: '10px'}}
                      name='add'
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        formik?.handleSubmit()}}
                      >+New</Button>
                    </Box>
                  <Text variant='text_validate'>{formik?.errors?.tag}</Text>
            </Box>
    );
}
