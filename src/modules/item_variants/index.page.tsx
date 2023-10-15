import React, { useEffect, useMemo } from 'react'
import { Box } from 'rebass'
import { BaseTable } from '../../components/table/table'
import useCategoriesContext from '../categories/logic/provider'
import { ICategoryContext } from '../categories/types'
import useCompaniesContext from '../companies_register/logic/provider'
import { ICompanyContext } from '../companies_register/type'
import { ITypeIItem } from '../items/types'
import { ITypeUser } from '../users/types'
import useItemVariantsContext from './logic/provider'
import { IItemVariant, IItemVariantContext } from './types'

interface IProps {
    children?: React.ReactNode,
}
export const ItemVariants: React.FC<IProps> = () => {
    const { itemVariants, getItemVariants } : IItemVariantContext = useItemVariantsContext()
    const { categories, getCategories } : ICategoryContext = useCategoriesContext()
    const { companies, getCompaniesAction } : ICompanyContext = useCompaniesContext()

    useEffect(() => {
        getItemVariants()
        getCategories('')
        getCompaniesAction({})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns = [
        {
            title: 'No.',
            render: (value: IItemVariant, record: IItemVariant, index: number) => {
                return (
                    <span>{index + 1}</span>
                )
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            className: 'name_col'
        },
        {
            title: 'User Name',
            dataIndex: 'userID',
            key: 'userID',
            render: (userID: ITypeUser) => {
                return (
                    <Box>{userID?.displayName}</Box>
                )
            },
            className: 'name_col'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemID',
            key: 'itemID',
            render: (itemID: ITypeIItem) => {
                return (
                    <Box>{itemID?.name}</Box>
                )
            },
            className: 'name_col'
        },
        {
            title: 'Category',
            dataIndex: 'categoryID',
            key: 'category',
            render: (categoryID: string) => {
                return (
                    <Box>{categories[categoryID]?.name}</Box>
                )
            },
        },
        {
            title: 'Company',
            dataIndex: 'companyID',
            key: 'company',
            render: (companyID: string) => {
                return (
                    <Box>{companies[companyID]?.name}</Box>
                )
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Trading Status',
            dataIndex: 'tradingStatus',
            key: 'tradingStatus',
            className: 'name_col'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        }
    ]

    const data: IItemVariant[] = useMemo(() => {
        return (
            Object.values(itemVariants).map((each, idx) => {
                return {
                    ...each,
                    key: idx.toString()
                }
            })
        )
    }, [itemVariants])

    return(
        <Box variant='box__project_container'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>GAMING PLATFORM DASHBOARD ITEM VARIANTS</h3>
            </Box>
            <BaseTable columns={columns} data={data} className='table' variant='box_table' />
        </Box>
    )
}
