export interface Team {
  id: number
  name: string
}

export interface Position {
  level: number | string
  team?: Team
  user?: User
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: Date
  positions: Position[]
}

export enum LoadState {
  loading,
  error, 
  completed
}

export interface PaginatedObjectsStore {
  loadState: LoadState
  page: number
  pageSize: number
  order: string
}

export interface SessionStore {
  id: number
}

export interface UsersStore extends PaginatedObjectsStore {
  users: User[]
}

export interface Store {
  users: UsersStore,
  session: SessionStore
}

export interface LoginResponse {
  message?: String
}