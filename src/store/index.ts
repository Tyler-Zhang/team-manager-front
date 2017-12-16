import { combineReducers, createStore, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'

// Reducers
import teams, { TeamStore } from './teams'

export const history = createHistory()

export interface RootStore {
  teams: TeamStore
}

const reducer = combineReducers<RootStore>({
  teams,
  routing: routerReducer
})

export const store = createStore<RootStore>(
  reducer,
  applyMiddleware(ReduxThunk, routerMiddleware(history))
)
