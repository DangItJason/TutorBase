import React, { Component } from "react";
import classNames from "classnames";
import { ListGroup, ListGroupItem } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faCalendar, faHistory, faCog, faRandom, faSignOutAlt, faUserClock, faChartArea, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
export interface IParams {
    mode: string; // tutor or client
}
export const  Sidebar =(params:IParams) =>  {
        return (
            <div className={classNames("bg-none", "border-right")} id="sidebar-wrapper">
                <div className="sidebar-heading">TutorBase</div>
                <ListGroup>
                {params.mode === "Tutor" ? (
                    <div>
                    <ListGroupItem tag="a" href="/tutor/preferences" className={classNames("list-group-item", "bg-none", "tab-active")}><FontAwesomeIcon icon={faUserClock} />Schedule Preferences</ListGroupItem>
                    <ListGroupItem tag="a" href="/tutor/meetings" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faCalendar} />Upcoming Meetings</ListGroupItem>
                    <ListGroupItem tag="a" href="/tutor/history" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faHistory} />History</ListGroupItem>
                    <ListGroupItem tag="a" href="/tutor/analytics" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faChartArea} />Analytics</ListGroupItem>
                    <ListGroupItem tag="a" href="/tutor/settings" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faCog} />Settings</ListGroupItem>
                    </div>) :
                    (<div><ListGroupItem tag="a" href="/home" className={classNames("list-group-item", "bg-none", "tab-active")}><FontAwesomeIcon icon={faAddressBook} />Schedule a Session</ListGroupItem>
                    <ListGroupItem tag="a" href="/home/meetings" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faCalendar} />Upcoming Meetings</ListGroupItem>
                    </div>)}
                </ListGroup>
                <ListGroup className="list-group-bottom">
                {params.mode === "Tutor" ? (
                    <div>
                    <ListGroupItem tag="a" href="/home" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faToggleOn} />Switch to Client Dashboard</ListGroupItem>
                </div>) :
                    (<div>   <ListGroupItem tag="a" href="/tutor" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faToggleOff} />Switch to Tutor Dashboard</ListGroupItem>
                    </div>)}
                    {/* <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faRandom} />Switch Dashboard</ListGroupItem> */}
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faSignOutAlt} />Logout</ListGroupItem>
                </ListGroup>
            </div>
        );
}

export default Sidebar;
