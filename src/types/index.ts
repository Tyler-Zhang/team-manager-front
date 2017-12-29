export * from './api'
export * from './google-drive'

export enum LoadState {
  beforeLoad,
  loading,
  loaded,
  reloading
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

export interface LoginResponse {
  message?: String
}

export interface ReduxAction {
  type: string,
  [key: string]: any
}
