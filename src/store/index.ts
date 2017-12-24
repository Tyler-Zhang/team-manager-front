import { combineReducers, createStore, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'

// Reducers
import teams, { TeamStore, loadTeams, loadTeamPreview } from './teams'
import users, { UserStore, loadUsers, loadUserPreview } from './users'

export const history = createHistory()

export interface RootStore {
  teams: TeamStore,
  users: UserStore
}

const reducer = combineReducers<RootStore>({
  teams,
  users,
  routing: routerReducer
})

export const store = createStore<RootStore>(
  reducer,
  applyMiddleware(ReduxThunk, routerMiddleware(history))
)

export function init (s: typeof store) {
  s.dispatch(loadTeamPreview())
  s.dispatch(loadUserPreview())
}

init(store)
