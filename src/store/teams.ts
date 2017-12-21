import { Dispatch } from 'redux'
import { API_GET_TEAMS } from '../constants/api'
import { LoadState, ReduxAction } from '../types'
import axios from '../utils/axios'

// Actions
const CHANGE_LOAD_STATE = 'team-manager/team/CHANGE_LOAD_STATE'
const LOAD_TEAMS = 'team-manager/team/LOAD_TEAMS'

// Action Creators
export function changeLoadState (state: LoadState) {
  return {
    type: CHANGE_LOAD_STATE,
    state
  }
}

export function loadTeams () {
  return async (dispatch: Dispatch<{}>) => {
    dispatch(changeLoadState(LoadState.loading))

    const response = await axios.get(API_GET_TEAMS)

    dispatch({ type: LOAD_TEAMS, teams: response.data })
    dispatch(changeLoadState(LoadState.loaded))
  }
}

// Default State + Reducers
export interface TeamStore {
  teams: any[]
  loadState: LoadState
}

const defaultState: TeamStore = {
  teams: [],
  loadState: LoadState.beforeLoad
}

export default (state: TeamStore = defaultState, action: ReduxAction) => {
  switch (action.type) {
    case CHANGE_LOAD_STATE:
      return { ...state, state: action.state }
    case LOAD_TEAMS:
      return { ...state, teams: action.teams}
    default: return state
  }
}
