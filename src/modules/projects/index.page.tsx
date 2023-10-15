import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { BaseTable } from '../../components/table/table'
import { IProject, IProjectsContextProps, ProjectStatus, ProjectType } from './types'
import useProjectsContext from './logic/provider'
import { ICategoryContext } from '../categories/types'
import useCategoriesContext from '../categories/logic/provider'
import { Dialog } from '../../components/dialog/dialog'
import { BaseDrawer } from '../../components/drawer/drawer'
import { FormProject, IFormProject } from './ui/formProject'
import { ICompanyContext } from '../companies_register/type/index'
import useCompaniesContext from '../companies_register/logic/provider'
import { BaseModel } from '../../components/modal/modal'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
interface IProps {
    children?: React.ReactNode,
}
const RenderModel = (
    {title, currentEditProject, handleSubmit, setIsShowModel}
    : {title: string, currentEditProject: IProject | null | IFormProject, handleSubmit
    : (value: IFormProject) => void, setIsShowModel
    : (isShow : boolean) => void
    }) => {

    return (
        <Box sx={{ background: '#fff', height: '100vh' }}>
            <BaseDrawer title={title}
                onClick={() => { setIsShowModel(false)}}>
                <FormProject currentEditProject={currentEditProject} handleSubmit={handleSubmit} />
            </BaseDrawer>
        </Box>
    )
}

export const Project: React.FC<IProps> = () => {
    const [isShowModel, setIsShowModel] = useState<boolean>(false)
    const [currentEditProject, setCurrentEditProject] = useState<IProject | null | IFormProject>(null)
    const [isShowDialogDel, setIsShowDialogDel] = useState<boolean>(false)
    const { projects, getProjects, createdProject, deleteProject, updateProject, currentDeleteProject, setCurrentDeleteProject }:
    IProjectsContextProps = useProjectsContext()
    const { categories, getCategories}: ICategoryContext = useCategoriesContext()
    const { companies, getCompaniesAction }: ICompanyContext = useCompaniesContext()

    useEffect(() => {
        getProjects({})
        getCategories('')
        getCompaniesAction({})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const initialProject: IFormProject = useMemo(() => {

        return {
            categoryID: Object.values(categories)?.[0]?.categoryID,
            companyID: Object.values(companies)?.[0]?.companyID,
            name: '',
            email: '',
            phoneNumber: '',
            type: ProjectType.ART,
            tags: [],
            logo: '',
            photos: [],
            banner: '',
            introVideo: '',
            intro: '',
            description: '',
            status: ProjectStatus.PENDING
        }
    }, [categories, companies])

    const columns = [
        {
            title: 'No.',
            render: (value: IProject, record: IProject, index: number) => {
                return (
                    <span>{index + 1}</span>
                )
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            title: 'Tag',
            dataIndex: 'tags',
            key: 'tag',
            render: (tags: string[]) => {
                return (
                    <Box>{(tags || []).join(', ')}</Box>
                )
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            className: 'email_col'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 500,
            className: 'description_col'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'Actions',
            render: (project: IProject) => (
                <Box>
                    <FontAwesomeIcon
                        fontSize='20px'
                        style={{ marginRight: '10px', cursor: 'pointer' }}
                        color='rgb(33, 131, 255)'
                        icon={faEdit as IconProp}
                        onClick={() => { onEditProject(project) }}
                    />
                    <FontAwesomeIcon style={{ cursor: 'pointer' }}
                        fontSize='20px' color='#808080' icon={faTrashAlt as IconProp}
                        onClick={() => {
                            setIsShowDialogDel(true)
                            setCurrentDeleteProject(project)
                        }} />
                </Box>
            ),
        },
    ]

    const onEditProject = (project: IProject) => {
        setIsShowModel(!isShowModel)
        setCurrentEditProject(project)
    }

    const onAddProject = () => {
        setIsShowModel(!isShowModel)
        setCurrentEditProject(initialProject)
    }

    const handleDeleteProject = () => {
        deleteProject(currentDeleteProject as IProject);
    }

    const handleSubmit = (value: IFormProject | IProject) => {
        if (!currentEditProject?.projectID) {

            createdProject(value as IFormProject)
            setCurrentEditProject(null)
            setIsShowModel(false)

            return
        }

        updateProject(currentEditProject?.projectID, value as IProject)
        setCurrentEditProject(null)
        setIsShowModel(false)
    }
    const data: IProject[] = Object.values(projects).map((each, idx) => {
        return {
            ...each,
            key: idx.toString()
        }
    })


    return (
        <Box variant='box__project_container' >
            <Dialog isOpen={isShowModel}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <RenderModel
                    title={currentEditProject?.projectID ? 'Edit Project' : 'Add Project'}
                    currentEditProject={currentEditProject}
                    handleSubmit={(value) => handleSubmit(value)}
                    setIsShowModel={setIsShowModel} />
                </Box>
            </Dialog>
            <Dialog isOpen={isShowDialogDel}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <BaseModel isShow={isShowDialogDel} isOpen={() => setIsShowDialogDel(false)}
                        onclick={() => {
                            handleDeleteProject()
                            setIsShowDialogDel(false)
                        }
                     } />
                </Box>
            </Dialog>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>GAMING PLATFORM DASHBOARD PROJECTS</h3>
                <Button
                    sx={{ height: '35px', fontSize: '14px', cursor: 'pointer', marginTop: '5px' }}
                    onClick={() => { onAddProject() }}
                >
                    Create new
                </Button>
            </Box>
            <BaseTable columns={columns} data={data} className='table' variant='box_table' />
        </Box>
    );
}
