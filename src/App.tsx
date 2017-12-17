import * as React from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux';
import Login from './components/Login'

import Navigation from './components/Navigation'
import { UsersPage } from './components/Users'
// import Signup from './components/Signup'

import './App.css'
import { store, history } from './store'

export default class App extends React.PureComponent {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" exact={true} component={Login} />
            <Navigation>
              <Switch>
                <Route path="/users" exact={true} component={UsersPage} />
              </Switch>
            </Navigation>
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}
