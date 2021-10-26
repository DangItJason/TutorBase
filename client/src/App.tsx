import React from "react";
import {SignUpPage} from "./containers/SignUpPage/SignupPage";
import Dashboard from "./containers/DashboardPage/Dashboard";
import {ToastProvider} from "react-toast-notifications";
import {BrowserRouter, Route, Switch, useLocation} from "react-router-dom";
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
                <Route exact path="/tutor/" >
                    <Dashboard mode="Tutor"/>
                </Route>
                <Route exact path="/home/" >
                    <Dashboard mode="Client"/>
                </Route>
                <Route exact path="/home/*" >
                    <Dashboard mode="Client"/>
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
