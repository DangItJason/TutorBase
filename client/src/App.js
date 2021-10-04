import React, {useState} from "react";
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
    const [session, setSession] = useState({authenticated:false});
    const useSession = {session:session,setSession:setSession };
    console.log(session);


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
                    <Route exact path="/home/:panelContent?" component={withAuth(ClientDashboard,useSession)} />
                    <Route exact path="/tutor" component={withAuth(TutorDashboard,useSession)} />
                    <Route
                        exact
                        path="/tutor/preferences"
                        render={(props) => withAuth(
                            <TutorDashboard
                                {...props}
                                extension="preferences"
                            />,useSession
                        )}
                    />
                    <Route
                        exact
                        path="/tutor/settings"
                        render={(props) => withAuth(
                            <TutorDashboard {...props} extension="settings" />,useSession
                        )}
                    />
                    <Route
                        exact
                        path="/tutor/history"
                        render={(props) => withAuth(
                            <TutorDashboard {...props} extension="history" />,useSession
                        )}
                    />
                    <Route
                        exact
                        path="/tutor/analytics"
                        render={(props) => withAuth(
                            <TutorDashboard {...props} extension="analytics" />,useSession
                        )}
                    />
                    <Route
                        exact
                        path="/tutor/meetings"
                        render={(props) => withAuth(
                            <TutorDashboard {...props} extension="meetings" />,useSession
                        )}
                    />
                    <Route
                        exact
                        path="/tutor/schedule"
                        render={(props) => withAuth(
                            <TutorDashboard {...props} extension="schedule" />,useSession
                        )}
                    />
                </Switch>
            </Router>
        </ToastProvider >
    );
}

export default App;
