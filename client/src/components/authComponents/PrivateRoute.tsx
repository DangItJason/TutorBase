import React from "react";
import {Redirect, Route, useLocation} from "react-router-dom";

interface IProps {
    exact: boolean;
    path: string;
    children: any;
}

export function PrivateRoute({exact, path, children}: IProps) {
    const location = useLocation();
    const loggedIn: boolean = true;

    return (
        <Route exact={exact} path={path}>
            {loggedIn ? 
                (children) : 
                <Redirect  to={{pathname: '/login', state: { from: location }}}/>
            }
        </Route>
    );
}

