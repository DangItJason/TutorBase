import React, { Component } from "react";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import Panel from "./Panel";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../dashboard.css';
import {connect} from "react-redux";

// import cookies from "js-cookies";
// const secure = window.location.protocol === 'https'

import cookie from 'react-cookies'

class ClientDashboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        cookie.save('userId', 'jake', { path: '/cas/' })
        console.log(cookie.loadAll({domain: 'cas-auth.rpi.edu', path: '/cas/'}))

        return (
            <div className={classNames("d-flex", (this.props.sidebarToggled) ? "toggled":"")} id="dashboard-wrapper">
                <Sidebar />
                <Panel />
            </div>
        );
    }
}

function mapStateToProps(state){
    const { clientFlow } = state;
    return { sidebarToggled:  clientFlow.sidebarToggled}
}

export default connect(mapStateToProps)(ClientDashboard);
