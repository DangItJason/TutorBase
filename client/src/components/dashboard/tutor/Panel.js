import React, { Component } from "react";
import classNames from "classnames";
import { Navbar, Button } from "reactstrap"; 
import Settings from "../../tutorComponents/settings";
import TutorDashboard from "./TutorDashboard";

class Panel extends Component {


    render() {
        return (
            <div id="panel-wrapper">
                <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                    <Button className="btn-red" id="menu-toggle" onClick={this.props.action}>☰</Button>
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
                {this.props.extension === "schedule" ? <Settings></Settings> : null}
                {this.props.extension === "meetings" ? <div>Hello World(Meetings)</div> : null}
                {this.props.extension === "history" ? <div>Hello World(History)</div> : null}
                {this.props.extension === "analytics" ? <div>Hello World(Analytics)</div> : null}
                {this.props.extension === "settings" ? <Settings></Settings> : null}
                
            </div>
        );
    }
}

export default Panel;