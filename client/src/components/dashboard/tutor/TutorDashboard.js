import React, { Component } from "react";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import Panel from "./Panel";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../dashboard.css';

class TutorDashboard extends Component {
    constructor(props) {
        super(props)
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = { sidebarToggled: false };
    }

    toggleMenu = () => {
        this.setState({ sidebarToggled: !this.state.sidebarToggled })
    }

    render() {
        return (
            <div className={classNames("d-flex", (this.state.sidebarToggled) ? "toggled":"")} id="dashboard-wrapper">
                <Sidebar />
                <Panel action={this.toggleMenu} />
            </div>
        );
    }
}

export default TutorDashboard;