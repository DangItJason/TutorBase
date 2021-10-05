import React, { Component,useState,useEffect } from "react";
import classNames from "classnames";
import { ListGroup, ListGroupItem } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom';
import { faAddressBook, faCalendar, faHistory, faCog, faRandom, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export const  Sidebar =() =>  {

        const [redirectlink,setRedirect] = useState('');









        if(redirectlink){
            
            return <Redirect to={{pathname:redirectlink }} />;
        }


        
        return (
            <div className={classNames("bg-none", "border-right")} id="sidebar-wrapper">
                <div className="sidebar-heading">TutorBase</div>
                <ListGroup>
                    <ListGroupItem onClick={()=> {setRedirect('/home') }}  className={classNames("list-group-item", "bg-none", "tab-active")}><FontAwesomeIcon icon={faAddressBook} />Schedule a Session</ListGroupItem>
                    <ListGroupItem onClick={()=> {setRedirect('/home/meetings') }} className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faCalendar} />Upcoming Meetings</ListGroupItem>
                    <ListGroupItem onClick={()=> {setRedirect('/home/history') }} className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faHistory} />History</ListGroupItem>
                    <ListGroupItem onClick={()=> {setRedirect('/home/settings') }} className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faCog} />Settings</ListGroupItem>
                </ListGroup>
                <ListGroup className="list-group-bottom">
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faRandom} />Switch Dashboard</ListGroupItem>
                    <ListGroupItem tag="a" href="#" className={classNames("list-group-item", "bg-none")}><FontAwesomeIcon icon={faSignOutAlt} />Logout</ListGroupItem>
                </ListGroup>
            </div>
        );
}

export default Sidebar;
