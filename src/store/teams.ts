import { Dispatch } from 'redux'
import { API_GET_TEAMS, API_GET_TEAMS_PREVIEW } from '../constants/api'
import { ReduxAction, TeamPreview, Team } from '../types'
import axios from '../utils/axios'

// Actions
const CHANGE_LOAD_STATE = 'team-manager/team/CHANGE_LOAD_STATE'
const LOAD_TEAMS = 'team-manager/team/LOAD_TEAMS'
const LOAD_TEAMS_PREVIEW = 'team-manager/team/LOAD_TEAMS_PREVIEW'

// Action Creators

export function loadTeams () {
  return async (dispatch: Dispatch<{}>) => {
    const response = await axios.get(API_GET_TEAMS)
    const { data, total } = response.data
    dispatch({ type: LOAD_TEAMS, teams: data, total })
  }
}

export function loadTeamPreview () {
  return async (dispatch: Dispatch<{}>) => {
    const response = await axios.get(API_GET_TEAMS_PREVIEW)
    dispatch({ type: LOAD_TEAMS_PREVIEW, teamsPreview: response.data })
  }
}

// Default State + Reducers
export interface TeamStore {
  teams: Team[] | null
  preview: TeamPreview[] | null
  total: number | null
}

const defaultState: TeamStore = {
  teams: null,
  preview: null,
  total: null
}

export default (state: TeamStore = defaultState, action: ReduxAction): TeamStore => {
  switch (action.type) {
    case LOAD_TEAMS:
      return { ...state, teams: action.teams, total: action.total }
    case LOAD_TEAMS_PREVIEW:
      return { ...state, preview: action.teamsPreview }
    default: return state
  }
}
