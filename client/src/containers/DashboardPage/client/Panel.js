import React, { Component } from "react";
import classNames from "classnames";
import { Navbar, Button } from "reactstrap";
import FormParent from "../../../components/clientFlow/FormParent";
import {connect} from "react-redux";
import { actions } from "../../../store/clientFlowData";
import Meetings from './meetings';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';


export default function Panel(props) {
    const dispatch = useDispatch();
    let { meetings } = useParams();

    let body = <FormParent />;
    if (meetings) {
        body = <Meetings />;
    }

    return (
        <div id="panel-wrapper">
            <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                <Button className="btn-red" id="menu-toggle" onClick={() => {dispatch(actions.toggleSidebar())}}>☰</Button>
            </Navbar>
            {body}
        </div>
    );
}
