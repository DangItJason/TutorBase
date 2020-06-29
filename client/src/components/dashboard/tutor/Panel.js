import React, { Component } from "react";
import classNames from "classnames";
import { Navbar, Button } from "reactstrap"; 

class Panel extends Component {
    render() {
        return (
            <div id="panel-wrapper">
                <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                    <Button className="btn-red" id="menu-toggle" onClick={this.props.action}>☰</Button>
                </Navbar>
                <div class="container-fluid">
                    <h2 className={classNames("mt-4", "hr")}>Tutor Dashboard</h2>
                    <p>This is where the tutor will be able to see their tutoring sessions.</p>
                </div>
            </div>
        );
    }
}

export default Panel;