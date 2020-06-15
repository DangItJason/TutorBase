import React, { Component } from "react";
import Sidebar from "./Sidebar"
import Panel from "./Panel"

class ClientDashboard extends Component {
    render() {
        return (
            <div className="ClientDashboard">
                <Sidebar />
                <Panel />
            </div>
        );
    }
}

export default ClientDashboard;