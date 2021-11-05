import React from "react";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import TutorPanel from "./TutorPanel";
import ClientPanel from "./ClientPanel";
import {useSelector} from 'react-redux'
import {selectSidebarToggled} from "../../store/ClientFlowData/selectors";

export interface IParams {
    mode: string; // tutor or client
}

const Dashboard = (params: IParams) => {
    let sidebarToggled = useSelector(selectSidebarToggled);

    return (
        <div className={classNames("d-flex", (sidebarToggled) ? "toggled" : "")} id="dashboard-wrapper">
            <Sidebar mode={params.mode}/>
            {params.mode === "Tutor" ? <TutorPanel/> : <ClientPanel/>}
        </div>
    );
}

export default Dashboard;
