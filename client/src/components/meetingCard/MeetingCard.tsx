import React, { useEffect, useState } from "react";
import "./MeetingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";
import {Appointment, Tutor, TutorsResponse, User} from "../../services/api.types";
import { api } from "../../services/api";
import { BreakDownTime, CapitalizeFirstLetter, IsFutureDate } from "../../services/tools";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import styled, {keyframes} from "styled-components";
import moment from "moment";


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
    let [meetingLink, setMeetingLink] = useState(appt.link !== null ? appt.link! : "");
    let [loading, setLoading] = useState(false);
    let [check, setCheck] = useState(false);
    let [err, setErr] = useState(false);
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
            <div className={"card-name"}>{name}</div>
            <div className={"card-location"}>{location}</div>
            <div className={"card-time"}>{date_time[0] + " at " + date_time[1]}</div>
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
                {cardStatus === "Completed"
                    ? <FeedbackForm apptTutorId={appt.tutor_id} />
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
                    {cardStatus === "Completed" ? <FeedbackForm apptTutorId={appt.tutor_id} /> : <></>}
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

                <div className={"card-container-item"}>
                    {!appt.notes || appt.notes === "" ? ""
                    : "Client Notes: "
                    }
                </div>
                <div className={"break"}></div>
                <div className={"client-notes"}>{appt.notes}</div>
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
                </div>
                </div>
                : <div>{meetingLink === "" ? "" :
                (<div>
                    
                    <div className={"card-container-item "}>
                        Meeting Link:
                    </div>
                <div className={"client-notes"}><a href={meetingLink} target="new">{meetingLink}</a></div>
                </div>)
                }
                </div>
                }

            </ExpandedCard>
        );
    }

    return <>{card}</>;
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
