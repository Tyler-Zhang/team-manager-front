import * as React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './App.css';
import store, { history } from './redux'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <ConnectedRouter history={history}>
            <Route path="/login" />
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
