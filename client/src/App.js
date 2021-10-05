import React from "react";
import { SignUpPage } from "./containers/SignUpPage/SignupPage";
import ClientDashboard from "./containers/DashboardPage/client/ClientDashboard";
import TutorDashboard from "./containers/DashboardPage/tutor/TutorDashboard";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import landing from "./containers/LandingPage/LandingPage";
import withAuth from "./components/authComponents/withAuth"
import notAuth from "./components/authComponents/notAuth"

function App() {


    return (
        <ToastProvider
            placement="top-right"
            autoDismissTimeout="3000"
            autoDismiss="true"
        >
            <Router>
                <Switch>
                    <Route exact path="/" component={landing} />
                    <Route exact path="/login" component={notAuth(LoginPage)} />
                    <Route exact path="/signup" component={notAuth(SignUpPage)} />
                    <Route exact path="/home/:panelContent?" component={withAuth(ClientDashboard)} />
                    <Route exact path="/tutor" component={withAuth(TutorDashboard)} />
                    <Route
                        exact
                        path="/tutor/preferences"
                        render={(props) => withAuth(
                            <TutorDashboard
                                {...props}
                                extension="preferences"
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/tutor/settings"
                        render={(props) => withAuth(
                            <TutorDashboard {...props} extension="settings" />
                        )}
                    />
                    <Route
                        exact
                        path="/tutor/history"
                        render={(props) => withAuth(
                            <TutorDashboard {...props} extension="history" />
                        )}
                    />
                    <Route
                        exact
                        path="/tutor/analytics"
                        render={(props) => withAuth(
                            <TutorDashboard {...props} extension="analytics" />
                        )}
                    />
                    <Route
                        exact
                        path="/tutor/meetings"
                        render={(props) => withAuth(
                            <TutorDashboard {...props} extension="meetings" />
                        )}
                    />
                    <Route
                        exact
                        path="/tutor/schedule"
                        render={(props) => withAuth(
                            <TutorDashboard {...props} extension="schedule" />
                        )}
                    />
                </Switch>
            </Router>
        </ToastProvider >
    );
}

export default App;
