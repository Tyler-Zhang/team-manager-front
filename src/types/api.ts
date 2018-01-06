export enum Authority {
  member = 'member',
  admin = 'admin',
  superAdmin= 'superAdmin'
}

export enum PositionLevel {
  member = 'member',
  coLead = 'coLead',
  lead = 'lead'
}

export enum FilePermission {
  none = 'none',
  reader = 'reader',
  writer = 'writer',
  owner = 'owner'
}

export interface TeamPreview {
  id: number
  name: string
}

export interface UserPreview {
  id: number
  firstName: string
  lastName: string
  email: string
  slackTag: string
}

interface BaseEntity {
  id: number
  createDate: string
  updateDate: string
}

export declare interface Position {}

export interface User extends BaseEntity {
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  email: string
  authority: Authority
  slackTag: string
  positions: Position[]
}

export interface File extends BaseEntity {
  fileId: string
  owner: User
  permission: FilePermission
  team: Team
}

export interface Team extends BaseEntity {
  name: string
  positions: Position[]
  files: File[]
}

export interface Position extends BaseEntity {
  level: PositionLevel
  user: User
  team: Team
}

export interface UserInfo {
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  email: string
  authority: Authority
  slackTag: string
  googleAuth: boolean
}

export interface ApiFindQuery<Model> {
  q?: string
  pageSize?: number
  page?: number
  order?: keyof Model
  orderDir?: 'ASC' | 'DESC'
}
