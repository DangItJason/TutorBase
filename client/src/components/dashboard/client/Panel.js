import React, { Component } from "react";
import classNames from "classnames";
import { Navbar, Button, Form } from "reactstrap";
import FormParent from "../../clientFlow/FormParent";
import Meetings from "./meetings";
import {connect} from "react-redux";
import {actions} from "../../../store/clientFlowData";

class Panel extends Component {
    render() {
        return (
            <div id="panel-wrapper">
                <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                    <Button className="btn-red" id="menu-toggle" onClick={() => {this.props.toggleSidebar()}}>☰</Button>
                </Navbar>
                {this.props.extension === "form" ? <FormParent></FormParent> : null}
                {this.props.extension === "meetings" ? <Meetings></Meetings>  : null}
                {/* <Meetings></Meetings> */}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSidebar: (state) => dispatch(actions.toggleSidebar(state))
    }
}

export default connect(null, mapDispatchToProps)(Panel);
