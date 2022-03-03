import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {PrivateRoute} from "./components/authComponents/PrivateRoute";
import Dashboard from "./containers/DashboardPage/Dashboard";
import {ToastProvider} from "react-toast-notifications";
import {LoginPage} from "./containers/LoginPage/LoginPage";
import {LandingPage} from "./containers/LandingPage/LandingPage";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <LandingPage/>
                </Route>
                <Route exact path="/login">
                    <LoginPage/>
                </Route>
                <PrivateRoute exact path="/tutor/" >
                    <Dashboard mode="Tutor"/>
                </PrivateRoute>
                <PrivateRoute exact path="/tutor/*" >
                    <Dashboard mode="Tutor"/>
                </PrivateRoute>
                <PrivateRoute exact path="/home/" >
                    <Dashboard mode="Client"/>
                </PrivateRoute>
                <PrivateRoute exact path="/home/*" >
                    <Dashboard mode="Client"/>
                </PrivateRoute>
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
