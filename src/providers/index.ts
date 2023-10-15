import { AuthProvider } from '../modules/auth/logic/provider'
import { CategoriesProvider } from '../modules/categories/logic/provider'
import { CompaniesProvider } from '../modules/companies_register/logic/provider'
import { HomeProvider } from '../modules/home/logic'
import { InviterMemberProvider } from '../modules/invite_member/logic/provider'
import { ItemVariantsProvider } from '../modules/item_variants/logic/provider'
import { ItemsProvider } from '../modules/items/logic/provider'
import { ProjectsProvider } from '../modules/projects/logic/provider'
import { UsersProvider } from '../modules/users/logic/provider'

export const providers = [
  HomeProvider,
  ItemVariantsProvider,
  UsersProvider,
  ProjectsProvider,
  InviterMemberProvider,
  CategoriesProvider,
  CompaniesProvider,
  CategoriesProvider,
  ItemsProvider,
  AuthProvider,
]
