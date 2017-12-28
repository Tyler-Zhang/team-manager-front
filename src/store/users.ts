import { Dispatch } from 'redux'
import { ReduxAction, User, UserPreview, ApiFindQuery } from '../types'
import { API_GET_USERS, API_GET_USERS_PREVIEW } from '../constants/api'
import axios from '../utils/axios'
import teams from './teams';
import { RootStore } from './index';

// Actions
const CHANGE_QUERY = 'user-manager/user/CHANGE_QUERY'
const LOAD_USERS = 'user-manager/user/LOAD_USERS'
const LOAD_USERS_PREVIEW = 'user-manager/user/LOAD_USERS_PREVIEW'

export function loadUsers () {
  return async (dispatch: Dispatch<{}>, getState: () => RootStore) => {
    const queryParams = getState().users.query

    const response = await axios.get(API_GET_USERS, { params: queryParams })
    const { data, total } = response.data

    dispatch({ type: LOAD_USERS, users: data, total })
  }
}

export function loadUserPreview () {
  return async (dispatch: Dispatch<{}>) => {
    const response = await axios.get(API_GET_USERS_PREVIEW)
    dispatch({ type: LOAD_USERS_PREVIEW, usersPreview: response.data })
  }
}

export function changeQuery (query: Partial<ApiFindQuery<User>>) {
  return { type: CHANGE_QUERY, query }
}

// Default State + Reducers
export interface UserStore {
  users: User[] | null,
  usersPreview: UserPreview[] | null,
  query: ApiFindQuery<User>,
  total: number | null
}

const defaultState: UserStore = {
  users: null,
  usersPreview: null,
  query: {
    pageSize: 50,
    page: 0
  },
  total: null
}

export default (state: UserStore = defaultState, action: ReduxAction): UserStore => {
  switch (action.type) {
    case LOAD_USERS:
      return { ...state, users: action.users, total: action.total }
    case LOAD_USERS_PREVIEW:
      return { ...state, usersPreview: action.usersPreview }
    case CHANGE_QUERY:
      return { ...state, query: { ...state.query, ...action.query} }
    default: return state
  }
}
