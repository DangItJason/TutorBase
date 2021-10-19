import React from "react";
import {SignUpPage} from "./containers/SignUpPage/SignupPage";
import ClientDashboard from "./containers/DashboardPage/client/ClientDashboard";
import TutorDashboard from "./containers/DashboardPage/tutor/TutorDashboard";
import {ToastProvider} from "react-toast-notifications";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {LoginPage} from "./containers/LoginPage/LoginPage";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <LoginPage/>
                </Route>
                <Route exact path="/login">
                    <LoginPage/>
                </Route>
                <Route exact path="/signup">
                    <SignUpPage/>
                </Route>
                <Route exact path="/tutor" >
                    <TutorDashboard />
                </Route>
                <Route exact path="/home" >
                    <ClientDashboard />
                </Route>
            </Switch>
            {/*<ToastProvider*/}
            {/*    placement="top-right"*/}
            {/*    autoDismissTimeout={3000}*/}
            {/*    autoDismiss={true}*/}
            {/*>*/}
            {/*</ToastProvider>*/}
        </BrowserRouter>
    );
}

export default App;
