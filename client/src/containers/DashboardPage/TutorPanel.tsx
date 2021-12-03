import React, { Component } from "react";
import classNames from "classnames";
import { Navbar, Button } from "reactstrap";
import Settings from "../../components/tutorComponents/settings";
import Analytics from "../../components/tutorComponents/data";
import { TutorOverview } from "./TutorOverview";
import { TutorHistory } from "./TutorHistory";
import { Meetings } from "./Meetings";
import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { selectSidebarToggled } from "../../store/ClientFlowData/selectors";
import { actions } from "../../store/ClientFlowData/slice";
import { useLocation, useParams } from "react-router-dom";
import DataVisualization from "../../components/tutorComponents/DataVisualization/DataVisualization";

interface IProps {}

export const Panel = (props: IProps) => {
    let dispatch = useDispatch();
    let sidebarToggled = useSelector(selectSidebarToggled);

    let params : string = useLocation().pathname;
    let extension:string = params.split('/')[2];

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
            {extension === "overview" ? <TutorOverview></TutorOverview> : null}
            {extension === "meetings" ? <Meetings mode="Tutor"></Meetings> : null}
            {extension === "history" ? <TutorHistory></TutorHistory> : null}
            {extension === "analytics" ? <DataVisualization /> : null}
            {extension === "settings" ? <Settings></Settings> : null}

        </div>
    );
}

export default Panel;
