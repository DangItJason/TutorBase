import React from "react";
import classNames from "classnames";
import {Button, Navbar} from "reactstrap";
import {FormParent} from "../../../components/clientFlow/FormParent";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../store/ClientFlowData/slice";
import {selectSidebarToggled} from "../../../store/ClientFlowData/selectors";

export const Panel = () => {
    let dispatch = useDispatch();
    let sidebarToggled = useSelector(selectSidebarToggled);

    return (
        <div id="panel-wrapper">
            <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                <Button className="btn-red" id="menu-toggle" onClick={() => {
                    dispatch(actions.toggleSidebar(!sidebarToggled));
                }}>☰</Button>
            </Navbar>
            <div className="container-fluid">
                <FormParent/>
            </div>
        </div>
    );
}
