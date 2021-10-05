import React from "react";
import classNames from "classnames";
import {Button, Navbar} from "reactstrap";
import {FormParent} from "../../../components/clientFlow/FormParent";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../store/ClientFlowData/slice";
import {selectSidebarToggled} from "../../../store/ClientFlowData/selectors";
import { useParams } from "react-router-dom";
import { Meetings } from "./Meetings";

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

    return (
        <div id="panel-wrapper">
            <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                <Button className="btn-red" id="menu-toggle" onClick={() => {
                    dispatch(actions.toggleSidebar());
                }}>☰</Button>
            </Navbar>
            <div className="container-fluid">{body}</div>
        </div>
    );
}

export default Panel;