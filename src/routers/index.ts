import { hoc } from '@snt/react-cores'
import { SignIn } from '../modules/auth/ui/signin'
import { CompanyRegister } from '../modules/companies_register/index.page'
import { Home } from '../modules/home/index.page'
import { InviteMember } from '../modules/invite_member/index.page'
import { ItemVariants } from '../modules/item_variants/index.page'
import { Item } from '../modules/items/index.page'
import { Project } from '../modules/projects/index.page'
import { User } from '../modules/users/index.page'

export const routes: hoc.IRoute[] = [
  {
    path: '/',
    component: Home,
    isExact: true,
    withLayout: true
  },
  {
    path: '/signin',
    component: SignIn,
    isExact: true,
    withLayout: false,
  },
  {
    path: '/items',
    component: Item,
    isExact: true,
    withLayout: true
  },
  {
    path: '/projects',
    component: Project,
    isExact: true,
    withLayout: true,
  },
  {
    path: '/companies',
    component: CompanyRegister,
    isExact: true,
    withLayout: true,
  },

  {
    path: '/users',
    component: User,
    isExact: true,
    withLayout: true,
  },
  {
    path: '/invite-member',
    component: InviteMember,
    isExact: true,
    withLayout: true,
  },
  {
    path: '/itemVariants',
    component: ItemVariants,
    isExact: true,
    withLayout: true,
  }
]
