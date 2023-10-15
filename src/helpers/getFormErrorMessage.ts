interface IGetFormErrorParams {
    touched?: boolean
    error?: string
  }
  export const getFormErrorMessage = ({touched, error}: IGetFormErrorParams) => {
    if (!touched || !error) {
      return
    }

    return error
  }