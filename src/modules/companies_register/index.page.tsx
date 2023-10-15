import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useMemo, useState } from 'react'
import { Box } from 'rebass'
import { Dialog } from '../../components/dialog/dialog'
import { BaseHeaderCreate } from '../../components/hearder_create'
import { BaseDrawer } from '../../components/drawer/drawer'
import { BaseTable } from '../../components/table/table'
import useCompaniesContext from './logic/provider'
import { ICompany, ICompanyContext, IRegisterCompany } from './type'
import { FormCompany } from './ui/formCompanies'
import { BaseModel } from '../../components/modal/modal'
import { IAuthUser } from '../auth/types'
import useAuthContext from '../auth/logic/provider'
import { convertAccess } from '../../helpers/convert_access'
import { hooks } from '@snt/react-cores'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface IProps {
  children?: React.ReactNode
}
export const CompanyRegister: React.FC<IProps> = () => {
  const {
    currentCompany,
    setCurrentCompany,
    companies,
    getCompaniesAction,
    createCompanyAction,
    deleteCompanyAction,
    updateCompanyAction,
  }: ICompanyContext = useCompaniesContext()

  const [isShowCompany, setIsShowCompany] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const { userInfo }: IAuthUser = useAuthContext()
  const [isUpdate, setShowIsUpdate] = useState(false)
  const { enqueueSnackbar }: hooks.WithSnackbarProps = hooks.useNoti()

  useEffect(() => {
    getCompaniesAction({ companyID: userInfo?.permissions?.[0]?.companyID })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.permissions?.[0]?.companyID])

  const filterCompany = useMemo(
    () =>
      Object.values(companies).filter((item) => {
        return item.companyID === userInfo?.permissions?.[0]?.companyID
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
    [companies]
  )

  const convertUser = convertAccess(userInfo)

  const handleAddCompany = (value: IRegisterCompany) => {
    if (convertUser?.access?.isAdmin) {
     createCompanyAction(value)

      return
    }
    enqueueSnackbar('User do not have sufficient permissions', { variant: 'error' })
  }
  const handleEditCompany = (value: IRegisterCompany) => {
    if (!isUpdate || convertUser?.access?.companyRoles || filterCompany) {
      updateCompanyAction(currentCompany?.companyID || '', value)

      return
    }
  }

  const handleSubmit = (value: IRegisterCompany) => {
    if (!currentCompany) {
      setCurrentCompany(null)
      handleAddCompany(value)
      setIsShowCompany(false)

      return
    }
    if (currentCompany) {
      handleEditCompany(value)
      setCurrentCompany(null)
      setIsShowCompany(false)

      return
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 300,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'email',
      width: 300,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 300,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'Actions',
      render: (item: ICompany, row: ICompany, idx: number) => {
        return (
          <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'center' }}>
            <FontAwesomeIcon
              fontSize='20px'
              style={{ marginRight: '10px' }}
              color='rgb(33, 131, 255)'
              icon={faEdit as IconProp}
              onClick={() => {
                setCurrentCompany(item)
                setShowIsUpdate(true)
                setIsShowCompany(true)
              }}
            />
            <FontAwesomeIcon
              style={{ cursor: 'pointer' }}
              fontSize='20px'
              color='#808080'
              icon={faTrashAlt as IconProp}
              onClick={() => {
                setIsShowModal(!isShowModal)
                setCurrentCompany(item)
              }}
            />
          </Box>
        )
      },
    },
  ]
  const data = Object.values(companies).map((item, index) => {
    return {
      ...item,
      name: item.name,
      phoneNumber: item.phoneNumber,
      email: item.email,
      address: item.address,
      description: item.description,
      key: index,
    }
  })

  return (
    <>
      <BaseHeaderCreate
        variant='header'
        onClick={() => {
          setIsShowCompany(!isShowCompany)
          setCurrentCompany(null)
        }}
      />

      <BaseTable
        columns={columns}
        data={data}
        className='table'
        variant='box_table'
      />
      <Dialog isOpen={isShowCompany}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box sx={{ background: '#fff', height: '100vh', width: '300px' }}>
        <BaseDrawer
          title={currentCompany ? 'COMPANY EDIT' : 'ADD COMPANY'}
          onClick={() => setIsShowCompany(false)}
        >
          <FormCompany currentCompany={currentCompany} handleSubmit={handleSubmit} />
        </BaseDrawer>
      </Box>
        </Box>
      </Dialog>
      <BaseModel
        isShow={isShowModal}
        isOpen={() => setIsShowModal(!isShowModal)}
        onclick={() => {
          deleteCompanyAction(currentCompany as ICompany)
          setIsShowModal(false)
        }}
      />
    </>
  )
}