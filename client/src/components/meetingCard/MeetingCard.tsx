import React, { useEffect, useState } from "react";
import "./MeetingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, UncontrolledAlert } from "reactstrap";
import {Appointment, Tutor, TutorsResponse, User, Feedback} from "../../services/api.types";
import { api } from "../../services/api";
import { BreakDownTime, CapitalizeFirstLetter, IsFutureDate } from "../../services/tools";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import styled, {keyframes} from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {actions as clientDataActions} from "../../store/ClientData/slice";
import {actions as tutorDataActions} from "../../store/TutorData/slice";
import moment from "moment";
import pypl from "../../assets/pypl.png";

interface IProps {
    appt: Appointment;
    isTutor: boolean;
    includePrevious: boolean;
    setDeleteAlert: Function;
    deleteAlert?: string | undefined;
}

export function MeetingCard(props: IProps) {
    let { 
            appt, 
            isTutor,
            setDeleteAlert,
            deleteAlert
        } = props;
    let dispatch = useDispatch();
    const link = "https://www.sandbox.paypal.com/checkoutnow?token=";
    let cardType = appt.confirmed ? "upcoming-card" : "pending-card";
    let cardStatus = appt.confirmed ? "Upcoming" : "Pending";
    let [modalOpen, setModalOpen] = useState(false);
    let [cardExpanded, toggleCardExpansion] = useState(false);
    let [meetingLink, setMeetingLink] = useState(appt.link !== null ? appt.link! : "");
    let [loading, setLoading] = useState(false);
    let [check, setCheck] = useState(false);
    let [err, setErr] = useState(false);
    let [refreshAppLoading, setRefreshAppLoading] = useState(false);
    let [clientData, setClientData] = useState<User>({
        _id: "",
        profile_img: "",
        phone: "",
        email: "",
        first_name: "",
        last_name: "",
    });
    let [isRated, setIsRated] = useState<boolean>(false);
    let [apptFeedback, setApptFeedback] = useState<Feedback>();

    function setMeetingLinkChange(link: React.FormEvent<HTMLInputElement>) {
        setMeetingLink(link.currentTarget.value);
    }
    async function cancelAppointment(appt: Appointment) {
        const result = await api.DeleteAppointment(appt.appt_id);
        if (result) {
            toggleCardExpansion(false);
            if (deleteAlert?.includes("Appointment Cancelled Successfully.")){
                if (deleteAlert === "Appointment Cancelled Successfully.")
                    setDeleteAlert("(2) Appointment Cancelled Successfully.")
                else {
                    let num:number = (+(deleteAlert?.substring(1,2))!);
                    setDeleteAlert( "(" + num++ + ") Appointment Cancelled Successfully.");
                }
                    
            }
            else {
                setDeleteAlert("Appointment Cancelled Successfully.");
            }
            if (isTutor)
                dispatch(tutorDataActions.deleteAppointment(appt.appt_id));
            else
                dispatch(clientDataActions.deleteAppointment(appt.appt_id));
        }
        else {
            setDeleteAlert("Appointment couldn't be cancelled.");
        }
    }
    async function checkAppt(appt: Appointment) {
        setRefreshAppLoading(true);
        const result = await api.CheckPaymentConfirmed(appt);
        if (result !== appt.paypal_approved) {
            if (isTutor)
                dispatch(tutorDataActions.updateAppointmentPaypalConfirmed(appt.appt_id));
            else
                dispatch(clientDataActions.updateAppointmentPaypalConfirmed(appt.appt_id));
        }
        setRefreshAppLoading(false);
    }
    async function updateMeetingLink() {
        setLoading(true);
        try {
            let res = await api.SetMeetingLink(appt.appt_id, meetingLink);
            setLoading(false);
            if (res.status === 200) {
                setCheck(true);
            }
        }
        catch {
            setLoading(false);
            setErr(true);
        }
        //setModalOpen(!modalOpen);
    }
    let [tutorFirstName, setTutorFirstName] = useState("");
    let [tutorLastName, setTutorLastName] = useState("");

    const confirmAppt = async () => {
        await api.ConfirmAppointment(appt.appt_id);
    }

    useEffect(() => {
        const getTutor = async () => {
            let tutor = (await api.GetTutorById(appt.tutor_id));
            setTutorFirstName(tutor.data[0]?.first_name ?? "Unknown");
            setTutorLastName(tutor.data[0]?.last_name ?? "Unknown");
        }

        getTutor();
    }, []);

    useEffect(() => {
        const getFeedback = async () => {
            let feedback = (await api.GetFeedbackByAppointment(appt.appt_id));
            const _isRated: boolean = feedback.data.length > 0;
            if(_isRated !== isRated)
                setIsRated(_isRated);
        }
        if (cardStatus !== "Completed")
            return
        getFeedback();
    }, [])

    // Time checks for different card types
    if (!IsFutureDate(appt.start_time) && appt.confirmed){
        cardType = "completed-card";
        cardStatus = "Completed";
    }

    if (!IsFutureDate(appt.start_time) && !appt.confirmed){
        cardType = "denied-card";
        cardStatus = "Denied";
    }

    if (IsFutureDate(appt.start_time) && props.includePrevious) {
        return <></>
    }

    if (!IsFutureDate(appt.start_time) && !props.includePrevious) {
        return <></>
    }

    // Card creation
    let name = CapitalizeFirstLetter(tutorFirstName + " " + tutorLastName);
    let location = CapitalizeFirstLetter(appt.location);
    let date_time = BreakDownTime(appt.start_time);

    // Card tag setup
    let cardTag = <div className={"card-status"}>{cardStatus}</div>;
    if (cardStatus === "Pending" && props.isTutor) {
        cardTag = (
            <>
                <div className={"card-icon"}>
                    <Button color="success" onClick={() => confirmAppt()}>
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </div>

                <div className={"card-status"}>
                    {cardStatus}
                </div>
            </>
        );
    }

    // Card details
    let upperCardContent = (
        <>
            <div className={"card-name"}>Session with <span className="card-prop-bold">{name}</span></div>
            {location !== "None"
                ? <div className={"card-location"}>at <span className="card-prop-bold">{location}</span></div>
                : <></>
            }
            <div className={"card-time"}>on <span className="card-time-bold">{date_time[0]}</span> at {date_time[1]}</div>
        </>
    );

    // Card structure
    let card = (
        <CompressedCard
            onClick={() => { toggleCardExpansion(!cardExpanded) }}
            className={cardType}
        >
            <div className={"card-container-start"}>
                {upperCardContent}
            </div>

            <div className={"card-container-end"}>
                {cardStatus === "Completed" && !isTutor && !isRated
                    ? <FeedbackForm apptTutorId={appt.tutor_id} meetingId={appt.appt_id} />
                    : <></>}
                {cardTag}
                <Button
                    color="none"
                    onClick={(e) => {
                        toggleCardExpansion(!cardExpanded)
                    }} >
                    <FontAwesomeIcon
                        icon={faArrowDown}
                    />
                </Button>
            </div>
        </CompressedCard>
    );
    if(cardExpanded) {
        card = (
            <ExpandedCard
                onClick={() => { toggleCardExpansion(!cardExpanded) }}
                className={cardType}
            >
                <div className={"card-container-start-expanded"}>{upperCardContent}</div>
                <div className={"card-container-end-expanded"}>
                    {cardStatus === "Completed" && !isTutor && !isRated
                        ? <FeedbackForm apptTutorId={appt.tutor_id} meetingId={appt.appt_id} /> 
                        : <></>}
                    {cardTag}
                    <Button
                    color="none"
                    onClick={(e) => {
                    toggleCardExpansion(!cardExpanded)
                    }} >
                    <FontAwesomeIcon
                    icon={faArrowUp}
                    />
                    </Button>
                </div>

                <hr style={{width: '100%', backgroundColor: 'black', margin: '0 0.5em'}}/>

                <div className={"card-container-item "}>
                    Client Notes:
                </div>
                <div className={"break"}></div>
                <div className={"client-notes"}>{appt.notes && appt.notes.length > 0 ? appt.notes : "None"}</div>
                <div className={"break"}></div>


                { props.isTutor ?
                <div>
                <div className={"client-notes"}>
                <Button
                    color="danger"
                    onClick={(e) => {
                        setModalOpen(!modalOpen);
                        e.stopPropagation();
                    }}
                    >
                    Add Zoom/Webex meeting link
                    </Button>
                                <Modal isOpen={modalOpen}>
                    <ModalHeader toggle={function noRefCheck(){}}>
                    Add Tutoring Meeting Link
                    </ModalHeader>
                    <ModalBody>
                    Link:
                    <Input onChange={setMeetingLinkChange} value={meetingLink}>
                    </Input>
                    </ModalBody>
                    <ModalFooter>
                    <Button
                        color={check ? "success": err ? "danger" : "primary"}

                        onClick={updateMeetingLink}
                    >
                    {loading ? (<Spinner />)
                        : check ? <FontAwesomeIcon icon={faCheck}/>
                        : err ? <div>Error<FontAwesomeIcon icon={faTimes}/></div>
                        : "Save"}
                    </Button>
                    {' '}
                    <Button onClick={() => setModalOpen(!modalOpen)}>
                        Cancel
                    </Button>
                    </ModalFooter>
                </Modal>
                {appt.paypal_tx !== null
                ? appt.paypal_approved 
                ? <div>
                    <div style={{color:'green', marginLeft: '1em', marginBottom:'1em'}}>Payment Completed</div>
                </div>
                : <div style={{color:'red', marginLeft: '1em', marginBottom:'1em'}}>
                <b>Payment Incomplete</b>
                <Button 
                    style={{marginLeft:'0.5em'}}
                    onClick={(e) => {checkAppt(appt); e.stopPropagation();}}>
                       Refresh
                   <Spinner hidden={!refreshAppLoading} />
                   </Button>
                </div>
                : <></>}
                {!appt.paypal_approved && !(cardStatus === "Denied" || cardStatus === "Completed")
                ? (
                    <div>
                    <Button
                        color="danger"
                        style={{display: 'flex', marginBottom: '1em', marginLeft: '1em'}}
                        onClick={(e) => {
                            cancelAppointment(appt);
                            e.stopPropagation();
                        }}
                    >
                    Cancel Meeting
                    </Button>
            </div>
                )
                :<></>
                }
                
                </div>
                </div>
                : <div>{meetingLink === "" ? "" :
                (<div>
                    
                    <div className={"card-container-item "}>
                        Meeting Link:
                    </div>
                <div className={"client-notes"}><a href={meetingLink} target="new">{meetingLink && meetingLink.length > 0 ? meetingLink : "None"}</a></div>
                </div>)
                }
                {appt.paypal_tx !== undefined && appt.paypal_tx!.length > 0
                ? (appt.paypal_approved 
                ? <div>
                    <div style={{color:'green', marginLeft: '1em', marginBottom: '1em'}}>Payment Completed</div>
                </div>
                :<div>
                    <a href={link+appt.paypal_tx} target="_new">
                        <Button style={{
                            marginLeft: '1em',
                            backgroundColor: 'yellow', 
                            color: 'blue',
                            borderColor:'none'}}>
                            Pay with {' '}
                            <img src={pypl} style={{height:'1em'}} />
                            
                        </Button>
                    </a>
                 <div style={{color:'red', marginLeft: '1em', marginBottom:'1em'}}>
                     <b>Payment Incomplete</b>
                     <Button 
                        style={{marginLeft:'0.5em'}}
                        onClick={(e) => {checkAppt(appt); e.stopPropagation();}}>
                            Refresh
                        <Spinner hidden={!refreshAppLoading} />
                        </Button>
                     </div>
                </div>)
                    
                : <></>}
                {!appt.confirmed && !(cardStatus === "Denied" || cardStatus === "Completed")
                ? (<div>
                    <Button
                        color="danger"
                        style={{display: 'flex', marginBottom: '1em', marginLeft: '1em'}}
                        onClick={(e) => {
                            cancelAppointment(appt);
                            e.stopPropagation();
                        }}
                    >
                    Cancel Meeting
                    </Button>
                    
            </div>)
                :<></>
                }
                </div>
                }

            </ExpandedCard>
        );
    }
    return <>
    {card}
    </>;
}

const grow = keyframes`
 0% { height: 75px; }
 100% { height: 200px; }
`

const shrink = keyframes`
 0% { height: 200px; }
 100% { height: 75px; }
`

const CompressedCard = styled.div`
  animation: ${shrink} 0.1s ease-out;

  width: 100%;
  height: 75px;

  margin: 15px 0;
  padding-top: 5px;

  display: flex;
  
  border-radius: 0.28571429rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.075);
  
  cursor: pointer;
  color: black;
  
  // DEBUG STYLES //
  //border: blue solid 5px;
`;

const ExpandedCard = styled.div`
  animation: ${grow} 0.1s ease-out;
  
  width: 100%;
  //min-height: 200px;

  margin: 15px 0;

  display: flex;
  flex-wrap: wrap;

  border-radius: 0.28571429rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.075);
  
  cursor: pointer;
  color: black;
`
