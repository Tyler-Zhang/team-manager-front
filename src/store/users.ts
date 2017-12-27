import { Dispatch } from 'redux'
import { ReduxAction, User, UserPreview } from '../types'
import { API_GET_USERS, API_GET_USERS_PREVIEW } from '../constants/api'
import axios from '../utils/axios'

// Actions
const CHANGE_LOAD_STATE = 'user-manager/user/CHANGE_LOAD_STATE'
const LOAD_USERS = 'user-manager/user/LOAD_USERS'
const LOAD_USERS_PREVIEW = 'user-manager/user/LOAD_USERS_PREVIEW'

export function loadUsers () {
  return async (dispatch: Dispatch<{}>) => {
    const response = await axios.get(API_GET_USERS)
    dispatch({ type: LOAD_USERS, users: response.data })
  }
}

export function loadUserPreview () {
  return async (dispatch: Dispatch<{}>) => {
    const response = await axios.get(API_GET_USERS_PREVIEW)
    dispatch({ type: LOAD_USERS_PREVIEW, usersPreview: response.data })
  }
}

// Default State + Reducers
export interface UserStore {
  users: User[] | null,
  usersPreview: UserPreview[] | null
}

const defaultState: UserStore = {
  users: null,
  usersPreview: null
}

export default (state: UserStore = defaultState, action: ReduxAction): UserStore => {
  switch (action.type) {
    case LOAD_USERS:
      return { ...state, users: action.users }
    case LOAD_USERS_PREVIEW:
      return { ...state, usersPreview: action.usersPreview }
    default: return state
  }
}
