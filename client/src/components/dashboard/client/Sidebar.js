import React, { Component } from "react";
import classNames from "classnames";
import { ListGroup, ListGroupItem } from "reactstrap"

class Sidebar extends Component {
    render() {
        return (
            <div className={classNames("bg-none", "border-right")} id="sidebar-wrapper">
                <div class="sidebar-heading">TutorBase</div>
                <ListGroup>
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}>Settings</ListGroupItem>
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}>History</ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

export default Sidebar;