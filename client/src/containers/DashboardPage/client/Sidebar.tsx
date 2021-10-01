import React, { Component } from "react";
import classNames from "classnames";
import { ListGroup, ListGroupItem } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faCalendar, faHistory, faCog, faRandom, faSignOutAlt, faChartPie } from '@fortawesome/free-solid-svg-icons'

export const  Sidebar =() =>  {
        return (
            <div className={classNames("bg-none", "border-right")} id="sidebar-wrapper">
                <div className="sidebar-heading">TutorBase</div>
                <ListGroup>
                    <ListGroupItem tag="a" href="/home" className={classNames("list-group-item", "bg-none", "tab-active")}><FontAwesomeIcon icon={faAddressBook} />Schedule a Session</ListGroupItem>
                    <ListGroupItem tag="a" href="/home/meetings" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faCalendar} />Upcoming Meetings</ListGroupItem>
                    <ListGroupItem tag="a" href="/home/datavisualization" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faChartPie} />Data</ListGroupItem>
                    
                    {/* <ListGroupItem tag="a" href="/home/history" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faHistory} />History</ListGroupItem>
                    <ListGroupItem tag="a" href="/home/settings" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faCog} />Settings</ListGroupItem> */}
                </ListGroup>
                <ListGroup className="list-group-bottom">
                    {/* <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faRandom} />Switch Dashboard</ListGroupItem> */}
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faSignOutAlt} />Logout</ListGroupItem>
                </ListGroup>
            </div>
        );
}

export default Sidebar;
