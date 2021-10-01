import React from "react";
import classNames from "classnames";
import {Button, Navbar} from "reactstrap";
import {FormParent} from "../../../components/clientFlow/FormParent";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../store/ClientFlowData/slice";
import {selectSidebarToggled} from "../../../store/ClientFlowData/selectors";
import { useParams } from "react-router-dom";
import Meetings from "./meetings";
import {Helmet} from 'react-helmet';
import DataVisualization from "../../../components/tutorComponents/DataVisualization";

interface IParams {
    panelContent: string;
}

export const Panel = () => {
    let dispatch = useDispatch();
    let sidebarToggled = useSelector(selectSidebarToggled);

    let params: IParams = useParams();
    console.log(params.panelContent)

    let body = <FormParent />;
    if (params.panelContent === 'meetings') {
        body = <Meetings />;
    }
    else if (params.panelContent === 'datavisualization') {
        body = <DataVisualization />;
    }

    return (
        <div id="panel-wrapper">
            <Helmet>
                <meta charSet="utf-8" />
                <title>TutorBase - Dashboard</title>
            </Helmet>

            <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                <Button className="btn-red" id="menu-toggle" onClick={() => {
                    dispatch(actions.toggleSidebar());
                }} style={{marginLeft: '0.5em'}}>
                    ☰
                </Button>

                {params.panelContent !== "meetings" && params.panelContent != "datavisualization" && (
                    <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <h2 className="text-center mt-4 fragment-title">
                            Schedule a Tutoring Session
                        </h2>
                    </div>
                )}
            </Navbar>

            <div className="container-fluid">{body}</div>
        </div>
    );
}

export default Panel;