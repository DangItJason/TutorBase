import React, { useEffect, useState } from "react";
import "./MeetingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";
import { Appointment, User } from "../../services/api.types";
import { api } from "../../services/api";
import { BreakDownTime, CapitalizeFirstLetter, IsFutureDate } from "../../services/tools";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import styled from "styled-components";


interface IProps {
    appt: Appointment,
    isTutor: boolean,
    includePrevious: boolean,
}

export function MeetingCard(props: IProps) {
    let { appt } = props;
    let cardType = appt.confirmed ? "upcoming-card" : "pending-card";
    let cardStatus = appt.confirmed ? "Upcoming" : "Pending";
    let [modalOpen, setModalOpen] = useState(false);
    let [cardExpanded, toggleCardExpansion] = useState<boolean>(false);
    let [meetingLink, setMeetingLink] = useState(appt.meetingLink !== null ? appt.meetingLink! : "");
    let [loading, setLoading] = useState(false);
    let [clientData, setClientData] = useState<User>({
        _id: "",
        profile_img: "",
        phone: "",
        email: "",
        first_name: "",
        last_name: "",
    });
    function setMeetingLinkChange(link: React.FormEvent<HTMLInputElement>) {
        setMeetingLink(link.currentTarget.value);
    }
    async function updateMeetingLink() {
        setLoading(true);
        let res = await api.SetMeetingLink(appt.appt_id, meetingLink);
        console.log(res);
        setLoading(false);
        //setModalOpen(!modalOpen);
    }
    if (!IsFutureDate(appt.start_time) && appt.confirmed){
        cardType = "completed-card";
        cardStatus = "Completed";
    }
    if (!IsFutureDate(appt.start_time) && !appt.confirmed){
        cardType = "denied-card";
        cardStatus = "Denied";
    }

    useEffect(() => {
        const getUser = async () => {
            return (await api.GetUserById(appt.client_id)).data;
        }
        getUser().then(value => {setClientData(value[0]);})
    }, [appt.client_id]);

    if (IsFutureDate(appt.start_time) && props.includePrevious) {
        return <></>
    }
    if (!IsFutureDate(appt.start_time) && !props.includePrevious) {
        return <></>
    }

    let name = CapitalizeFirstLetter(clientData.first_name + " " + clientData.last_name);
    let location = CapitalizeFirstLetter(appt.location);
    let date_time = BreakDownTime(appt.start_time);

    let cardTag = <div className={"card-status"}>{cardStatus}</div>;
    // Only Tutors can accept 'pending' meetings
    if (cardStatus === "Pending" && props.isTutor) {
        cardTag = (
            <>
                <div className={"card-icon"}>
                    <Button color="success">
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </div>

                <div className={"card-status"}>
                    {cardStatus}
                </div>
            </>
        );
    }

    let upperCardContent = (
        <>
            <div className={"card-name"}>{name}</div>
            <div className={"card-location"}>{location}</div>
            <div className={"card-time"}>{date_time[0] + " at " + date_time[1]}</div>
        </>
    );

    let card = (
        <div
            className={"compressed-card " + cardType}
            onClick={(e) => {
                toggleCardExpansion(!cardExpanded)
                }}
        >
            <div className={"card-container-start"}>
                {upperCardContent}
            </div>

            <div className={"card-container-end"}>
                {cardStatus === "Completed" ? <FeedbackForm apptTutorId={appt.tutor_id} /> : <></>}
                {cardTag}
                <FontAwesomeIcon
                    icon={faArrowDown}
                    onClick={(e) => {
                    toggleCardExpansion(!cardExpanded)
                    }} />
            </div>
        </div>
    );

    if(cardExpanded) {
        card = (
            <div
                className={"expanded-card " + cardType}
            >
                <div className={"card-container-start-expanded"}>{upperCardContent}</div>
                <div className={"card-container-end-expanded"}>
                    {cardStatus === "Completed" ? <FeedbackForm apptTutorId={appt.tutor_id} /> : <></>}
                    {cardTag}
                    <FontAwesomeIcon
                    icon={faArrowUp}
                    onClick={(e) => {
                    toggleCardExpansion(!cardExpanded)
                    }} />
                </div>

                <div className={"card-container-item "}>Client Notes:</div>
                <div className={"break"}></div>
                <div className={"client-notes"}>{appt.notes}</div>
                <div className={"break"}></div>
                
                
                { props.isTutor ? 
                <div>
                <div className={"break"}></div>
                <div className={"client-notes"}>
                <Button
                    color="danger"
                    onClick={() => setModalOpen(!modalOpen)}
                    >
                    Add Zoom/Webex meeting link
                    </Button>
                                <Modal isOpen={modalOpen}>
                    <ModalHeader toggle={function noRefCheck(){}}>
                    Add Tutoring Meeting Link
                    </ModalHeader>
                    <ModalBody>
                    Link: 
                    <Input onChange={setMeetingLinkChange}>
                    </Input>
                    </ModalBody>
                    <ModalFooter>
                    <Button
                        color="primary"
                        
                        onClick={updateMeetingLink}
                    >
                    {loading ? (<Spinner />) : "Save"}
                    </Button>
                    {' '}
                    <Button onClick={() => setModalOpen(!modalOpen)}>
                        Cancel
                    </Button>
                    </ModalFooter>
                </Modal>
                </div>
                </div>
                : <div>
                    <div className={"card-container-item "}>Meeting Link:</div>
                <div className={"client-notes"}><a href={meetingLink}>{meetingLink}</a></div>
                    
                </div>
                }

            </div>
        );
    }

    return <>{card}</>;
}
