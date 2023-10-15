import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Box, Button } from 'rebass'
import moment from 'moment'
import { Dialog } from '../../components/dialog/dialog'
import { BaseTable } from '../../components/table/table'
import { IItem, IItemsContextProps } from './types'
import useItemsContext from './logic/provider'
import { BaseDrawer } from '../../components/drawer/drawer'
import { ICategory, ICategoryContext } from '../categories/types'
import useCategoriesContext from '../categories/logic/provider'
import { FormItem, IFormItem } from './ui/formItem'
import { ICompanyContext } from '../companies_register/type'
import useCompaniesContext from '../companies_register/logic/provider'
import { BaseModel } from '../../components/modal/modal'
import { IUserInfo } from '../auth/types'
import { IProject,
  IProjectsContextProps
} from '../projects/types'
import useProjectsContext from '../projects/logic/provider'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
interface IProps {
  children?: React.ReactNode
}
export const Item: React.FC<IProps> = () => {
  const [isShowDrawer, setIsShowDrawer] = useState(false)
  const {
    items,
    currentItems,
    setCurrentItems,
    getItems,
    createItems,
    deleteItems,
    updateItems,
  }: IItemsContextProps = useItemsContext()
  const { categories, getCategories}: ICategoryContext = useCategoriesContext()
  const { getCompaniesAction }: ICompanyContext = useCompaniesContext()
  const { projects, getProjects }: IProjectsContextProps = useProjectsContext()
  const [isUpdate, setIsUpdate] = useState(false)
  const [isShowModel, setIsShowModel] = useState(false)

  useEffect(() => {
    getItems()
    getCompaniesAction({})
    getCategories('')
    getProjects({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteItems = () => {
    deleteItems(currentItems as IItem)
  }

  const handleSubmit = (value: IFormItem, project: IProject) => {

    if (!currentItems || !isUpdate) {
      createItems(value, project)
      setCurrentItems(null)
      setIsShowDrawer(false)

      return
    }

    updateItems(currentItems?.itemID, value)
    setCurrentItems(null)
    setIsShowDrawer(false)
    setIsUpdate(false)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: 'Project',
      dataIndex: 'projectID',
      key: 'project',
      width: 300,
      render: (projectID: string) => {
          return <Box>{projects[projectID]?.name}</Box>

      },
    },
    {
      title: 'Category',
      dataIndex: 'categoryID',
      key: 'categoryID',
      width: 300,
      render: (item: string, row: IItem, idx: number) => {
        return <Box key={idx}>{Object.values(categories).find((category: ICategory) => category.categoryID ===  item)?.name}</Box>
      },
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 300,
    },
    {
      title: 'UpdateAt',
      dataIndex: 'updateAt',
      key: 'updateAt',
      width: 300,
    },
    {
      title: 'Creator',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 300,
      render: (createdBy: IUserInfo, row: IItem, idx: number) => {
         return <Box>{ createdBy?.displayName }</Box>

      },
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'Actions',
      render: (item: IItem, row: IItem, idx: number) => {
        return (
          <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'center' }}>
            <FontAwesomeIcon
              fontSize='20px'
              style={{ marginRight: '10px' }}
              color='rgb(33, 131, 255)'
              icon={faEdit as IconProp}
              onClick={() => {
                setIsUpdate(true)
                setCurrentItems(item)
                setIsShowDrawer(true)
              }}
            />
            <FontAwesomeIcon
              style={{ cursor: 'pointer' }}
              fontSize='20px'
              color='#808080'
              icon={faTrashAlt as IconProp}
              onClick={() => {
                setIsShowModel(!isShowModel)
                setCurrentItems(item)
              }}
            />
          </Box>
        )
      },
    },
  ]

  const data =  Object.values(items).map((each, idx) => {
    return {
      ...each,
      name: each?.name,
      project: each?.projectID,
      createdAt: moment(each.createdAt).format('DD/MM/YYYY HH:mm:ss'),
      updateAt: new Date().toISOString().slice(0, 10),
      createdBy: each?.createdBy,
      key: idx,
    }
  })

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>GAMING PLATFORM DASHBOARD ITEM</h3>
        <Button
          sx={{ height: '35px', fontSize: '14px', cursor: 'pointer', marginTop: '5px' }}
          onClick={(e) => {
            e.stopPropagation()
            setIsShowDrawer(!isShowDrawer)
            setIsUpdate(false)
            setCurrentItems(null)
          }}
        >
          Create new
        </Button>
      </Box>
        <BaseTable columns={columns} data={data} className='table' variant='box_table' />
      <Dialog isOpen={isShowDrawer}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box sx={{ background: '#fff', height: '100vh', width: '300px' }}>
          <BaseDrawer
            title={currentItems ? 'ITEM EDIT' : 'ADD ITEM'}
            onClick={() => {
              setIsShowDrawer(false)
            }}
          >
            <FormItem currentItem={currentItems} handleSubmit={handleSubmit} />
          </BaseDrawer>
      </Box>
        </Box>
      </Dialog>
      <BaseModel
        isShow={isShowModel}
        isOpen={() => setIsShowModel(!isShowModel)}
        onclick={() => {
          handleDeleteItems()
          setIsShowModel(false)
        }}
      />
    </>
  )
}
