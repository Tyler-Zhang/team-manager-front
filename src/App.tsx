import * as React from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux';
import Login from './components/Login'

import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
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
                <Route path="/" exact={true} component={Dashboard} />
              </Switch>
            </Navigation>
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}
