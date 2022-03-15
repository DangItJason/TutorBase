import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import TutorPanel from "./TutorPanel";
import ClientPanel from "./ClientPanel";
import { actions as clientDataActions } from "../../store/ClientData/slice";
import { selectClientData } from "../../store/ClientData/selectors";
import {useDispatch, useSelector} from 'react-redux'
import {selectSidebarToggled} from "../../store/ClientFlowData/selectors";
import TutorPanelBlank from "./TutorPanelSignup";
import { api } from "../../services/api";
import { Spinner } from "reactstrap";
import TutorPanelSignup from "./TutorPanelSignup";

export interface IParams {
    mode: string; // tutor or client
}

const Dashboard = (params: IParams) => {
    let dispatch = useDispatch();
    let sidebarToggled = useSelector(selectSidebarToggled);
    let clientData = useSelector(selectClientData);
    const [loading, setLoading] = useState(true);
    const [isTutor, setIsTutor] = useState(false);
    useEffect(() => {
        const getTutor = async () => {
            return (await api.GetTutorById(clientData.clientId)).data[0];
        }
        getTutor().then(value => {
            setIsTutor(value !== null);
            dispatch(clientDataActions.setIsTutor((value !== null)));
            
        setLoading(false);
        }).catch(err => {
            
        setLoading(false);
        });
    });
    return (
        <div className={classNames("d-flex", (sidebarToggled) ? "toggled" : "")} id="dashboard-wrapper" style={{maxWidth:'100vw'}}>
            <Sidebar 
                mode={params.mode}
                isTutor = {isTutor}/>
            {params.mode === "Tutor" ? (isTutor ? <TutorPanel/> : <TutorPanelSignup isLoading={loading}/>) : <ClientPanel/>}
        </div>
    );
}

export default Dashboard;
