import React, { Component, useEffect, useState } from "react";
import classNames from "classnames";
import { Navbar, Button, Container, Row, Spinner, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Badge, Card, CardBody, Input } from "reactstrap";
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
import { cp } from "fs";
import { checkServerIdentity } from "tls";
import { selectClientData } from "../../store/ClientData/selectors";
interface IProps {
    isLoading: boolean;
}

export function SelectedSubjectsHandler(selectedSubjects:Set<string>, subName:string) : Set<string> {

    selectedSubjects.has(subName)
                    ? selectedSubjects.delete(subName)
                    : selectedSubjects.add(subName);
    return new Set<string>(selectedSubjects);
}

export const Panel = (props: IProps) => {
    let dispatch = useDispatch();
    let id = useSelector(selectClientData).clientId;
    const [modalOpen, setModalOpen] = useState(false);
    let params : string = useLocation().pathname;
    const [selectedSubjects, setSelectedSubjects] = useState(new Set<string>());
    const [RIN, setRIN] = useState("");
    const [validRIN, setValidRIN] = useState(false);
    const [cohort, setCohort] = useState("");
    const [comments, setComments] = useState("");
    const [footerMessage, setFooterMessage] = useState("");
    const [rate, setRate] = useState(0);
    let subjects = [];
    let selectedSubjectsOutput = [];
    const [subjectsList, setSubjectsList] = useState(new Array<Subject>());
    function checkRIN(value: string) {
        if (value.length !== 9) {
            setValidRIN(false);
        }
        else {
            setValidRIN(true); 
        }
        setRIN(value);

    }
    function submit() {
        if (!validRIN
            || cohort === ""
            || cohort === "Select"
            || selectedSubjects.size === 0) {
                setFooterMessage("Please complete required fields.");
                return;
        }
        let subs: Array<String> = Array.from(selectedSubjects.keys());
        api.TutorSignup(id, RIN, subs, comments, rate).then(res =>{
            res ?
            setFooterMessage("Application submitted.")
            : setFooterMessage("Error submitting. Please try again.");
            }).catch(err => {
                setFooterMessage("Error submitting. Please try again.")
            });
    }
    
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
        subjects.push(
            (<Button
                style={{background: color}}
                onClick={() => setSelectedSubjects(SelectedSubjectsHandler(selectedSubjects, name))}
            >
                {name}
            </Button>
            )
            );
    }
    let selectedSubs:Array<string> = Array.from(selectedSubjects.keys());
    for (let i = 0; i < selectedSubs.length; i++) {
        let name: string = selectedSubs[i];
        let color = SubjectToColor(name);
        selectedSubjectsOutput.push(
            (
               
                    <Badge
                    style={{
                        backgroundColor: color,
                        cursor:'default',
                        color: "black",
                        minWidth: '6em',
                        display: "flex",
                        flexDirection:'row',
                        alignItems: 'center',
                        marginRight: '0.5em'
                    }}
                    pill
                >
                    <div style={{
                        display: "flex",
                        flex: '50%',
                    }}>
                        {name + ' '}
                    </div> 
                    <Button 
                    close 
                    style={{
                        display: "flex",
                        flex: '50%',
                        alignItems: 'center'
                    }}
                    onClick={() => setSelectedSubjects(SelectedSubjectsHandler(selectedSubjects, name))} /> 
                    
                </Badge>
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
                                <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                                    Tutor Application Form
                                </ModalHeader>
                                <ModalBody>
                                <h5>RIN</h5>
                                <Input 
                                    defaultValue={RIN}
                                    onChange={(e) => checkRIN(e.target.value)}
                                    valid={validRIN}
                                    invalid={!validRIN}
                                    />
                                <p />
                                <h5>Cohort</h5>
                                <Input 
                                type="select"
                                    onChange={(e) => setCohort(e.target.value)}
                                    initialValue="Select"
                                    invalid={cohort === "" || cohort === "Select"}>
                                        <option>
                                        Select
                                    </option>
                                    <option>
                                        Freshman
                                    </option>
                                    <option>
                                        Sophomore
                                    </option>
                                    <option>
                                        Junior
                                    </option>
                                    <option>
                                        Senior
                                    </option>
                                    <option>
                                        Graduate
                                    </option>
                                    </Input>
                                <p />
                                <h5>Select Subjects to tutor</h5>
                                <ButtonGroup>
                                    {subjects}
                                    
                                </ButtonGroup>
                                <p>
                                    Selected:
                                    <Card
                                    outline={selectedSubjects.size === 0}
                                    color= {selectedSubjects.size === 0 ? "danger" : ""}>
                                <CardBody 
                                    style={{
                                        display: "flex",
                                        background: "lightgray",
                                        minHeight: "4em",
                                        flexWrap: 'wrap'
                                    }}>
                                {selectedSubjectsOutput}


                            </CardBody></Card>
                            </p>
                            <p>
                                <h5>Hourly Rate ($) (optional)</h5>
                                <Input
                                type="number"
                                    onChange={(e) => setRate(+(e.target.value))} />
                                </p>
                                <h5>Comments (optional)</h5>
                                <Input 
                                    type="textarea"
                                    onChange={(e) => setComments(e.target.value)} />

                                </ModalBody>
                                <ModalFooter>
                                <p style={{color: footerMessage === "Application submitted." ? 'green' : 'red'}}>
                                    {footerMessage}
                                </p>

                                <Button
                                    color="primary"
                                    onClick={() => submit()}
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
