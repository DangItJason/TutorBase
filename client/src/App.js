import React from "react";
import login from "./components/Login";
import signup from "./components/Signup";
import ClientDashboard from "./components/dashboard/client/ClientDashboard";
import TutorDashboard from "./components/dashboard/tutor/TutorDashboard";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import withAuth from "./components/withAuth";

function App() {
  return (
    <ToastProvider
      placement="top-right"
      autoDismissTimeout="3000"
      autoDismiss="true"
    >
      <Router>
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/login" component={login} />
          <Route exact path="/signup" component={signup} />
          <Route exact path="/home" component={ClientDashboard} />
          <Route exact path="/tutor" component={TutorDashboard}></Route>
          <Route
            exact
            path="/tutor/preferences"
            render={(props) => (
              <TutorDashboard
                {...props}
                extension="preferences"
              ></TutorDashboard>
            )}
          ></Route>
          <Route
            exact
            path="/tutor/settings"
            render={(props) => (
              <TutorDashboard {...props} extension="settings"></TutorDashboard>
            )}
          ></Route>
          <Route
            exact
            path="/tutor/history"
            render={(props) => (
              <TutorDashboard {...props} extension="history"></TutorDashboard>
            )}
          ></Route>
          <Route
            exact
            path="/tutor/analytics"
            render={(props) => (
              <TutorDashboard {...props} extension="analytics"></TutorDashboard>
            )}
          ></Route>
          <Route
            exact
            path="/tutor/meetings"
            render={(props) => (
              <TutorDashboard {...props} extension="meetings"></TutorDashboard>
            )}
          ></Route>
          <Route
            exact
            path="/tutor/schedule"
            render={(props) => (
              <TutorDashboard {...props} extension="schedule"></TutorDashboard>
            )}
          ></Route>
        </Switch>
      </Router>
    </ToastProvider>
  );
}

export default App;
