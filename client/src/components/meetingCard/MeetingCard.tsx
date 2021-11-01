import React, { useEffect, useState } from "react";
import "./MeetingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import { Appointment, User } from "../../services/api.types";
import { api } from "../../services/api";
import { BreakDownTime, CapitalizeFirstLetter, IsFutureDate } from "../../services/tools";
import FeedbackForm from "../FeedbackForm/FeedbackForm";

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
    let [clientData, setClientData] = useState<User>({
        _id: "",
        profile_img: "",
        phone: "",
        email: "",
        first_name: "",
        last_name: "",
    });

    if (!IsFutureDate(appt.start_time) && appt.confirmed){
        cardType = "completed-card";
        cardStatus = "Completed";
    }
    if (!IsFutureDate(appt.start_time) && !appt.confirmed){
        cardType = "denied-card";
        cardStatus = "Denied";
    }
    console.log(IsFutureDate(appt.start_time));

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
            <div className={"card-container-start"}>{upperCardContent}</div>

            {cardStatus === "Completed" ? <FeedbackForm /> : <></>}

            <div className={"card-container-end"}>{cardTag}</div>
        </div>
    );

    if(cardExpanded) {
        card = (
            <div
                className={"expanded-card " + cardType}
                onClick={(e) => {
                    toggleCardExpansion(!cardExpanded)
                }}
            >
                <div className={"card-container-start-expanded"}>{upperCardContent}</div>
                <div className={"card-container-end-expanded"}>{cardTag}</div>

                <div className={"card-container-item "}>Client Notes:</div>
                <div className={"break"}></div>
                <div className={"client-notes"}>{appt.notes}</div>
            </div>
        );
    }
    return <>{card}</>;
}
