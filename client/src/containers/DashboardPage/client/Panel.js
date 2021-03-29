import React, { Component } from "react";
import classNames from "classnames";
import { Navbar, Button } from "reactstrap";
import FormParent from "../../../components/clientFlow/FormParent";
import {connect} from "react-redux";
import {actions} from "../../../store/clientFlowData";

class Panel extends Component {
    render() {
        return (
            <div id="panel-wrapper">
                <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                    <Button className="btn-red" id="menu-toggle" onClick={() => {this.props.toggleSidebar()}}>☰</Button>
                </Navbar>
                <div class="container-fluid">
                    <FormParent />
                </div>
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
