import { IFormProject } from '../ui/formProject';

export interface IProjectsContextProps {
    projects: {[key: string] : IProject}
    setProjects: (projects: {[key: string]: IProject}) => void
    getProjects: (query: IParamProject) => void
    createdProject: (data: IFormProject) => void
    deleteProject: (data: IProject) => void
    updateProject: (projectID?: string, value?: IProject) => void
    loadingByProjectID: boolean,
    setLoadingByProjectID: (loadingByProjectID: boolean) => void
    currentDeleteProject: IProject | null,
    setCurrentDeleteProject: (currentDeleteProject: IProject) => void
    currentProject: IProject | null
    setCurrentProject: (project: IProject | null) => void
    getProjectsInCategories: (query: IParamProject) => Promise<object>
    projectInCategory: { [key: string]: IProject }
}
export interface IParamProject {
    categoryID?: string
    projectID?: string
    companyID?: string
    name?: string
    address?: string
    status?: string
  }

export enum ProjectStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED'
}

export enum ProjectType {
    ART = 'ART',
    GAME = 'GAME'
}
export interface ITypeProject {
    [key: string] : string | string[] | ProjectStatus}
export interface IProject extends ITypeProject{
    projectID: string
    categoryID: string
    companyID: string
    name: string
    email: string
    phoneNumber: string
    type: string
    tags: string[]
    logo: string
    photos: string[]
    banner: string
    introVideo: string
    intro: string
    description: string
    status: ProjectStatus
    createdAt: string
    updatedAt: string
}
export interface IParamProject {
    categoryID?: string
    projectID?: string
    companyID?: string
    name?: string
    address?: string
    status?: string
  }
