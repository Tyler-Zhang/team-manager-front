import { Dispatch } from 'redux'
import { API_GET_ACCOUNT } from '../constants/api'
import { LoadState, ReduxAction, TeamPreview, Team, UserInfo } from '../types'
import axios from '../utils/axios'

// Actions
const CHANGE_LOAD_STATE = 'team-manager/account/CHANGE_LOAD_STATE'
const SET_ACCOUNT_INFO = 'team-manager/account/SET_ACCOUNT_INFO'

// Action Creators
export function loadAccountInfo () {
  return async (dispatch: Dispatch<{}>) => {
    const response = await axios.get(API_GET_ACCOUNT)
    dispatch({ type: SET_ACCOUNT_INFO, info: response.data })
  }
}

// Default State + Reducers

export type AccountStore = {
  info: UserInfo | null
}

const defaultState: AccountStore = {
  info: null
}

export default (state: AccountStore = defaultState, action: ReduxAction): AccountStore => {
  switch (action.type) {
    case SET_ACCOUNT_INFO:
      return { ...state, info: action.info }
    default: return state
  }
}
