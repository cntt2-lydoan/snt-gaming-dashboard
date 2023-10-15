import React, { createContext, useCallback, useContext, useState } from 'react';
import { hooks } from '@snt/react-cores';
import { IResponseDataType } from '../../../types';
import { IProject, IProjectsContextProps, IParamProject } from '../types';
import { IFormProject } from '../ui/formProject';
import { createdProjectFromApi, deleteProjectFromApi, getProjectsFromApi, updateProjectFromApi } from './api';

export const ProjectsContext = createContext<IProjectsContextProps>(null!)

export const ProjectsProvider: React.FC = ({ children }) => {
    const [projects, setProjects] = useState<{[key: string]: IProject}>({})
    const [loadingByProjectID, setLoadingByProjectID] = useState(false)
    const [currentDeleteProject, setCurrentDeleteProject] = useState<IProject | null>(null!)
    const [currentProject, setCurrentProject] = useState<IProject | null>(null)
    const [ projectInCategory, setProjectInCategory] = useState({})
    const { enqueueSnackbar }: hooks.WithSnackbarProps = hooks.useNoti()
    const getProjects = useCallback((query: IParamProject) => {
        setLoadingByProjectID(true)
        void getProjectsFromApi(query).then((response: IResponseDataType<IProject>) => {
            setProjects(response.list)
        })

        .catch((error) => {
            throw error
        })

        .finally(() => {
            setLoadingByProjectID(false)
        })
    }, [])

    const createdProject = useCallback((data: IFormProject) => {
        setLoadingByProjectID(true)

        void createdProjectFromApi(data).then((response) => {
            if (response) {
                setProjects({
                [response?.res?.data?.projectID]: response?.res?.data,
                    ...projects,

                })
                enqueueSnackbar('Create project  successfully!', { variant: 'success' })

                return
            }
        })
        .catch((error: Error) => {
            enqueueSnackbar('Create project fail!', { variant: 'error' })
            throw error
        })
        .finally(() => {
            setLoadingByProjectID(false)
        })
    }, [projects, enqueueSnackbar])

    const deleteProject = useCallback(
        (data: IProject) => {
          setLoadingByProjectID(true)
          void deleteProjectFromApi(data)
            .then((response) => {
              const tempProject = delete projects[data?.projectID || '']
              if (response && tempProject) {
                setProjects(projects)
                setCurrentDeleteProject(null)
                enqueueSnackbar('Delete project successfully!', { variant: 'success' })

                return
              }
              enqueueSnackbar('Delete project fail!', { variant: 'error' })
            })
            .catch((error) => {
              enqueueSnackbar('Delete project fail!', { variant: 'error' })
              throw error
            })
            .finally(() => {
              setLoadingByProjectID(false)
            })
          },
        [projects, enqueueSnackbar]
      )

      const updateProject = useCallback((projectID?: string, value?: IProject) => {
          setLoadingByProjectID(true)
          if (!projectID) {
            enqueueSnackbar('Project not found!', { variant: 'error' })

            return
          }
          void updateProjectFromApi(projectID, value)
          .then((response) => {
              if (response?.status !== 200) {
                enqueueSnackbar('Update project fail!', { variant: 'error' })

                return
              }
              setProjects({
                ...projects,
                [projectID]: {
                  ...projects[projectID],
                  ...value
                },
              })
              enqueueSnackbar('Update project successfully!', { variant: 'success' })
            })
            .catch((error) => {
              enqueueSnackbar('Update project fail!', { variant: 'error' })
              throw error
            })
            .finally(() => {
              setLoadingByProjectID(false)
            })
          },
        [projects, enqueueSnackbar]
      )
      const getProjectsInCategories = useCallback((query: IParamProject) => {
            return getProjectsFromApi(query).then(res => {
              setProjectInCategory(res?.list)

              return res?.list
            })
             // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [projectInCategory])

    return (
        <ProjectsContext.Provider value={{
            projects,
            currentDeleteProject,
            setCurrentDeleteProject,
            setProjects,
            getProjects,
            createdProject,
            deleteProject,
            updateProject,
            currentProject,
            setCurrentProject,
            loadingByProjectID,
            setLoadingByProjectID,
            projectInCategory,
            getProjectsInCategories

        }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export default function useProjectsContext() {
    const context = useContext(ProjectsContext)

    if (!context) {
        throw new Error('useProjectsContext must be used within a ProjectsProvider')
    }

    return context
}
