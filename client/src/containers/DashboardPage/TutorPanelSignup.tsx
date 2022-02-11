import React, { Component } from "react";
import classNames from "classnames";
import { Navbar, Button, Container, Row, Spinner } from "reactstrap";
import Settings from "../../components/tutorComponents/settings";
import Analytics from "../../components/tutorComponents/data";
import { TutorHistory } from "./TutorHistory";
import { Meetings } from "./Meetings";
import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { selectSidebarToggled } from "../../store/ClientFlowData/selectors";
import { actions } from "../../store/ClientFlowData/slice";
import { useLocation, useParams } from "react-router-dom";
import DataVisualization from "../../components/tutorComponents/DataVisualization/DataVisualization";

interface IProps {
    isLoading: boolean;
}

export const Panel = (props: IProps) => {
    let dispatch = useDispatch();
    let sidebarToggled = useSelector(selectSidebarToggled);

    let params : string = useLocation().pathname;
    let extension:string = params.split('/')[2];

    return (
        <div id="panel-wrapper">
            <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                <Button className="btn-red" id="menu-toggle" onClick={() => {
                    dispatch(actions.toggleSidebar());
                }}>☰</Button>
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
            <Container fluid className="background" style={{marginBottom:'10em'}}>
        <hr></hr>
        <Row xs="2" className="parent">

        </Row>
        <div style={{display:'flex', flexDirection:'column', flexWrap:'wrap', alignContent:'center'}}>
        {props.isLoading ? (<div style={{display:'flex', flexDirection:'row', flex:'1 1 0px', flexWrap:'wrap', justifyContent:'center', marginTop:'10em'}}>
        <Spinner style={{color:'#E66064'}}></Spinner></div>) 
        : (
            <div>
        <div style={{display:'flex', flexDirection:'row', flex:'1 1 0px', flexWrap:'wrap', justifyContent:'center', marginTop:'10em'}}>
            <h5>You are not currently signed up as a tutor. This dashboard is for tutors only. You can apply to be a TutorBase tutor below!
            </h5></div>
            
            <div style={{display:'flex', flexDirection:'row', flex:'1 1 0px', flexWrap:'wrap', justifyContent:'center', marginTop:'1em'}}>
            <Button className="btn-red" style={{height:'4em', width:'10em', borderRadius:'20em'}}>
                Sign up as tutor
                </Button>
            </div>
            </div>)}
</div>
</Container>
        </div>
    );
}

export default Panel;
