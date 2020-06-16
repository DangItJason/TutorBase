import React, { Component } from "react";
import classNames from "classnames";
import { Navbar, Button } from "reactstrap"; 

class Panel extends Component {
    render() {
        return (
            <div id="panel-wrapper">
                <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom")}>
                    <Button className={classNames("bg-red", "btn-red")} id="menu-toggle" onClick={this.props.action}><span className="navbar-toggler-icon"></span></Button>
                </Navbar>
                <div class="container-fluid">
                    <h1 class="mt-4">Client Dashboard</h1>
                    <p>This is where the client will be able to schedule tutoring sessions.</p>
                </div>
            </div>
        );
    }
}

export default Panel;