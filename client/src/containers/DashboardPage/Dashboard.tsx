import React from "react";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import TutorPanel from "./TutorPanel";
import ClientPanel from "./ClientPanel";
import {useSelector} from 'react-redux'
import {selectSidebarToggled} from "../../store/ClientFlowData/selectors";
import { selectClientData } from "../../store/ClientData/selectors";
import TutorPanelBlank from "./TutorPanelBlank";

export interface IParams {
    mode: string; // tutor or client
}

const Dashboard = (params: IParams) => {
    let sidebarToggled = useSelector(selectSidebarToggled);
    let isClient = useSelector(selectClientData);
    
    return (
        <div className={classNames("d-flex", (sidebarToggled) ? "toggled" : "")} id="dashboard-wrapper" style={{maxWidth:'100vw'}}>
            <Sidebar 
                mode={params.mode}
                isTutor = {isClient.isTutor}/>
            {params.mode === "Tutor" ? (isClient.isTutor ? <TutorPanel/> : <TutorPanelBlank />) : <ClientPanel/>}
        </div>
    );
}

export default Dashboard;
