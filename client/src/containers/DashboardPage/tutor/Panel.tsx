import React, { Component } from "react";
import classNames from "classnames";
import { Navbar, Button } from "reactstrap";
import TutorDashboard from "./TutorDashboard";
import { useDispatch, useSelector } from "react-redux";
import { selectSidebarToggled } from "../../../store/ClientFlowData/selectors";
import { actions } from "../../../store/ClientFlowData/slice";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import TutorSettings from "../../../components/tutorComponents/TutorSettings";

interface IParams {
    panelContent: string;
}

export const Panel = () => {
    let dispatch = useDispatch();
    let sidebarToggled = useSelector(selectSidebarToggled);

    const params: IParams = useParams();

    let body = (
        <div className="container-fluid">
            <h5 className={classNames("mt-4", "hr")}>Courses</h5>
            <p>This is where the tutor will be able to add or drop classes they are tutoring for.</p>
            <Button variant="danger">Add New Course</Button>
            <Button variant="danger">Drop Course</Button>
        </div>
    );

    if (params.panelContent === 'analytics')
        body = <TutorSettings />
    else if (params.panelContent === 'settings')
        body = <TutorSettings />

    return (
        <div id="panel-wrapper">
            <Helmet>
                <meta charSet="utf-8" />
                <title>TutorBase - Tutor Dashboard</title>
            </Helmet>

            <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                <Button className="btn-red" id="menu-toggle" onClick={() => {
                    dispatch(actions.toggleSidebar());
                }}>☰</Button>
            </Navbar>
            <div className="container-fluid">
                <h2 className={classNames("mt-4", "hr")}>Tutor Dashboard</h2>
            </div>

            <div className="container-fluid">{body}</div>
        </div>
    );
}

export default Panel;
