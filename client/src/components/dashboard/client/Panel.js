import React, { Component } from "react";
import classNames from "classnames";
import { Navbar, Button } from "reactstrap";
import FormParent from "../../clientFlow/FormParent";
import {connect} from "react-redux";

class Panel extends Component {
    render() {
        return (
            <div id="panel-wrapper">
                <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                    <Button className="btn-red" id="menu-toggle" onClick={this.props.action}>☰</Button>
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
        toggleSidebar: () => dispatch({type: 'toggleSidebar'})
    }
}

export default connect(null, mapDispatchToProps)(Panel);
