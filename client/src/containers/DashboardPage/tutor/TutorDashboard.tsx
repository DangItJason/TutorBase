import React, { useState } from "react";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import Panel from "./Panel";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../dashboard.css';
import { useSelector } from "react-redux";
import { selectSidebarToggled } from "../../../store/ClientFlowData/selectors";

const  TutorDashboard = () => {
    let sidebarToggled = useSelector(selectSidebarToggled);

    return (
        <div className={classNames("d-flex", (sidebarToggled) ? "toggled":"")} id="dashboard-wrapper">
            <Sidebar />
            <Panel /> 
        </div>
    );
}

export default TutorDashboard;