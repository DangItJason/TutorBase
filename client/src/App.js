import React from 'react';
import login from './components/Login';
import signup from './components/signup';
import ClientDashboard from './components/dashboard/client/ClientDashboard';
import { ToastProvider, useToasts } from 'react-toast-notifications'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <ToastProvider placement = 'top-right' autoDismissTimeout = '3000' autoDismiss = 'true'>
      <Router>
        <Switch>
          <Route exact path='/' component ={login} />
          <Route exact path='/login' component={login} />
          <Route exact path='/signup' component={signup} />
          <Route exact path='/clientDashboard' component={ClientDashboard} />
        </Switch>
      </Router>
    </ToastProvider>
  );
}

export default App;
