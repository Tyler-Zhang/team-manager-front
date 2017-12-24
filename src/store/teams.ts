import { Dispatch } from 'redux'
import { API_GET_TEAMS, API_GET_TEAMS_PREVIEW } from '../constants/api'
import { LoadState, ReduxAction, TeamPreview, Team } from '../types'
import axios from '../utils/axios'

// Actions
const CHANGE_LOAD_STATE = 'team-manager/team/CHANGE_LOAD_STATE'
const LOAD_TEAMS = 'team-manager/team/LOAD_TEAMS'
const LOAD_TEAMS_PREVIEW = 'team-manager/team/LOAD_TEAMS_PREVIEW'

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

export function loadTeamPreview () {
  return async (dispatch: Dispatch<{}>) => {
    dispatch (changeLoadState(LoadState.loading))
    const response = await axios.get(API_GET_TEAMS_PREVIEW)
    dispatch({ type: LOAD_TEAMS_PREVIEW, teamsPreview: response.data })
    dispatch(changeLoadState(LoadState.loaded))
  }
}

// Default State + Reducers
export interface TeamStore {
  teams: Team[]
  preview: TeamPreview[]
  loadState: LoadState
}

const defaultState: TeamStore = {
  teams: [],
  preview: [],
  loadState: LoadState.beforeLoad
}

export default (state: TeamStore = defaultState, action: ReduxAction): TeamStore => {
  switch (action.type) {
    case CHANGE_LOAD_STATE:
      return { ...state, loadState: action.state }
    case LOAD_TEAMS:
      return { ...state, teams: action.teams}
    case LOAD_TEAMS_PREVIEW:
      return { ...state, preview: action.teamsPreview }
    default: return state
  }
}
