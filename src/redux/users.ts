import { AnyAction } from 'redux'
import { UsersStore, LoadState } from '../types'

// Actions
const FETCH_LOAD = 'team-manager/users/FETCH_LOAD'
const FETCH_ERROR = 'team-manager/users/FETCH_ERROR'
const FETCH_SUCCESS = 'team-manager/users/FETCH_SUCCESS'
// Action creators

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
