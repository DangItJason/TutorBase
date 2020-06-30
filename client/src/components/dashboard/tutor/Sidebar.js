import React, { Component } from "react";
import classNames from "classnames";
import { ListGroup, ListGroupItem } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserClock, faCalendar, faHistory, faCog, faChartArea, faRandom, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

class Sidebar extends Component {
    render() {
        return (
            <div className={classNames("bg-none", "border-right")} id="sidebar-wrapper">
                <div class="sidebar-heading">TutorBase</div>
                <ListGroup>
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none", "tab-active")}><FontAwesomeIcon icon={faUserClock} />Schedule Preferences</ListGroupItem>
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faCalendar} />Upcoming Meetings</ListGroupItem>
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faHistory} />History</ListGroupItem>
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faChartArea} />Analytics</ListGroupItem>
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faCog} />Settings</ListGroupItem>
                </ListGroup>
                <ListGroup className="list-group-bottom">
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faRandom} />Switch Dashboard</ListGroupItem>
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faSignOutAlt} />Logout</ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

export default Sidebar;
