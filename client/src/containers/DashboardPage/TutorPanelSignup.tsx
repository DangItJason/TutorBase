import React, { Component, useEffect, useState } from "react";
import classNames from "classnames";
import { Navbar, Button, Container, Row, Spinner, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from "reactstrap";
import Settings from "../../components/tutorComponents/settings";
import Analytics from "../../components/tutorComponents/data";
import { TutorHistory } from "./TutorHistory";
import { Meetings } from "./Meetings";
import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { selectClientFlowData, selectSidebarToggled } from "../../store/ClientFlowData/selectors";
import { actions } from "../../store/ClientFlowData/slice";
import { useLocation, useParams } from "react-router-dom";
import DataVisualization from "../../components/tutorComponents/DataVisualization/DataVisualization";
import { Subject } from '../../services/api.types'
import { api } from "../../services/api";
import { SubjectToColor } from "../../services/tools";
interface IProps {
    isLoading: boolean;
}



export const Panel = (props: IProps) => {
    let dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    let params : string = useLocation().pathname;
    let selectedSubjects = new Set<string>();
    let subjects = [];
    const [subjectsList, setSubjectsList] = useState(new Array<Subject>());
    useEffect(() => {
        // Get all avaliable subjects from API
        const getSubjects = async () => {
            return (await api.GetSubjects()).data;
        }

        getSubjects().then(value => {
                setSubjectsList(value);
            }
        )
    }, []);
    for (let i = 0; i < subjectsList.length; i++) {
        let name: string = subjectsList[i].id;
        let color = SubjectToColor(name);
        console.log(color);
        subjects.push(
            (<Button
                style={{background: {color}}}
                onClick={() => selectedSubjects.add(name)}
            >
                {name}
            </Button>
            )
            );
    }
    return (
        <div id="panel-wrapper">
            <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                <Button className="btn-red" id="menu-toggle" onClick={() => {
                    dispatch(actions.toggleSidebar());
                }}>☰</Button>
            </Navbar>

            <Container fluid className="background" style={{marginBottom:'10em'}}>
                <hr></hr>
                <Row xs="2" className="parent">

                </Row>
                <div style={{display:'flex', flexDirection:'column', flexWrap:'wrap', alignContent:'center'}}>
                    {props.isLoading ? (
                        <div style={{display:'flex', flexDirection:'row', flex:'1 1 0px', flexWrap:'wrap', justifyContent:'center', marginTop:'10em'}}>
                            <Spinner style={{color:'#E66064'}}></Spinner>
                        </div>) 
                    : (
                    <div>
                        <div style={{display:'flex', flexDirection:'row', flex:'1 1 0px', flexWrap:'wrap', justifyContent:'center', marginTop:'10em'}}>
                            <h5>You are not currently signed up as a tutor. This dashboard is for tutors only. You can apply to be a TutorBase tutor below!
                            </h5></div>
                            
                            <div style={{display:'flex', flexDirection:'row', flex:'1 1 0px', flexWrap:'wrap', justifyContent:'center', marginTop:'1em'}}>
                            <Button 
                                className="btn-red" 
                                style={{height:'4em', width:'10em', borderRadius:'20em'}}
                                onClick={() => setModalOpen(true)}
                            >
                                Sign up as tutor
                            </Button>
                            <Modal
                                centered={true}
                                scrollable={true}
                                isOpen={modalOpen}
                            >
                                <ModalHeader toggle={function noRefCheck(){}}>
                                    Tutor Signup
                                </ModalHeader>
                                <ModalBody>
                                <ButtonGroup>
                                    {subjects}
                                    
                                </ButtonGroup>
                                <p>
                                    Selected: [{selectedSubjects}]
                                </p>
                                
                                
                                </ModalBody>
                                <ModalFooter>
                                <Button
                                    color="primary"
                                    onClick={() => setModalOpen(true)}
                                >
                                    Submit
                                </Button>
                                {' '}
                                <Button onClick={() => setModalOpen(false)}>
                                    Cancel
                                </Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Panel;
