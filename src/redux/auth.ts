import { AnyAction } from 'redux'
import { UsersStore, LoadState } from '../types'

// Actions
const LOGIN_SUCCESS = 'team-manager/auth/LOGIN_SUCCESS'
const LOGIN_FAIL = 'team-manager/auth/LOGIN_FAIL'
const RELOAD_TOKEN = 'team-manager/auth/RELOAD_TOKEN'
// Action creators

export const login = (username, password) => {
  fetch('/api', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  })
}

// Default state
const defaultState: UsersStore = {
  users: [],
  loadState: LoadState.loading,
  page: 0,
  pageSize: 50,
  order: ''
}

export default (state: UsersStore = defaultState, action: AnyAction) => {
  switch ( action.type ) {
    case FETCH_LOAD:
      return {
        ...state,
        loadState: LoadState.loading
      }
    case FETCH_ERROR:
      return {
        ...state,
        loadState: LoadState.error,
        error: action.error
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        users: action.users
      }
    default: return state
  }
}
