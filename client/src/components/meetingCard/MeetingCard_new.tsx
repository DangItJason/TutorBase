import React, { useEffect, useState } from "react";
import "./MeetingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import { Appointment, User } from "../../services/api.types";
import { api } from "../../services/api";

export function MeetingCard(appt: Appointment) {
    let [cardtype, setCardtype] = useState<String>(appt.confirmed ? "upcoming-card" : "pending-card");
    let [cardStatus, setcardStatus] = useState<String>(appt.confirmed ? "Upcoming" : "Pending");
    let [cardExpanded, toggleCardExpansion] = useState<boolean>(false);
    let [clientData, setClientData] = useState<User>({
        _id: "",
        profile_img: "",
        phone: "",
        email: "",
        first_name: "",
        last_name: "",
    });

    useEffect(() => {
        const getAppointments = async () => {
            return (await api.GetUserById(appt.client_id)).data;
        }
        getAppointments().then(value => {setClientData(value[0]);})
    }); 
    
    let cardTag = (
        <div className={"card-container-end"}>
            <div className={"card-status"}>{cardStatus}</div>
        </div>
    )
    return <></>;
}