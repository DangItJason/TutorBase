import React, { Component } from "react";
import classNames from "classnames";
import { Navbar, Button } from "reactstrap";
import Settings from "../../../components/tutorComponents/Settings";
import Analytics from "../../../components/tutorComponents/data";
import TutorDashboard from "./TutorDashboard";
import { useDispatch, useSelector } from "react-redux";
import { selectSidebarToggled } from "../../../store/ClientFlowData/selectors";
import { actions } from "../../../store/ClientFlowData/slice";
import { useParams } from "react-router-dom";

interface IProps {}

interface IParams {
    panelContent: string;
}

export const Panel = (props: IProps) => {
    let dispatch = useDispatch();
    let sidebarToggled = useSelector(selectSidebarToggled);

    const params: IParams = useParams();
    const extension: string = params.panelContent;
    console.log(extension)
    console.log('hello')
    return (
        <div id="panel-wrapper">
            <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                <Button className="btn-red" id="menu-toggle" onClick={() => {
                    dispatch(actions.toggleSidebar());
                }}>☰</Button>
            </Navbar>
            {/* <div class="container-fluid">
                <h2 className={classNames("mt-4", "hr")}>Tutor Dashboard</h2>
            </div>

            <div class="container-fluid">
                <h5 className={classNames("mt-4", "hr")}>Courses</h5>
                <p>This is where the tutor will be able to add or drop classes they are tutoring for.</p>
                <Button variant="danger">Add New Course</Button>
                <Button variant="danger">Drop Course</Button>

            </div> */}
            {extension === "schedule" ? <Settings></Settings> : null}
            {extension === "meetings" ? <div>Hello World(Meetings)</div> : null}
            {extension === "history" ? <div>Hello World(History)</div> : null}
            {extension === "analytics" ? <Analytics></Analytics> : null}
            {extension === "settings" ? <Settings></Settings> : null}

        </div>
    );
}

export default Panel;
