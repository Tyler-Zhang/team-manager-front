import { LoadState, ReduxAction } from '../types'
import { Dispatch } from 'redux'

// Actions
const CHANGE_LOAD_STATE = 'team-manager/team/CHANGE_LOAD_STATE'

// Action Creators
export function changeLoadState (state: LoadState) {
  return {
    type: CHANGE_LOAD_STATE,
    state
  }
}

export function loadTeams () {
  return (dispatch: Dispatch<{}>) => {

  }
}

// Default State + Reducers
const defaultState = {
  loadState: LoadState.beforeLoad
}

export type TeamStore = typeof defaultState

export default (state: TeamStore = defaultState, action: ReduxAction) => {
  switch (action.type) {
    case CHANGE_LOAD_STATE:
      return { ...state, state: action.state }
    default: return state
  }
}
