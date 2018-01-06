import { Dispatch } from 'redux'
import { API_GET_TEAMS, API_GET_TEAMS_PREVIEW, API_GET_TEAM_BY_ID } from '../constants/api'
import { ReduxAction, TeamPreview, Team, ApiFindQuery } from '../types'
import axios from '../utils/axios'
import { RootStore } from './index';

// Actions
const CHANGE_LOAD_STATE = 'team-manager/team/CHANGE_LOAD_STATE'
const LOAD_TEAMS = 'team-manager/team/LOAD_TEAMS'
const LOAD_TEAMS_PREVIEW = 'team-manager/team/LOAD_TEAMS_PREVIEW'
const LOAD_SELECTED_TEAM = 'team-manager/team/LOAD_SELECTED_TEAM'
const CHANGE_QUERY = 'team-manager/team/CHANGE_QUERY'
const SELECT_TEAM = 'team-manager/team/SELECT_TEAM'

// Action Creators

export function loadTeams () {
  return async (dispatch: Dispatch<{}>, getState: () => RootStore) => {
    const queryParams = getState().teams.query

    const response = await axios.get(API_GET_TEAMS, { params: queryParams })
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

export function loadSelectedTeam () {
  return async (dispatch: Dispatch<{}>, getState: () => RootStore) => {
    const selectdTeamId = getState().teams.selectedId

    if (!selectdTeamId) { return }
    const response = await axios.get(API_GET_TEAM_BY_ID(selectdTeamId))

    dispatch({ type: LOAD_SELECTED_TEAM, team: response.data })
  }
}

export function focusTeam (teamId: number) {
  return { type: SELECT_TEAM, teamId }
}

export function changeQuery (query: Partial<ApiFindQuery<Team>>) {
  return { type: CHANGE_QUERY, query }
}

// Default State + Reducers
export interface TeamStore {
  teams: Team[] | null
  selectedId: number | null
  selectedTeam: Team | null
  preview: TeamPreview[] | null
  total: number | null
  query: ApiFindQuery<Team>
}

const defaultState: TeamStore = {
  teams: null,
  selectedId: null,
  selectedTeam: null,
  preview: null,
  total: null,
  query: { page: 0, pageSize: 50 }
}

export default (state: TeamStore = defaultState, action: ReduxAction): TeamStore => {
  switch (action.type) {
    case LOAD_TEAMS:
      return { ...state, teams: action.teams, total: action.total }
    case LOAD_TEAMS_PREVIEW:
      return { ...state, preview: action.teamsPreview }
    case CHANGE_QUERY:
      return { ...state, query: { ...state.query, ...action.query } }
    case SELECT_TEAM:
      return { ...state, selectedId: action.teamId }
    case LOAD_SELECTED_TEAM:
      return { ...state, selectedTeam: action.team }
    default: return state
  }
}
