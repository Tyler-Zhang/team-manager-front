import * as React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Signup from './components/Signup'

import './App.css';
import store, { history } from './redux'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <ConnectedRouter history={history}>
            <div>
              <Route path="/login" component={Login}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/signup" component={Signup}/>
            </div>
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
