import { Dispatch } from 'redux'
import { LoadState, ReduxAction } from '../types'
import { API_GET_USERS } from '../constants/api'
import axios from '../utils/axios'

// Actions
const CHANGE_LOAD_STATE = 'user-manager/user/CHANGE_LOAD_STATE'
const LOAD_USERS = 'user-manager/user/LOAD_USERS'

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
    dispatch(changeLoadState(LoadState.loaded))
  }
}

// Default State + Reducers
export interface UserStore {
  loadState: LoadState,
  users: any[]
}

const defaultState: UserStore = {
  loadState: LoadState.beforeLoad,
  users: []
}

export default (state: UserStore = defaultState, action: ReduxAction) => {
  switch (action.type) {
    case CHANGE_LOAD_STATE:
      return { ...state, state: action.state }
    case LOAD_USERS:
      return { ...state, users: action.users }
    default: return state
  }
}
