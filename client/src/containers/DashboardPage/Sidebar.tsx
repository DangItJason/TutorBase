import React, { useState } from "react";
import classNames from "classnames";
import {ListGroup, ListGroupItem} from "reactstrap"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faAddressBook,
    faCalendar,
    faChartArea,
    faCog,
    faHistory,
    faSignOutAlt,
    faToggleOff,
    faToggleOn,
    faUserClock
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
// @ts-ignore
import useMediaQuery from 'use-media-query-hook';
import {isMobile} from "react-device-detect";

export interface IParams {
    mode: string; // tutor or client menu currently viewed
    isTutor: boolean; // tutor menu allowed to be accessed
}

export const Sidebar = (params: IParams) => {
    let dispatch = useDispatch();
    let param : string = useLocation().pathname;
    let extension:string = param.split('/')[2];
    return (
        <div className={classNames("bg-none", "border-right")} id="sidebar-wrapper">
            <div className="sidebar-heading" style={{position: "fixed"}}>TutorBase</div>
            <ListGroup>
                {params.mode === "Tutor"
                    ? ( params.isTutor ? (
                        <div style={{position: "fixed", top: '50px'}}>
                            <ListGroupItem tag="a" href="/tutor/overview"
                                           className={classNames("list-group-item", "bg-none", extension==='overview' ?"tab-active" : null)}><FontAwesomeIcon
                                icon={faUserClock}/>Overview</ListGroupItem>
                            <ListGroupItem tag="a" href="/tutor/meetings"
                                           className={classNames("list-group-item", "bg-none", extension==='meetings' ?"tab-active" : null)}><FontAwesomeIcon
                                icon={faCalendar}/>Upcoming Meetings</ListGroupItem>
                            <ListGroupItem tag="a" href="/tutor/history"
                                           className={classNames("list-group-item", "bg-none", extension==='history' ?"tab-active" : null)}><FontAwesomeIcon
                                icon={faHistory}/>History</ListGroupItem>
                            <ListGroupItem tag="a" href="/tutor/analytics"
                                           className={classNames("list-group-item", "bg-none", extension==='analytics' ?"tab-active" : null)}><FontAwesomeIcon
                                icon={faChartArea}/>Analytics</ListGroupItem>
                            <ListGroupItem tag="a" href="/tutor/settings"
                                           className={classNames("list-group-item", "bg-none", extension==='settings' ?"tab-active" : null)}><FontAwesomeIcon
                                icon={faCog}/>Settings</ListGroupItem>
                            {isMobile ?
                                <div>
                                <ListGroupItem tag="a" href="/home/schedule" className={classNames("list-group-item", "bg-none")} style={{marginTop:'20rem'}}>
                                    <FontAwesomeIcon icon={faToggleOn}/>
                                    Switch to Client Dashboard
                                </ListGroupItem>
                                <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}>
                                    <FontAwesomeIcon icon={faSignOutAlt}/>
                                    Logout
                                </ListGroupItem>
                                </div>

                            : null}
                        </div>
                    )
                    :
                    <div></div>
                    )
                    : (
                        <div style={{position: "fixed", top: '50px'}}>
                            <ListGroupItem tag="a" href="/home/schedule"
                                           className={classNames("list-group-item", "bg-none", extension==='schedule' ?"tab-active" : null)}><FontAwesomeIcon
                                icon={faAddressBook}/>Schedule a Session</ListGroupItem>
                            <ListGroupItem tag="a" href="/home/meetings"
                                           className={classNames("list-group-item", "bg-none", extension==='meetings' ?"tab-active" : null)}><FontAwesomeIcon
                                icon={faCalendar}/>Upcoming Meetings</ListGroupItem>
                            <ListGroupItem tag="a" href="/home/history"
                                           className={classNames("list-group-item", "bg-none", extension==='history' ?"tab-active" : null)}><FontAwesomeIcon
                                icon={faHistory}/>History</ListGroupItem>
                            <ListGroupItem tag="a" href="/home/settings"
                                           className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon
                                icon={faCog}/>Settings</ListGroupItem>
                            {isMobile ?
                                <div>
                                <ListGroupItem tag="a" href="/tutor/meetings" className={classNames("list-group-item", "bg-none")} style={{marginTop:'20rem'}}>
                                    <FontAwesomeIcon icon={faToggleOff}/>
                                    Switch to Tutor Dashboard
                                </ListGroupItem>
                                <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}>
                                    <FontAwesomeIcon icon={faSignOutAlt}/>
                                    Logout
                                </ListGroupItem>
                                </div>

                            : null}
                        </div>
                    )}
            </ListGroup>
            {isMobile ? null 
            :<ListGroup className="list-group-bottom">
                {params.mode === "Tutor"
                    ? (
                        <div>
                            <ListGroupItem tag="a" href="/home/schedule" className={classNames("list-group-item", "bg-none")}>
                                <FontAwesomeIcon icon={faToggleOn}/>
                                Switch to Client Dashboard
                            </ListGroupItem>
                        </div>
                    ) :
                    (
                        <div>
                            <ListGroupItem tag="a" href="/tutor/overview" className={classNames("list-group-item", "bg-none")}>
                                <FontAwesomeIcon icon={faToggleOff}/>
                                Switch to Tutor Dashboard
                            </ListGroupItem>
                        </div>
                    )
                }


                <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}>
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                    Logout
                </ListGroupItem>
            </ListGroup>
            }
        </div>
    );
}

export default Sidebar;
