import React, { useEffect, useState } from "react";
import "./MeetingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import {Appointment, Tutor, TutorsResponse, User} from "../../services/api.types";
import { api } from "../../services/api";
import { BreakDownTime, CapitalizeFirstLetter, IsFutureDate } from "../../services/tools";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import styled from "styled-components";
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
    let [cardExpanded, toggleCardExpansion] = useState<boolean>(false);
    let [tutorFirstName, setTutorFirstName] = useState("");
    let [tutorLastName, setTutorLastName] = useState("");
    let [clientData, setClientData] = useState<User>({
        _id: "",
        profile_img: "",
        phone: "",
        email: "",
        first_name: "",
        last_name: "",
    });

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
            </div>
        </CompressedCard>
    );

    if(cardExpanded) {
        card = (
            <ExpandedCard
                onClick={(e) => { toggleCardExpansion(!cardExpanded) }}
                className={cardType}
            >
                <div className={"card-container-start-expanded"}>{upperCardContent}</div>
                <div className={"card-container-end-expanded"}>
                    {cardStatus === "Completed" ? <FeedbackForm apptTutorId={appt.tutor_id} /> : <></>}
                    {cardTag}
                </div>

                <hr style={{width: '100%', backgroundColor: 'black', margin: '0 0.5em'}}/>

                <div className={"card-container-item"}>Client Notes:</div>
                <div className={"break"}></div>
                <div className={"client-notes"}>{appt.notes}</div>
            </ExpandedCard>
        );
    }

    return <>{card}</>;
}

const CompressedCard = styled.div`
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
  width: 100%;
  min-height: 200px;

  margin: 15px 0;

  display: flex;
  flex-wrap: wrap;

  border-radius: 0.28571429rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.075);
  
  cursor: pointer;
  color: black;
`
