import React from 'react';
import login from './components/Login';
import signup from './components/signup';
import dashboard from './components/dashboard/tutor/TutorDashboard';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component ={login} />
        <Route exact path='/login' component ={login} />
        <Route exact path='/signup' component ={signup} />
        <Route exact path='/dashboard' component ={dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
