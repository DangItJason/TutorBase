import React, { Component } from "react";
import classNames from "classnames";
import { ListGroup, ListGroupItem } from "reactstrap"

class Sidebar extends Component {
    render() {
        return (
            <div class="bg-red border-right" id="sidebar-wrapper">
                <div class="sidebar-heading">TutorBase</div>
                <ListGroup className="list-group-flush">
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-red", "list-group-item-action")}>Settings</ListGroupItem>
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-red", "list-group-item-action")}>History</ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

export default Sidebar;