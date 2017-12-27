import { Dispatch } from 'redux'
import { LoadState, ReduxAction, User, UserPreview } from '../types'
import { API_GET_USERS, API_GET_USERS_PREVIEW } from '../constants/api'
import axios from '../utils/axios'

// Actions
const CHANGE_LOAD_STATE = 'user-manager/user/CHANGE_LOAD_STATE'
const LOAD_USERS = 'user-manager/user/LOAD_USERS'
const LOAD_USERS_PREVIEW = 'user-manager/user/LOAD_USERS_PREVIEW'

// Action Creators
export function changeLoadState (state: LoadState) {
  return {
    type: CHANGE_LOAD_STATE,
    state
  }
}

export function loadUsers () {
  return async (dispatch: Dispatch<{}>) => {
    dispatch(changeLoadState(LoadState.loading))
    const response = await axios.get(API_GET_USERS)
    dispatch({ type: LOAD_USERS, users: response.data })
  }
}

export function loadUserPreview () {
  return async (dispatch: Dispatch<{}>) => {
    dispatch (changeLoadState(LoadState.loading))
    const response = await axios.get(API_GET_USERS_PREVIEW)
    dispatch({ type: LOAD_USERS_PREVIEW, usersPreview: response.data })
  }
}

// Default State + Reducers
export interface UserStore {
  loadState: LoadState,
  users: User[],
  usersPreview: UserPreview[]
}

const defaultState: UserStore = {
  loadState: LoadState.beforeLoad,
  users: [],
  usersPreview: []
}

export default (state: UserStore = defaultState, action: ReduxAction): UserStore => {
  switch (action.type) {
    case CHANGE_LOAD_STATE:
      return { ...state, loadState: action.state }
    case LOAD_USERS:
      return { ...state, users: action.users, loadState: LoadState.loaded }
    case LOAD_USERS_PREVIEW:
      return { ...state, usersPreview: action.usersPreview, loadState: LoadState.loaded }
    default: return state
  }
}
