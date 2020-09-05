import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Users from './components/Users'

function App() {
  return (
    <Router>
    <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
