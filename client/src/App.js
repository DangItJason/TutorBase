import React from 'react';
import login from './components/Login';
import signup from './components/signup';
import landing from './components/landing/landing';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={landing} />
        <Route exact path='/login' component={login} />
        <Route exact path='/signup' component={signup} />
      </Switch>
    </Router>
  );
}

export default App;
